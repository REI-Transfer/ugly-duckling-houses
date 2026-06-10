import Image from "next/image"
import { SurveyCard } from "@/components/survey/survey-card"
import { VSLSection } from "@/components/survey/vsl-section"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import config from "@/lib/config"

export default function HomePage() {
  // Hero trust badges — iBuyKC light-theme style: green check + value + label
  const stats = [
    { value: config.stat1Value, label: config.stat1Label },
    { value: config.stat2Value, label: config.stat2Label },
    { value: config.stat3Value, label: config.stat3Label },
  ]

  // Headline matched to iBuyKC format, market swapped in from config
  const heroHeadline = `${config.marketName || "Wisconsin"} Homeowners: Get a Fair Cash Offer in 24 Hours. No Repairs, No Fees.`
  const heroSubhead = "We handle the paperwork, the timeline, and the stress. You pick the closing date and walk away with cash."

  // Parse service areas for client-side validation
  let parsedServiceAreas: Array<{ id: string; centerLat: number; centerLng: number; radiusMiles: number }> = []
  try { parsedServiceAreas = JSON.parse(config.serviceAreas) } catch {}

  const disqualifiedPropertyTypes = config.disqualifiedPropertyTypes.split(",").map(s => s.trim()).filter(Boolean)

  return (
    <main className="relative min-h-screen bg-gray-50">
      <div className="relative z-10">
        <Header
          companyName={config.companyName}
          phoneDisplay={config.phoneDisplay}
          phoneHref={config.phoneHref}
          logoUrl={config.logoUrl}
          headerBgColor="#ffffff"
        />

        <div className="mx-auto max-w-7xl px-4 py-4 md:py-6 lg:px-8">
          {/* Hero — iBuyKC light theme */}
          <div className="mx-auto text-center">
            <h1 className="text-2xl font-bold leading-tight text-gray-900 md:text-4xl lg:text-[2.75rem] lg:leading-tight text-balance">
              {heroHeadline}
            </h1>
            <p className="mt-2 md:mt-3 text-sm md:text-base text-gray-600">
              {heroSubhead}
            </p>

            {/* Trust indicators — green check + value + label (matches iBuyKC) */}
            <div className="mt-3 md:mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 md:gap-5">
              {stats.map((stat) => (
                <div key={stat.label} className="flex items-center gap-1.5">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500/10">
                    <svg className="h-3.5 w-3.5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-xs md:text-sm font-medium text-gray-700">
                    <strong>{stat.value}</strong> {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Survey Form */}
          <div className="mt-4 md:mt-6 mx-auto max-w-3xl">
            <SurveyCard
              phoneDisplay={config.phoneDisplay}
              phoneHref={config.phoneHref}
              serviceAreas={parsedServiceAreas}
              disqualifiedPropertyTypes={disqualifiedPropertyTypes}
            />
          </div>

          {/* Meet the team — local trust, sits directly below the form */}
          <div className="mt-8 md:mt-12 mx-auto max-w-3xl">
            <div className="rounded-3xl bg-white p-5 md:p-8 shadow-xl text-center">
              <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: config.accentColor }}>
                Meet the {config.companyName} Team
              </p>
              <h2 className="mt-1 text-xl font-bold text-gray-900 md:text-2xl text-balance">
                Real local people helping {config.marketName || "Wisconsin"} homeowners for over a decade
              </h2>
              <div className="mt-4 overflow-hidden rounded-2xl">
                <Image
                  src="/images/team-photo.jpg"
                  alt={`The ${config.companyName} team`}
                  width={1024}
                  height={784}
                  sizes="(max-width: 768px) 100vw, 700px"
                  className="h-auto w-full"
                />
              </div>
              {config.ownerName && (
                <p className="mt-4 text-sm text-gray-500">
                  Led by <span className="font-semibold text-gray-900">{config.ownerName}</span>, {config.companyName}
                </p>
              )}
            </div>
          </div>

          {/* VSL (conditional on env vars) */}
          <div className="mt-6 md:mt-8 mx-auto max-w-4xl">
            <VSLSection />
          </div>
        </div>

        <Footer
          companyName={config.companyName}
          phoneDisplay={config.phoneDisplay}
          phoneHref={config.phoneHref}
          privacyPolicyUrl={config.privacyPolicyUrl}
          termsUrl={config.termsUrl}
        />
      </div>
    </main>
  )
}
