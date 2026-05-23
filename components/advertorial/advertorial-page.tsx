"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { SurveyCard } from "@/components/survey/survey-card"
import { AddressAutocomplete, type AddressDetails, type ServiceArea } from "@/components/survey/address-autocomplete"

// Main advertorial editorial landing page (cold-traffic pre-sell).
// Tells the 45+ homeowner story, embeds the client's existing SurveyCard,
// and uses a sticky address bar (top) that opens a modal with the rest of the
// form (skipping the captured address). Market name, phone, company, accent all
// come from server config via props.
//
// IMPORTANT: This component is wired to the Ugly Duckling Houses SurveyCard
// signature: { phoneDisplay, phoneHref, serviceAreas, disqualifiedPropertyTypes,
// initialAddress, initialStep }. It does NOT use companyName as a prop on SurveyCard.

interface AdvertorialPageProps {
  companyName: string
  phoneDisplay: string
  phoneHref: string
  marketName: string
  accentColor: string
  writerName?: string
  writerRole?: string
  writerHeadshot?: string
  serviceAreas: ServiceArea[]
}

function pad(n: number) {
  return n < 10 ? "0" + n : "" + n
}

export function AdvertorialPage({
  companyName,
  phoneDisplay,
  phoneHref,
  marketName,
  accentColor,
  writerName = "Margaret Ellison",
  writerRole = "Senior Housing Correspondent",
  writerHeadshot = "/images/adv-local-team.jpg",
  serviceAreas,
}: AdvertorialPageProps) {
  const market = marketName || "your area"

  // Editorial palette (accent comes from the client brand color).
  const C = {
    text: "#1a1a1a",
    muted: "#6b6b6b",
    link: accentColor,
    rule: "#e5e5e5",
    cta: "#1f8a4c",
    accent: accentColor,
    warn: "#c0392b",
  }

  const formRef = useRef<HTMLDivElement>(null)
  const [showSticky, setShowSticky] = useState(false)
  const [stickyAddr, setStickyAddr] = useState("")
  const [seededAddress, setSeededAddress] = useState<string | undefined>(undefined)
  const [seededStep, setSeededStep] = useState<number | undefined>(undefined)
  const [modalOpen, setModalOpen] = useState(false)

  // Two rolling countdown timers (randomized per page load)
  const [cdA, setCdA] = useState("--:--:--")
  const [cdB, setCdB] = useState("--d --:--")
  const [slots, setSlots] = useState(7)
  const targetsRef = useRef<{ a: number; b: number } | null>(null)
  useEffect(() => {
    const rand = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min
    const now = Date.now()
    const a = now + rand(14, 46) * 3600 * 1000 + rand(0, 59) * 60 * 1000 + rand(0, 59) * 1000
    const b = now + rand(3, 6) * 24 * 3600 * 1000 + rand(0, 23) * 3600 * 1000 + rand(0, 59) * 60 * 1000
    targetsRef.current = { a, b }
    setSlots(rand(3, 9))
    const tick = () => {
      if (!targetsRef.current) return
      const t = Date.now()
      const ra = Math.max(0, targetsRef.current.a - t)
      setCdA(`${pad(Math.floor(ra / 3600000))}:${pad(Math.floor((ra % 3600000) / 60000))}:${pad(Math.floor((ra % 60000) / 1000))}`)
      const rb = Math.max(0, targetsRef.current.b - t)
      setCdB(`${Math.floor(rb / 86400000)}d ${pad(Math.floor((rb % 86400000) / 3600000))}:${pad(Math.floor((rb % 3600000) / 60000))}`)
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  // Sticky bar reveal on scroll (hide while the inline form is on screen)
  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY > 600
      const form = formRef.current
      let formVisible = false
      if (form) {
        const r = form.getBoundingClientRect()
        formVisible = r.top < window.innerHeight && r.bottom > 0
      }
      setShowSticky(scrolled && !formVisible)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const scrollToForm = () =>
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })

  // When the sticky bar address autocomplete fires a valid selection, capture the
  // address, seed the modal form at step 2 (skipping the address step), and open.
  const handleStickySelect = (address: string, details: AddressDetails) => {
    // Only seed to step 2 if we have enough location data to trust the address
    const hasState = Boolean(details.state)
    setSeededAddress(address)
    setSeededStep(hasState ? 2 : undefined)
    setModalOpen(true)
  }

  // If user typed without selecting from autocomplete dropdown, open modal at address step
  const goToForm = () => {
    if (!seededAddress && stickyAddr.trim()) {
      setSeededAddress(stickyAddr.trim())
      setSeededStep(undefined) // start at address step so they autocomplete it
    }
    setModalOpen(true)
  }

  return (
    <div style={{ color: C.text, background: "#fff" }}>
      <article className="mx-auto max-w-[760px] px-6 pt-10 pb-36 text-[18px] md:text-[19px] leading-[1.65]">
        <p style={{ color: C.muted }} className="text-xs tracking-[0.14em] uppercase text-center mb-[18px]">Advertorial</p>

        <header>
          <h1 className="text-[29px] md:text-[38px] leading-[1.18] font-extrabold text-center mb-[18px] tracking-[-0.01em]">
            Why More {market === "your area" ? "" : `${market} `}Homeowners Over the Age of 45 Are Selling Their Homes For Cash, Skipping the Open Houses Entirely
          </h1>
          <p className="text-center text-[18px] mb-[26px]">
            A simpler path qualified homeowners are choosing right now. Sell as-is, keep more money, and skip the months of waiting.
          </p>
          <div style={{ borderTop: `1px solid ${C.rule}`, borderBottom: `1px solid ${C.rule}` }} className="flex items-center gap-3 py-3 mb-[30px]">
            <Image src={writerHeadshot} alt={writerName} width={46} height={46} className="h-[46px] w-[46px] rounded-full object-cover bg-gray-200" />
            <div>
              <div className="text-[15px] font-semibold">By {writerName}</div>
              <div style={{ color: C.muted }} className="text-[13px]">{writerRole} &middot; Updated this week</div>
            </div>
          </div>
        </header>

        <figure className="my-[8px] mb-[30px]">
          <Image src="/images/adv-strangers-open-house.jpg" alt="Strangers walking through a Wisconsin home during an open house" width={760} height={500} className="block w-full h-auto rounded-[3px] bg-gray-100" priority />
          <figcaption style={{ color: C.muted }} className="text-[13px] text-center mt-2 italic">
            Open houses mean strangers going through your rooms for weeks. More Wisconsin homeowners are choosing a simpler path.
          </figcaption>
        </figure>

        <section>
          <p className="mb-[18px]">Let me ask you something honest, one homeowner to another.</p>
          <p className="mb-[18px]"><strong>When did your house start feeling like more obligation than home?</strong></p>
          <p className="mb-[18px]">Maybe it was the driveway last winter. Long after your back started complaining about shoveling it.</p>
          <p className="mb-[18px]">Maybe it was the furnace. Or the roof. Or the list that keeps growing every spring when you walk the property and add three more things to it.</p>
          <p className="mb-[18px]">Maybe it was just the quiet. The rooms that used to be full are mostly storage now. The house has not changed. You have.</p>
          <p className="mb-[18px]">If any of that lands close to home, you are not alone. And you are not behind. <strong>You are at the point where a smarter move is available to you, one that most homeowners in {market === "your area" ? "the areas we serve" : market} do not even know about.</strong></p>
          <p className="mb-[18px]">(Here is the part most people your age never hear:{" "}
            <a href="#offer-form" onClick={(e) => { e.preventDefault(); scrollToForm() }} style={{ color: C.link }} className="underline underline-offset-2">there is a quieter way qualified homeowners are selling right now</a>{" "}
            that skips the repairs, the strangers walking through, and the months of waiting on a buyer who might walk away at the end.)</p>
        </section>

        <H2>The House Got Harder to Manage as the Years Went By</H2>
        <FullImage src="/images/adv-empty-rooms.jpg" alt="Quiet rooms and a staircase in a longtime family home now mostly unused" />
        <section>
          <p className="mb-[18px]">Nobody tells you this part ahead of time.</p>
          <p className="mb-[18px]">The house does not shrink. Your energy does. And slowly, the rooms you once filled go quiet. The basement becomes a storage problem. The second floor becomes somewhere you sleep, not somewhere you live.</p>
          <p className="mb-[18px]">The upkeep stays constant. A house this age always wants something. A new water heater. Gutters again. Siding that needs paint before another Wisconsin winter gets at it.</p>
          <p className="mb-[18px]">And here is the trap most people fall into: <strong>fixing it all up just to sell it can run more money than you want to spend, and more energy than you have left to give it.</strong></p>
          <p className="mb-[18px]">So the house sits. The decision sits. Another season goes by.</p>
        </section>

        <H2>What Nobody Explains About Listing a Home at This Stage of Life</H2>
        <FullImage src="/images/adv-couple-window.jpg" alt="An older couple standing quietly at the window of their longtime Wisconsin home" />
        <section>
          <p className="mb-[18px]">When most people think about selling, the first thought is an agent and a yard sign. For a young family buying their first place, that can make sense.</p>
          <p className="mb-[18px]">But at this stage, the traditional route asks a lot from you:</p>
          <ul className="mb-[18px] pl-[22px] list-disc">
            <li className="mb-2"><strong>You pay for repairs first.</strong> Agents hand you a list. New flooring. Fresh paint. Maybe the roof. Money out of your pocket before a single buyer has seen the place.</li>
            <li className="mb-2"><strong>Strangers walk through your home.</strong> Open houses mean people you have never met opening your closets and judging your kitchen while you sit in your car down the street.</li>
            <li className="mb-2"><strong>You wait. And wait.</strong> Average listings can sit for two to three months. The deal can still fall apart on the closing table after all of that.</li>
            <li className="mb-2"><strong>The fees stack up.</strong> Agent commissions and closing costs quietly take a big slice off the top. On many Wisconsin homes that adds up to tens of thousands of dollars gone before you see a check.</li>
          </ul>
          <p className="mb-[18px]">For a lot of older homeowners, that is not a sales plan. <strong>That is a part-time job you did not sign up for, at exactly the moment in your life when you want less on your plate, not more.</strong></p>
          <p className="mb-[18px]">But there is a different path. And more Wisconsin homeowners are taking it every year.</p>
        </section>

        <H2>A Quieter Way Qualified Wisconsin Homeowners Are Selling</H2>
        <FullImage src="/images/adv-handshake.jpg" alt="A friendly handshake between a local Wisconsin homeowner and a cash buyer" />
        <section>
          <p className="mb-[18px]">Over the past few years, more and more homeowners over 45 have stopped dealing with the listing process and started doing something simpler.</p>
          <p className="mb-[18px]">They sell directly to a local cash home buyer.</p>
          <p className="mb-[18px]">No repairs out of pocket. No open houses. No agent commission taken out of the number. The house sells exactly as it sits today, the homeowner picks the closing date that fits their life, and they move on.</p>
          <p className="mb-[18px]">It is not right for everyone. If you have the time, the budget, and the energy to manage a full renovation and a three-month listing, the traditional way is still an option.</p>
          <p className="mb-[18px]">But if you would rather protect your weekends, keep your privacy, and <strong>keep more of your equity for retirement, this is the path more Wisconsin homeowners your age are walking through.</strong></p>
        </section>

        <H2>Introducing {companyName}</H2>
        <FullImage src="/images/adv-local-team.jpg" alt={`Local ${companyName} team, Wisconsin cash home buyers`} />
        <section>
          <p className="mb-[18px]"><strong>{companyName} is a Wisconsin-based company that buys homes directly from homeowners across {market === "your area" ? "the areas we serve" : market}, for cash, in as-is condition.</strong></p>
          <p className="mb-[18px]">That means no repairs, no cleaning everything out, no listing, no strangers walking through, and no agent commissions taken out of your number. You tell us about the home, we take a look, and we hand you a fair written cash offer.</p>
          <p className="mb-[18px]">If the offer works for you, you pick the closing date. Need to close in two weeks? Done. Want 60 days to find your next place and pack at your own pace? That works too.</p>
          <p className="mb-[18px]">If the number is not right, there is no pressure and nothing owed. You keep the written offer to think over for as long as you like.</p>
          <p className="mb-[18px]">It is the simplest, lowest-stress way to sell a home you have lived in for years, built for exactly the stage of life you are in right now.</p>
        </section>

        <H2>How It Works</H2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-[30px]">
          {[
            { n: 1, h: "Tell Us About the Home", p: "Answer a few quick questions below. Takes about 60 seconds. No cost, no obligation." },
            { n: 2, h: "Get Your Written Offer", p: "We look at the details and put a fair cash offer in writing for your home, as-is." },
            { n: 3, h: "Pick Your Closing Day", p: "If the number works, you pick the date. We handle the paperwork. You move on your terms." },
          ].map((s) => (
            <div key={s.n} style={{ border: `1px solid ${C.rule}` }} className="rounded-lg p-5 text-center">
              <span style={{ background: C.accent }} className="inline-flex w-[34px] h-[34px] rounded-full text-white items-center justify-center font-extrabold mb-2.5">{s.n}</span>
              <h4 className="mb-1.5 text-[17px] font-bold">{s.h}</h4>
              <p style={{ color: C.muted }} className="m-0 text-[14px]">{s.p}</p>
            </div>
          ))}
        </div>

        <H2>Why It Fits This Stage of Life</H2>
        <section>
          <ul className="mb-[18px] pl-[22px] list-disc">
            <li className="mb-2"><strong>Sell exactly as-is.</strong> Not one repair. Not one coat of paint. Leave what you do not want to take. We handle it from there.</li>
            <li className="mb-2"><strong>No showings.</strong> No strangers coming through. No keeping the place spotless for weeks while buyers schedule walk-throughs.</li>
            <li className="mb-2"><strong>Keep more of your money.</strong> No agent commission and no surprise closing costs eating into what you worked your whole life to build.</li>
            <li className="mb-2"><strong>Move on your timeline.</strong> Close fast or take your time. You hold the calendar, not a buyer with a loan contingency.</li>
            <li className="mb-2"><strong>Real certainty.</strong> A real written offer from a real local Wisconsin buyer, not a maybe that falls apart on closing day.</li>
          </ul>
          <p className="mb-[18px]">This is why, once homeowners over 45 see how the process actually works, so many of them say the same thing: <em>I wish I had known this was an option sooner.</em></p>
        </section>

        {/* Inline survey form */}
        <div ref={formRef} id="offer-form" className="scroll-mt-5 my-10">
          <div className="text-center mb-5">
            <h3 className="text-[23px] md:text-[26px] font-extrabold">See What Your Home Qualifies For</h3>
            <p style={{ color: C.muted }} className="mt-1 text-[15px]">A few quick questions. No cost, no obligation, no pressure.</p>
          </div>
          <div className="flex justify-center">
            <SurveyCard phoneDisplay={phoneDisplay} phoneHref={phoneHref} serviceAreas={serviceAreas} />
          </div>
        </div>

        <H2>What Wisconsin Homeowners Are Saying</H2>
        <div className="text-center mb-6">
          <div style={{ color: "#f5a623" }} className="text-[24px] tracking-[3px]">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
          <p style={{ color: C.muted }} className="text-[14px] mt-1">Rated <strong>5.0</strong> across <strong>20</strong> Google reviews</p>
        </div>
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-5 my-[24px] mb-10">
          {[
            { img: "/images/adv-testimonial-1.jpg", quote: "Nick and Jen were an absolute godsend. Wonderful communication, upfront and honest through the end, easy to work with, and flexible. So much simpler and less headache than a realtor. This was truly a win win transaction.", cite: "Angela Z." },
            { img: "/images/adv-testimonial-2.jpg", quote: "I contacted Ugly Duckling on a Saturday evening and Nick responded almost immediately. They were very transparent and honest about our home and its worth, and we closed with ease. I highly recommend this team. Super professional.", cite: "Tiffany E." },
            { img: "/images/adv-testimonial-3.jpg", quote: "My late brother left behind two properties, and both needed work. In an estate situation you are not in a position to spend money making a property salable. They evaluated it, were upfront about their numbers, and offered a fair price with full disclosure. As a bonus, they do not require the property be empty.", cite: "Chip L." },
            { img: "/images/adv-testimonial-4.jpg", quote: "We called Ugly Duckling because we wanted to sell fast and were unsure we could. They came to our house the same day I called, gave honest feedback and advice, and followed up frequently. It was obvious they care about what they do and about doing right by people.", cite: "Noelle H." },
          ].map((t) => (
            <figure key={t.cite} style={{ border: `1px solid ${C.rule}` }} className="m-0 text-[15px] leading-[1.55] rounded-lg p-[18px]">
              <Image src={t.img} alt={t.cite} width={300} height={300} className="w-full h-auto aspect-square object-cover rounded-md mb-3 block bg-gray-100" />
              <div style={{ color: "#f5a623" }} className="tracking-[1px] mb-2">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
              <p className="mb-2.5">{t.quote}</p>
              <cite style={{ color: C.muted }} className="not-italic text-[13px] font-semibold">{t.cite} &middot; Verified Google review</cite>
            </figure>
          ))}
        </section>

        <H2>So Here Is the Choice</H2>
        <section>
          <p className="mb-[18px]">The way I see it, you have two paths.</p>
          <p className="mb-[18px]"><strong>Path one</strong> is the long way. Spend money on repairs for a house you are already leaving. Let strangers tour it for months. Hand over a big slice to agents and closing costs. Hope the deal holds together right up until the closing table.</p>
          <p className="mb-[18px]"><strong>Path two</strong> is the simpler way. Tell a trusted local Wisconsin buyer about the home, get a fair written cash offer, pick the date you close. No repairs, no showings, no fees out of your number.</p>
          <p className="mb-[18px]">There is a reason you read this far. Something in you already knows the house is ready for its next chapter, and so are you.</p>
        </section>

        <h3 className="text-[21px] md:text-[27px] leading-[1.32] font-extrabold text-center mx-auto my-[46px] max-w-[640px]">
          You spent years taking care of that house. At this point, it should be doing something for you, not the other way around.
        </h3>

        {/* Offer card with dual countdown */}
        <aside style={{ border: "2px dashed #bdbdbd" }} className="rounded-[10px] px-7 py-[30px] max-w-[600px] mx-auto mt-[50px] text-center">
          <Image src="/images/adv-keys-couple.jpg" alt="Happy Wisconsin homeowners after a smooth cash sale" width={170} height={170} className="w-[170px] h-[170px] object-cover rounded-full mx-auto mb-4 block bg-gray-100" />
          <h4 className="text-[22px] font-bold mb-1.5">{companyName} &middot; Cash Offer Program</h4>
          <p style={{ color: C.accent }} className="text-[26px] font-extrabold mb-2">Get Your Fair Written Cash Offer</p>
          <p className="text-[15px] mb-5">Sell as-is anywhere in Wisconsin. No repairs, no showings, no agent fees. You pick the closing date.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-[22px]">
            <div style={{ background: "#fbf4f4", border: "1px solid #f0d9d9" }} className="rounded-lg px-2.5 py-3.5">
              <p style={{ color: C.warn }} className="text-xs uppercase tracking-[0.08em] font-bold mb-1.5">This Week&apos;s Offer Window Closes In</p>
              <div className="text-[24px] font-extrabold tabular-nums text-[#1a1a1a]">{cdA}</div>
            </div>
            <div style={{ background: "#fbf4f4", border: "1px solid #f0d9d9" }} className="rounded-lg px-2.5 py-3.5">
              <p style={{ color: C.warn }} className="text-xs uppercase tracking-[0.08em] font-bold mb-1.5">Program Enrollment Ends In</p>
              <div className="text-[24px] font-extrabold tabular-nums text-[#1a1a1a]">{cdB}</div>
            </div>
          </div>
          <p style={{ color: C.warn }} className="text-[14px] font-bold mb-[18px]">Only {slots} offer reviews left for Wisconsin homeowners this week</p>
          <a href="#offer-form" onClick={(e) => { e.preventDefault(); scrollToForm() }} style={{ background: C.cta }} className="block w-full text-white no-underline font-extrabold text-[17px] text-center px-5 py-[17px] rounded-[40px] hover:opacity-95 transition-opacity">
            See What My Home Qualifies For &rarr;
          </a>
        </aside>

        <p style={{ color: C.muted }} className="max-w-[760px] mx-auto mt-10 text-[12px] leading-[1.5] text-center">
          This is an advertorial. {companyName} is a real estate investment company, not a licensed real estate brokerage, and does not provide real estate brokerage services. Cash offers are based on property condition, location, and market value. No offer is guaranteed until presented in writing. There is no cost and no obligation to request an offer. Testimonials reflect individual experiences and are not a guarantee of outcome.
        </p>
      </article>

      {/* Sticky address bar at TOP (fixed top-0). Dropdown renders downward into the page
          so Google Places autocomplete is fully visible. Hidden via translateY(-120%) when
          not active, revealed on scroll. */}
      <div
        style={{
          borderBottom: `1px solid ${C.rule}`,
          boxShadow: "0 6px 20px rgba(0,0,0,.10)",
          transform: showSticky && !modalOpen ? "none" : "translateY(-120%)",
          transition: "transform .3s ease",
        }}
        className="fixed left-0 right-0 top-0 z-40 bg-white px-4 py-3"
      >
        <div className="max-w-[760px] mx-auto flex gap-2.5 items-center">
          <label className="hidden sm:block text-[13px] font-bold whitespace-nowrap">Enter your address to start:</label>
          <div className="flex-1 min-w-0">
            <AddressAutocomplete
              value={stickyAddr}
              onChange={setStickyAddr}
              onSelect={handleStickySelect}
              placeholder="Your property address"
            />
          </div>
          <button
            onClick={goToForm}
            style={{ background: C.cta }}
            className="px-4 sm:px-[18px] py-3 text-white rounded-[9px] text-[14px] sm:text-[15px] font-extrabold whitespace-nowrap hover:opacity-95 transition-opacity"
          >
            See My Cash Offer &rarr;
          </button>
        </div>
      </div>

      {/* Popup modal - opens at step 2 (address already captured) or step 1 if no address.
          No AddressAutocomplete in the popup body, so no dropdown-trap issue. */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start sm:items-center justify-center overflow-y-auto p-4"
          style={{ background: "rgba(0,0,0,0.55)" }}
          onClick={() => setModalOpen(false)}
        >
          <div className="relative w-full max-w-[600px] my-4" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setModalOpen(false)}
              aria-label="Close"
              className="absolute -top-3 -right-3 z-10 h-9 w-9 rounded-full bg-white text-gray-700 text-xl font-bold shadow-md flex items-center justify-center hover:bg-gray-100"
            >
              &times;
            </button>
            <SurveyCard
              key={seededAddress || "modal"}
              phoneDisplay={phoneDisplay}
              phoneHref={phoneHref}
              serviceAreas={serviceAreas}
              initialAddress={seededAddress}
              initialStep={seededStep}
            />
          </div>
        </div>
      )}
    </div>
  )
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[23px] md:text-[30px] leading-[1.22] font-extrabold text-center my-[52px] mb-[26px] tracking-[-0.005em]">{children}</h2>
  )
}

function FullImage({ src, alt }: { src: string; alt: string }) {
  return (
    <figure className="my-[8px] mb-[30px]">
      <Image src={src} alt={alt} width={760} height={500} className="block w-full h-auto rounded-[3px] bg-gray-100" />
    </figure>
  )
}
