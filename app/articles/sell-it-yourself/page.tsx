import { ArticleShell, H2, P, UL, ArticleImage } from "@/components/article/article-shell"
import { ContactCTA } from "@/components/article/contact-cta"
import config from "@/lib/config"

export const metadata = {
  title: `Why Not Just Sell Your Wisconsin Home Yourself? The Real Cost of Going It Alone | ${config.companyName}`,
  description:
    "Skipping the middleman and selling your Wisconsin home yourself sounds like keeping every dollar. Here is what it actually takes, and where it tends to go sideways.",
}

export default function Page() {
  const area = config.marketName || "the areas we serve"
  return (
    <ArticleShell
      title="Why Not Just Sell It Yourself and Skip the Middleman? The Hidden Cost of Going It Alone"
      dek="Selling on your own sounds like keeping every dollar. Here is what it actually takes, and where it tends to go sideways."
      companyName={config.companyName}
    >
      <P>
        The logic is simple and appealing. If you sell your Wisconsin home through an agent, you
        pay them 5 to 6 percent. On a $200,000 home, that is $10,000 to $12,000 gone. Why not
        skip the agent, do the work yourself, and keep that money?
      </P>
      <P>
        It is a fair question. For the right seller with the right home in the right market, it
        can work. But for a lot of Wisconsin homeowners, especially those selling a lived-in,
        older home, going it alone turns out to be far more demanding than it looked from the
        outside.
      </P>
      <P>
        Let us walk through what it actually involves.
      </P>

      <ArticleImage
        src="/images/adv-paperwork-alone.jpg"
        alt="A Wisconsin homeowner sitting alone with a stack of paperwork from the sale process"
        caption="The paperwork alone can be daunting. And it is only one part of a for-sale-by-owner transaction."
      />

      <H2>What You Take On When You Sell It Yourself</H2>
      <P>
        Selling your own Wisconsin home, called FSBO for sale by owner, means you take over every
        job the agent would have done. All of it.
      </P>
      <UL>
        <li>
          You set the listing price. This requires researching recent sales in your specific
          Wisconsin neighborhood, accounting for condition differences, and landing on a price
          that is competitive but not underselling. Pricing too high means it sits. Too low means
          you leave money behind.
        </li>
        <li>
          You prepare and list the home. Photography, the MLS listing if you can access it through
          a flat-fee service, Zillow, social media. You write the description, manage the photos,
          and handle the marketing.
        </li>
        <li>
          You schedule and host all showings. That means being available on short notice, leaving
          your home so strangers can walk through, and fielding feedback.
        </li>
        <li>
          You negotiate the offers. You review each offer yourself, counter-offer when needed, and
          navigate the back-and-forth on price, contingencies, and closing timelines without an
          experienced negotiator on your side.
        </li>
        <li>
          You manage the inspections and repairs. The buyer will have an inspection. Their findings
          become a negotiation. You either fix things, credit the buyer, or risk losing the deal.
        </li>
        <li>
          You coordinate with the title company, the buyer's lender, and the closing attorneys
          to get to an actual closing day.
        </li>
      </UL>
      <P>
        That is a real job. Not a side project. A real, time-consuming, knowledge-intensive job
        that experienced agents spend years learning how to do efficiently.
      </P>

      <H2>The Commission Savings Are Usually Smaller Than They Look</H2>
      <P>
        Here is the piece that catches most Wisconsin FSBO sellers off guard. Even when you
        eliminate the listing agent, in most transactions you still pay the buyer's agent
        commission. That is typically 2.5 to 3 percent of the sale price, because most buyers
        are represented by an agent and expect that commission to come from the sale.
      </P>
      <P>
        So the real saving is only the listing side commission, roughly 2.5 to 3 percent, not the
        full 5 to 6 percent people imagine. On a $200,000 home, that is $5,000 to $6,000 in
        savings, before you subtract the time you spent managing everything, any flat-fee MLS
        services you paid for, and any price reduction you accepted to move the property.
      </P>
      <P>
        The math still can be worth it. But the savings are usually half of what people going into
        a FSBO expect.
      </P>

      <ArticleImage
        src="/images/adv-strangers-open-house.jpg"
        alt="Strangers touring a Wisconsin home during an open house the seller is managing themselves"
        caption="When you sell it yourself, you manage every showing, every open house, and every stranger in your home."
      />

      <H2>Where FSBO Sales Tend to Go Sideways in Wisconsin</H2>
      <P>
        The most common problems Wisconsin homeowners run into when selling on their own:
      </P>
      <UL>
        <li>
          Overpricing the home because of emotional attachment or unfamiliarity with what buyers
          in the current Wisconsin market will actually pay. An overpriced home sits while the
          carrying costs add up.
        </li>
        <li>
          Under-qualifying buyers. An agent routinely screens buyers for financing before showing
          the home. FSBO sellers sometimes spend weeks negotiating with buyers who cannot actually
          close the deal.
        </li>
        <li>
          Missing legal disclosures. Wisconsin has specific disclosure requirements for home
          sellers. Missing required disclosures can create legal liability that follows you long
          after closing.
        </li>
        <li>
          Negotiating at a disadvantage. Buyers using experienced agents are skilled negotiators.
          Most FSBO sellers are not, and they often concede more than they realize during the
          offer and inspection negotiation process.
        </li>
        <li>
          Deals falling through at the last minute. Without an experienced person managing the
          transaction, minor issues that an agent would handle routinely become deal-killers.
        </li>
      </UL>

      <H2>Who the FSBO Route Actually Makes Sense For</H2>
      <P>
        Selling it yourself makes the most sense when you have prior real estate experience or
        are willing to invest real time learning the process, when you already have a buyer lined
        up such as a family member or neighbor, when your Wisconsin home is in excellent condition
        and needs minimal prep, and when you have a flexible timeline and can afford to wait for
        the right buyer.
      </P>
      <P>
        If several of those apply to you, FSBO is worth exploring.
      </P>

      <H2>The Simpler Path for Most Wisconsin Homeowners</H2>
      <P>
        For Wisconsin homeowners over 45 with an older home, a busy life, or a specific timeline,
        the FSBO path asks a lot. The savings are real but smaller than expected. The workload is
        larger than expected. And the risk of something going wrong is higher without experienced
        support.
      </P>
      <P>
        Selling directly to a local Wisconsin cash buyer eliminates the whole FSBO challenge.
        There are no showings to manage, no pricing research to conduct, no negotiations to
        handle, no disclosure paperwork to navigate, and no buyer financing to worry about. A
        single written offer, a date you pick, and a clean close.
      </P>
      <P>
        Whether you compare it to a FSBO or a traditional listing, the cash route often comes out
        ahead when you count everything honestly, not just the commission line.
      </P>

      <ContactCTA
        phoneDisplay={config.phoneDisplay}
        phoneHref={config.phoneHref}
        smsKeyword={config.smsKeyword}
        heading="Skip all of it. One offer, one closing, one date you choose."
        subheading={`Text us the word ${config.smsKeyword} or call. A written offer on your Wisconsin home, no repairs, no showings, no agent fees.`}
      />
    </ArticleShell>
  )
}
