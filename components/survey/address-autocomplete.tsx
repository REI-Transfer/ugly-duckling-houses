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

// Allowed states for the geofence (default: WI). Used as a client-side backstop;
// the server proxy (/api/places-autocomplete) already filters predictions to
// these states before they reach the dropdown.
const ALLOWED_STATES_RAW = (process.env.NEXT_PUBLIC_ALLOWED_STATES ?? "WI")
  .split(",").map((s) => s.trim().toUpperCase()).filter(Boolean)

function haversineDistanceMiles(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 3958.8
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLon = (lon2 - lon1) * Math.PI / 180
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

function isInServiceArea(lat: number, lng: number, areas: ServiceArea[]): boolean {
  if (!areas || areas.length === 0) return true
  return areas.some((area) => haversineDistanceMiles(lat, lng, area.centerLat, area.centerLng) <= area.radiusMiles)
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
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [showDropdown, setShowDropdown] = useState(false)
  const [loading, setLoading] = useState(false)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Close dropdown on outside click
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener("mousedown", handle)
    return () => document.removeEventListener("mousedown", handle)
  }, [])

  const fetchSuggestions = async (input: string) => {
    if (input.trim().length < 3) {
      setSuggestions([])
      setShowDropdown(false)
      return
    }
    try {
      setLoading(true)
      const res = await fetch(`/api/places-autocomplete?input=${encodeURIComponent(input)}`)
      const data = await res.json()
      const preds: Suggestion[] = data.predictions || []
      setSuggestions(preds)
      setShowDropdown(preds.length > 0)
    } catch {
      setSuggestions([])
      setShowDropdown(false)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (newValue: string) => {
    onChange(newValue)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => fetchSuggestions(newValue), 220)
  }

  const handleSelect = async (s: Suggestion) => {
    setShowDropdown(false)
    setSuggestions([])
    onChange(s.description)
    try {
      const res = await fetch(`/api/places-details?place_id=${encodeURIComponent(s.placeId)}`)
      const d = await res.json()
      if (!d?.formattedAddress) {
        // Fall back to the description text if details lookup fails.
        onSelect(s.description, { formattedAddress: s.description })
        return
      }
      const details: AddressDetails = {
        formattedAddress: d.formattedAddress,
        state: d.state,
        city: d.city,
        county: d.county,
        lat: d.lat,
        lng: d.lng,
      }
      onChange(d.formattedAddress)

      // State geofence backstop (server already filtered, this catches edge cases).
      if (allowedStates.length > 0 && d.state && !allowedStates.includes(String(d.state).toUpperCase())) {
        onOutOfArea?.(d.formattedAddress)
        return
      }
      // Optional radius check for clients using lat/lng service areas.
      if (serviceAreas.length > 0 && typeof d.lat === "number" && typeof d.lng === "number") {
        if (!isInServiceArea(d.lat, d.lng, serviceAreas)) {
          onOutOfArea?.(d.formattedAddress)
          return
        }
      }
      onSelect(d.formattedAddress, details)
    } catch {
      onSelect(s.description, { formattedAddress: s.description })
    }
  }

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
        <MapPin className="h-5 w-5 text-gray-400" />
      </div>
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        autoComplete="off"
        onChange={(e) => handleInputChange(e.target.value)}
        onFocus={() => { if (suggestions.length > 0) setShowDropdown(true) }}
        className="h-12 pl-10 rounded-xl border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus:border-[var(--accent)] focus:ring-[var(--accent)]/20"
      />
      {loading && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-200 border-t-[var(--accent)]" />
        </div>
      )}
      {showDropdown && suggestions.length > 0 && (
        <ul className="absolute left-0 right-0 top-full z-50 mt-1 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
          {suggestions.map((s, i) => (
            <li
              key={s.placeId || i}
              onMouseDown={(e) => { e.preventDefault(); handleSelect(s) }}
              className="flex cursor-pointer items-center gap-2 border-b border-gray-100 px-4 py-3 text-sm text-gray-800 last:border-0 hover:bg-gray-50"
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
