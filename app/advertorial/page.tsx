import type { Metadata } from "next"
import { AdvertorialPage } from "@/components/advertorial/advertorial-page"
import type { ServiceArea } from "@/components/survey/address-autocomplete"
import config from "@/lib/config"

const market = config.marketName || "Wisconsin"

export const metadata: Metadata = {
  title: `${market} Homeowners 45+: A Higher Cash Offer On Older Homes | ${config.companyName}`,
  description:
    `See your 24-hour cash offer estimate without listing, repairs, or showings. A simpler way ${market} homeowners turn home equity into cash, as-is. No agent fees taken out of the price.`,
}

export default function AdvertorialRoute() {
  let serviceAreas: ServiceArea[] = []
  try {
    serviceAreas = JSON.parse(config.serviceAreas)
  } catch {}

  return (
    <main className="relative min-h-screen bg-white">
      <AdvertorialPage
        companyName={config.companyName}
        phoneDisplay={config.phoneDisplay}
        phoneHref={config.phoneHref}
        marketName={config.marketName}
        accentColor={config.accentColor}
        ownerName={config.ownerName}
        writerName="Margaret Ellison"
        writerRole="Housing Correspondent"
        writerHeadshot="/images/adv-local-team.jpg"
        serviceAreas={serviceAreas}
      />
    </main>
  )
}
