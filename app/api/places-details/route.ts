import { NextResponse } from "next/server"

// Server-side proxy for Google Place Details (web-service API). Pairs with
// /api/places-autocomplete — resolves a selected placeId to the full address
// + state/city/county/geo so the client can validate and seed the form.
const KEY = process.env.GOOGLE_PLACES_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY || ""

export async function GET(request: Request) {
  const placeId = (new URL(request.url).searchParams.get("place_id") || "").trim()
  if (!placeId || !KEY) return NextResponse.json({ error: "missing place_id" }, { status: 400 })
  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(placeId)}&fields=formatted_address,address_components,geometry&key=${KEY}`
    const res = await fetch(url)
    const data = await res.json()
    const r = data.result || {}
    let state = "", city = "", county = ""
    for (const c of r.address_components || []) {
      if (c.types.includes("administrative_area_level_1")) state = c.short_name
      if (c.types.includes("locality")) city = c.long_name
      if (c.types.includes("administrative_area_level_2")) county = c.long_name
    }
    return NextResponse.json({
      formattedAddress: r.formatted_address || "",
      state, city, county,
      lat: r.geometry?.location?.lat,
      lng: r.geometry?.location?.lng,
    })
  } catch {
    return NextResponse.json({ error: "lookup failed" }, { status: 500 })
  }
}
