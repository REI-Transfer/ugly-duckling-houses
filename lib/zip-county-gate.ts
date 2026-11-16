// ZIP / county service-area gate (client-side, build-time env).
//
// NEXT_PUBLIC_ALLOWED_ZIPS     comma-separated 5-digit ZIPs, e.g. "53005,53007"
// NEXT_PUBLIC_ALLOWED_COUNTIES comma-separated "ST:County Name", e.g. "WI:Milwaukee County"
// NEXT_PUBLIC_EXCLUDED_ZIPS    comma-separated 5-digit ZIPs, always rejected
//
// Rules:
// - Excluded ZIP always loses, even if the ZIP or its county is allowed.
// - If both allow lists are empty, the gate is off (everything passes except excluded ZIPs).
// - Otherwise the address passes if its ZIP is allowed OR its county is allowed.
// - An address with neither a matching ZIP nor a matching county is rejected.

export interface ZipCountyGate {
  allowedZips: Set<string>
  allowedCounties: Set<string>
  excludedZips: Set<string>
}

function parseList(raw: string | undefined): Set<string> {
  return new Set(
    (raw ?? "")
      .split(",")
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean)
  )
}

export function buildZipCountyGate(allowedZips?: string, allowedCounties?: string, excludedZips?: string): ZipCountyGate {
  return {
    allowedZips: parseList(allowedZips),
    allowedCounties: parseList(allowedCounties),
    excludedZips: parseList(excludedZips),
  }
}

// ZIP from Places postal_code, else the last 5-digit ZIP in the formatted address.
export function extractZip(postalCode: string | undefined, formattedAddress: string | undefined): string {
  const direct = (postalCode ?? "").trim().slice(0, 5)
  if (/^\d{5}$/.test(direct)) return direct
  const matches = (formattedAddress ?? "").match(/\b\d{5}(?:-\d{4})?\b/g)
  return matches ? matches[matches.length - 1].slice(0, 5) : ""
}

export function passesZipCountyGate(gate: ZipCountyGate, zip: string, state: string, county: string): boolean {
  const z = zip.trim().toLowerCase()
  if (z && gate.excludedZips.has(z)) return false
  if (gate.allowedZips.size === 0 && gate.allowedCounties.size === 0) return true
  if (z && gate.allowedZips.has(z)) return true
  const key = `${state.trim()}:${county.trim()}`.toLowerCase()
  if (state.trim() && county.trim() && gate.allowedCounties.has(key)) return true
  return false
}

// Values are inlined at build time by Next.js (literal process.env.NEXT_PUBLIC_* access).
export const zipCountyGate = buildZipCountyGate(
  process.env.NEXT_PUBLIC_ALLOWED_ZIPS,
  process.env.NEXT_PUBLIC_ALLOWED_COUNTIES,
  process.env.NEXT_PUBLIC_EXCLUDED_ZIPS
)
