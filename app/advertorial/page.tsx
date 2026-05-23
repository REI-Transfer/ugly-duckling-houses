import type { Metadata } from "next"
import { AdvertorialPage } from "@/components/advertorial/advertorial-page"
import type { ServiceArea } from "@/components/survey/address-autocomplete"
import config from "@/lib/config"

const market = config.marketName || "Wisconsin"

export const metadata: Metadata = {
  title: `Why More ${market} Homeowners Are Selling Their Homes For Cash | ${config.companyName}`,
  description:
    "A simpler way Wisconsin homeowners are selling as-is. No repairs out of pocket, no open houses, no agent fees taken out of the price. See if your home qualifies.",
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
        writerName="Margaret Ellison"
        writerRole="Housing Correspondent"
        writerHeadshot="/images/adv-local-team.jpg"
        serviceAreas={serviceAreas}
      />
    </main>
  )
}
