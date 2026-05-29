import { Figtree, Inter } from "next/font/google"
import SiteHeader from "@/components/v2/SiteHeader"
import Hero from "@/components/v2/Hero"
import ServiceOptions from "@/components/v2/ServiceOptions"
import WhyUglyDuckling from "@/components/v2/WhyUglyDuckling"
import Reviews from "@/components/v2/Reviews"
import SiteFooter from "@/components/v2/SiteFooter"
import StickyTopBar from "@/components/v2/StickyTopBar"
import { HPG_STYLE_BLOCK } from "@/components/v2/hpg-tokens"
import config from "@/lib/config"

// Match HPG: Figtree for display, Inter for body. Loaded only on /v2.
const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-hpg-display",
  display: "swap",
})
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-hpg-sans",
  display: "swap",
})

// Ugly Duckling brand override: swap HPG olive-green tokens to UD mint green.
// Keeps --hpg-cta (red) and --hpg-gold as default for contrast accents.
const UD_BRAND_OVERRIDE = `
[data-hpg-page] {
  --hpg-green: #32bc87;
  --hpg-green-dark: #1f9d6c;
}
[data-hpg-page] .hpg-pulse-cta {
  animation: ud-pulse-cta 2.4s ease-in-out infinite;
}
@keyframes ud-pulse-cta {
  0%, 100% { box-shadow: 0 8px 24px rgba(50, 188, 135, 0.32); }
  50%      { box-shadow: 0 12px 32px rgba(50, 188, 135, 0.50); }
}
`

export default function V2Page() {
  let parsedServiceAreas: Array<{ id: string; centerLat: number; centerLng: number; radiusMiles: number }> = []
  try {
    parsedServiceAreas = JSON.parse(config.serviceAreas)
  } catch {}

  const marketName = config.marketName || "Wisconsin"

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: HPG_STYLE_BLOCK }} />
      <style dangerouslySetInnerHTML={{ __html: UD_BRAND_OVERRIDE }} />
      <main
        data-hpg-page
        className={`${figtree.variable} ${inter.variable}`}
        style={{ backgroundColor: "var(--hpg-cream)" }}
      >
        <StickyTopBar phoneDisplay={config.phoneDisplay} phoneHref={config.phoneHref} />
        <SiteHeader
          companyName={config.companyName}
          phoneDisplay={config.phoneDisplay}
          phoneHref={config.phoneHref}
          logoUrl={config.logoUrl}
        />
        <Hero
          marketName={marketName}
          phoneDisplay={config.phoneDisplay}
          phoneHref={config.phoneHref}
          serviceAreas={parsedServiceAreas}
        />
        <ServiceOptions />
        <WhyUglyDuckling companyName={config.companyName} />
        <Reviews />
        <SiteFooter
          companyName={config.companyName}
          phoneDisplay={config.phoneDisplay}
          phoneHref={config.phoneHref}
          marketName={marketName}
        />
      </main>
    </>
  )
}
