import { NextResponse } from "next/server"

// Server-side proxy for Google Places Autocomplete (web-service API). The browser
// Maps JS SDK requires the Maps JavaScript API to be enabled + referrer config,
// which this project's key is not set up for. The web-service Places API IS
// enabled and works, so we call it server-side and return WI-only predictions.
const KEY = process.env.GOOGLE_PLACES_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY || ""
const ALLOWED = (process.env.ALLOWED_STATES ?? process.env.NEXT_PUBLIC_ALLOWED_STATES ?? "WI")
  .split(",").map((s) => s.trim().toUpperCase()).filter(Boolean)

function predictionState(p: { terms?: { value: string }[]; description?: string }): string {
  for (const t of p.terms || []) {
    const v = (t.value || "").trim().toUpperCase()
    if (/^[A-Z]{2}$/.test(v) && v !== "US") return v
  }
  const m = (p.description || "").toUpperCase().match(/,\s*([A-Z]{2})(?:,\s*USA)?\s*$/)
  return m ? m[1] : ""
}

export async function GET(request: Request) {
  const input = (new URL(request.url).searchParams.get("input") || "").trim()
  if (input.length < 3 || !KEY) return NextResponse.json({ predictions: [] })
  try {
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&types=address&components=country:us&key=${KEY}`
    const res = await fetch(url)
    const data = await res.json()
    const predictions = (data.predictions || [])
      .filter((p: { terms?: { value: string }[]; description?: string }) =>
        ALLOWED.length === 0 || ALLOWED.includes(predictionState(p)))
      .slice(0, 5)
      .map((p: { description: string; place_id: string }) => ({ description: p.description, placeId: p.place_id }))
    return NextResponse.json({ predictions })
  } catch {
    return NextResponse.json({ predictions: [] })
  }
}
