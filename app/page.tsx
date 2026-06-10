import Image from "next/image"
import { SurveyCard } from "@/components/survey/survey-card"
import { VSLSection } from "@/components/survey/vsl-section"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Shield, Clock, DollarSign } from "lucide-react"
import config from "@/lib/config"

export default function HomePage() {
  // Hero trust badges: icon is hardcoded per badge, text stays env-driven (config.stat*Label)
  const badges = [
    { Icon: Shield, label: config.stat1Label },
    { Icon: Clock, label: config.stat2Label },
    { Icon: DollarSign, label: config.stat3Label },
  ]

  // Parse service areas for client-side validation
  let parsedServiceAreas: Array<{ id: string; centerLat: number; centerLng: number; radiusMiles: number }> = []
  try { parsedServiceAreas = JSON.parse(config.serviceAreas) } catch {}

  const disqualifiedPropertyTypes = config.disqualifiedPropertyTypes.split(",").map(s => s.trim()).filter(Boolean)

  return (
    <main className="relative min-h-screen" style={{ backgroundColor: config.accentColor }}>
      <div className="relative z-10">
        <Header
          companyName={config.companyName}
          phoneDisplay={config.phoneDisplay}
          phoneHref={config.phoneHref}
          logoUrl={config.logoUrl}
          headerBgColor={config.headerBgColor}
        />

        <div className="mx-auto max-w-7xl px-4 py-4 md:py-6 lg:px-8">
          {/* Hero */}
          <div className="mx-auto text-center">
            <h1 className="text-4xl font-extrabold leading-tight text-white md:text-5xl lg:text-[3.75rem] lg:leading-[1.15] text-balance">
              {config.headline}
              {config.headlineAccent && (
                <span className="text-white/80"> {config.headlineAccent}</span>
              )}
            </h1>
            <p className="mt-2 md:mt-3 text-base md:text-lg text-white/70">
              {config.subheadline}
            </p>

            {/* Trust indicators — distinct icon per badge, label text stays env-driven */}
            <div className="mt-3 md:mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 md:gap-5">
              {badges.map(({ Icon, label }) => (
                <div key={label} className="flex items-center gap-1.5">
                  <div
                    className="flex h-6 w-6 items-center justify-center rounded-full"
                    style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
                  >
                    <Icon className="h-3.5 w-3.5" style={{ color: "white" }} />
                  </div>
                  <span className="text-sm md:text-base font-medium text-white/80">
                    {label}
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
