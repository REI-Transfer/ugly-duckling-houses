"use client"

import { useEffect, useRef, useState } from "react"
import { Input } from "@/components/ui/input"
import { MapPin } from "lucide-react"

export interface AddressDetails {
  formattedAddress: string
  lat?: number
  lng?: number
  state?: string
  city?: string
  county?: string
}

export interface ServiceArea {
  id: string
  centerLat: number
  centerLng: number
  radiusMiles: number
}

// Singleton loader: the Google Maps script must load EXACTLY ONCE per page. When the
// advertorial renders multiple AddressAutocomplete instances (sticky bar + embedded
// survey), each used to inject its own <script>, so Google was loaded multiple times and
// the Places API threw "included multiple times" and broke autocomplete everywhere. This
// shared promise guarantees a single load; every instance awaits it and binds when ready.
let googleMapsPromise: Promise<void> | null = null
function loadGoogleMaps(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve()
  if (window.google?.maps?.places) return Promise.resolve()
  if (googleMapsPromise) return googleMapsPromise
  googleMapsPromise = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>("script[data-google-maps]")
    if (existing) {
      existing.addEventListener("load", () => resolve())
      existing.addEventListener("error", () => reject(new Error("Google Maps failed to load")))
      if (window.google?.maps?.places) resolve()
      return
    }
    const script = document.createElement("script")
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY}&libraries=places`
    script.async = true
    script.defer = true
    script.setAttribute("data-google-maps", "true")
    script.onload = () => resolve()
    script.onerror = () => reject(new Error("Google Maps failed to load"))
    document.head.appendChild(script)
  })
  return googleMapsPromise
}

// Allowed states for autocomplete filtering (default: WI only).
// This comes from NEXT_PUBLIC_ALLOWED_STATES env or falls back to "WI".
// We hard-filter predictions so only addresses from allowed states appear in the dropdown.
// Biasing alone lets neighboring states leak in, so we use AutocompleteService + custom
// dropdown and drop any prediction whose state term is not in the allowed list.
const ALLOWED_STATES_RAW = (
  process.env.NEXT_PUBLIC_ALLOWED_STATES ?? "WI"
)
  .split(",")
  .map((s) => s.trim().toUpperCase())
  .filter(Boolean)

function stateFromPrediction(prediction: google.maps.places.AutocompletePrediction): string | null {
  // The browser JS SDK is inconsistent: sometimes terms end in "USA"
  // ([street, city, ST, "USA"]) and sometimes the country term is omitted
  // ([street, city, ST]). Position-based parsing breaks in the second case and
  // filters every US address out, so derive the state robustly from multiple
  // sources instead.

  // 1) Any standalone 2-letter term is the state abbreviation (e.g. "WI").
  for (const t of prediction.terms || []) {
    const v = (t.value || "").trim().toUpperCase()
    if (/^[A-Z]{2}$/.test(v) && v !== "US") return v
  }
  // 2) Parse the trailing state from the full description ("..., City, ST, USA"
  //    or "..., City, ST"). structured_formatting.secondary_text works too.
  const texts = [
    prediction.description || "",
    prediction.structured_formatting?.secondary_text || "",
  ]
  for (const text of texts) {
    const m = text.toUpperCase().match(/,\s*([A-Z]{2})(?:,\s*USA)?\s*$/)
    if (m) return m[1]
  }
  return null
}

function haversineDistanceMiles(
  lat1: number, lon1: number, lat2: number, lon2: number
): number {
  const R = 3958.8
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLon = (lon2 - lon1) * Math.PI / 180
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

function isInServiceArea(lat: number, lng: number, areas: ServiceArea[]): boolean {
  if (!areas || areas.length === 0) return true
  return areas.some(
    (area) => haversineDistanceMiles(lat, lng, area.centerLat, area.centerLng) <= area.radiusMiles
  )
}

interface AddressAutocompleteProps {
  value: string
  onChange: (address: string) => void
  onSelect: (address: string, details: AddressDetails) => void
  onOutOfArea?: (address: string) => void
  serviceAreas?: ServiceArea[]
  placeholder?: string
  className?: string
  allowedStates?: string[]
}

declare global {
  interface Window {
    google: typeof google
    initGooglePlaces: () => void
  }
}

interface Suggestion {
  description: string
  placeId: string
}

export function AddressAutocomplete({
  value,
  onChange,
  onSelect,
  onOutOfArea,
  serviceAreas = [],
  placeholder = "Start typing your address...",
  className = "",
  allowedStates = ALLOWED_STATES_RAW,
}: AddressAutocompleteProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [showDropdown, setShowDropdown] = useState(false)
  const autocompleteServiceRef = useRef<google.maps.places.AutocompleteService | null>(null)
  const placesServiceRef = useRef<google.maps.places.PlacesService | null>(null)
  const sessionTokenRef = useRef<google.maps.places.AutocompleteSessionToken | null>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let cancelled = false
    loadGoogleMaps()
      .then(() => {
        if (cancelled) return
        setIsLoaded(true)
        // Initialize services
        autocompleteServiceRef.current = new window.google.maps.places.AutocompleteService()
        // PlacesService needs a DOM element
        const dummy = document.createElement("div")
        placesServiceRef.current = new window.google.maps.places.PlacesService(dummy)
        sessionTokenRef.current = new window.google.maps.places.AutocompleteSessionToken()
      })
      .catch(() => {
        // Key/network failure - input still works as plain text
      })

    return () => {
      cancelled = true
    }
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowDropdown(false)
        setSuggestions([])
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const fetchSuggestions = (input: string) => {
    if (!autocompleteServiceRef.current || input.length < 3) {
      setSuggestions([])
      setShowDropdown(false)
      return
    }

    autocompleteServiceRef.current.getPlacePredictions(
      {
        input,
        componentRestrictions: { country: "us" },
        types: ["address"],
        sessionToken: sessionTokenRef.current ?? undefined,
      },
      (predictions, status) => {
        if (status !== window.google.maps.places.PlacesServiceStatus.OK || !predictions) {
          setSuggestions([])
          setShowDropdown(false)
          return
        }

        // Hard-filter: only keep predictions from allowed states
        const filtered = predictions.filter((p) => {
          const state = stateFromPrediction(p)
          return state && allowedStates.includes(state)
        })

        setSuggestions(
          filtered.map((p) => ({ description: p.description, placeId: p.place_id }))
        )
        setShowDropdown(filtered.length > 0)
      }
    )
  }

  const handleInputChange = (newValue: string) => {
    onChange(newValue)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => fetchSuggestions(newValue), 220)
  }

  const handleSuggestionSelect = (suggestion: Suggestion) => {
    setSuggestions([])
    setShowDropdown(false)
    onChange(suggestion.description)

    if (!placesServiceRef.current) return

    // Refresh session token after selection
    const usedToken = sessionTokenRef.current
    sessionTokenRef.current = new window.google.maps.places.AutocompleteSessionToken()

    placesServiceRef.current.getDetails(
      {
        placeId: suggestion.placeId,
        fields: ["formatted_address", "address_components", "geometry"],
        sessionToken: usedToken ?? undefined,
      },
      (place, status) => {
        if (
          status !== window.google.maps.places.PlacesServiceStatus.OK ||
          !place?.formatted_address
        )
          return

        let state = ""
        let city = ""
        let county = ""
        let lat: number | undefined
        let lng: number | undefined

        place.address_components?.forEach((component) => {
          if (component.types.includes("administrative_area_level_1"))
            state = component.short_name
          if (component.types.includes("locality")) city = component.long_name
          if (component.types.includes("administrative_area_level_2"))
            county = component.long_name
        })

        if (place.geometry?.location) {
          lat = place.geometry.location.lat()
          lng = place.geometry.location.lng()
        }

        // Backstop: gate selection by allowed state (in case the prediction slipped through)
        if (allowedStates.length > 0 && state && !allowedStates.includes(state.toUpperCase())) {
          onChange(place.formatted_address)
          onOutOfArea?.(place.formatted_address)
          return
        }

        const details: AddressDetails = {
          formattedAddress: place.formatted_address,
          lat,
          lng,
          state,
          city,
          county,
        }

        // Service-area radius check (for clients with specific service areas)
        if (serviceAreas.length > 0 && lat !== undefined && lng !== undefined) {
          if (!isInServiceArea(lat, lng, serviceAreas)) {
            onChange(place.formatted_address)
            onOutOfArea?.(place.formatted_address)
            return
          }
        }

        onChange(place.formatted_address)
        onSelect(place.formatted_address, details)
      }
    )
  }

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
        <MapPin className="h-5 w-5 text-gray-400" />
      </div>
      <Input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => handleInputChange(e.target.value)}
        onFocus={() => {
          if (suggestions.length > 0) setShowDropdown(true)
        }}
        autoComplete="off"
        className="h-12 pl-10 rounded-xl border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus:border-[var(--accent)] focus:ring-[var(--accent)]/20"
      />
      {!isLoaded && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-200 border-t-[var(--accent)]" />
        </div>
      )}
      {showDropdown && suggestions.length > 0 && (
        <ul className="absolute left-0 right-0 top-full z-50 mt-1 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
          {suggestions.map((s, i) => (
            <li
              key={s.placeId || i}
              onMouseDown={(e) => {
                e.preventDefault()
                handleSuggestionSelect(s)
              }}
              className="flex cursor-pointer items-center gap-2 px-4 py-3 text-sm text-gray-800 hover:bg-gray-50 border-b border-gray-100 last:border-0"
            >
              <MapPin className="h-4 w-4 shrink-0 text-gray-400" />
              {s.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
