import { ArticleShell, H2, P, UL, ArticleImage } from "@/components/article/article-shell"
import { ContactCTA } from "@/components/article/contact-cta"
import config from "@/lib/config"

export const metadata = {
  title: `Should You Fix Up Your Wisconsin Home Before Selling? The Math Most Homeowners Miss | ${config.companyName}`,
  description:
    "The instinct to renovate first is understandable. But for many Wisconsin homeowners, fixing up before selling costs more than it earns back.",
}

export default function Page() {
  const area = config.marketName || "the areas we serve"
  return (
    <ArticleShell
      title="Should You Fix Up Your Wisconsin Home Before You Sell? The Math Most Homeowners Miss"
      dek="The instinct to renovate first is understandable. Here is why it often costs more than it earns back."
      companyName={config.companyName}
    >
      <P>
        The instinct makes complete sense. You have spent years, maybe decades, taking care of
        this Wisconsin home. Of course you want it to look right before you hand it to someone
        else. And somewhere along the way, someone told you that spending money on repairs before
        you list will get you more money in the end.
      </P>
      <P>
        Sometimes that is true. Often, it is not. And for a lot of Wisconsin homeowners over 45,
        the math works out in a way that surprises people once they actually run the numbers.
      </P>
      <P>
        Let us take a careful look at what the fix-up-first strategy actually costs, and when it
        makes sense versus when it quietly works against you.
      </P>

      <ArticleImage
        src="/images/adv-homeowner-repair.jpg"
        alt="A Wisconsin homeowner evaluating what repairs are needed before selling"
        caption="The repair list feels manageable until you start getting real estimates."
      />

      <H2>What an Agent's Repair List Usually Looks Like</H2>
      <P>
        When you sit down with a listing agent, they will typically hand you a list of things to
        address before the home goes on the market. Some of it is cosmetic. Some of it is
        structural. All of it costs money.
      </P>
      <P>
        Common items on Wisconsin listing prep lists:
      </P>
      <UL>
        <li>Fresh interior paint throughout, often including trim and doors.</li>
        <li>New flooring in worn areas, particularly carpet and hardwood refinishing.</li>
        <li>Landscaping and exterior work, especially after a Wisconsin winter.</li>
        <li>Roof repairs or replacement if there is visible wear.</li>
        <li>Furnace or HVAC inspection and any needed service.</li>
        <li>Kitchen and bathroom updates, even modest ones, to appeal to buyers.</li>
        <li>Minor plumbing and electrical issues flagged in a pre-inspection.</li>
      </UL>
      <P>
        Add those up and you are looking at anywhere from $10,000 to $40,000 or more depending on
        the condition of your Wisconsin home. And that is before you start the listing clock.
      </P>

      <H2>The Return on Renovation Is Rarely What You Expect</H2>
      <P>
        Here is the part the enthusiastic renovation pitch tends to skip.
      </P>
      <P>
        Most home improvements do not return their full cost when you sell. A kitchen update
        that costs $15,000 might add $8,000 to $10,000 of value to buyers. New flooring that
        costs $8,000 might get you $5,000 back. The return on investment for pre-sale renovations
        is rarely dollar-for-dollar, and often much less.
      </P>
      <P>
        The Remodeling Magazine cost versus value study has tracked this for years. For most
        major Wisconsin home renovations, you recover somewhere between 50 and 75 cents on the
        dollar when you sell. That means on a $20,000 renovation, you may only recoup $10,000 to
        $15,000 in added sale price.
      </P>
      <P>
        <strong>You are spending money to get back less money.</strong> For some homes in some
        markets, the listing price increase justifies it. For many, it does not.
      </P>

      <ArticleImage
        src="/images/adv-renovation.jpg"
        alt="A home renovation in progress in Wisconsin"
        caption="Renovation costs tend to run over estimate and timelines tend to run long. Both of those affect your carrying costs."
      />

      <H2>The Costs That Run While You Wait</H2>
      <P>
        Here is the number most people leave off the repair-first calculation entirely. The
        carrying costs.
      </P>
      <P>
        While you are managing repairs and contractors, and while the home sits on the market
        after listing, you are paying for it. Mortgage or equity interest, property taxes,
        insurance, utilities. In Wisconsin, winter utility bills alone on an older home can run
        $200 to $400 a month.
      </P>
      <P>
        Say repairs take two months and the home sits on the market for another two months before
        closing. That is four months of carrying costs. On a $1,500 per month total holding cost,
        you have just spent $6,000 more before you see a dollar.
      </P>
      <P>
        Add that to a $20,000 renovation where you only recoup $14,000 in added value, and the
        repair-first strategy has cost you $12,000 net instead of saving you anything.
      </P>

      <H2>When Renovating Before Selling Does Make Sense</H2>
      <P>
        We want to be fair here. There are situations where fixing up before listing is genuinely
        the right move.
      </P>
      <P>
        If your Wisconsin home is in strong condition and only needs minor cosmetic updates, a
        small investment can meaningfully move buyer perception and the final price. Fresh neutral
        paint and clean carpets, for example, can pay for themselves.
      </P>
      <P>
        If you are in a very competitive Wisconsin market where homes in excellent condition are
        commanding strong premiums over as-is homes, the math can tilt toward renovation.
      </P>
      <P>
        And if you have the time and the budget and you genuinely enjoy the process, a thoughtful
        renovation can be worthwhile even when the return is not quite dollar-for-dollar.
      </P>

      <H2>When Skipping the Renovations Is the Smarter Call</H2>
      <P>
        For many Wisconsin homeowners, particularly those over 45 with a home that needs
        meaningful work, skipping the renovation and selling for cash is the more practical path.
      </P>
      <UL>
        <li>
          If the home needs $30,000 or more in repairs, the net return on that investment is
          rarely enough to justify the cost, the time, and the disruption.
        </li>
        <li>
          If you do not want to manage contractors, timelines, and the unpredictability of
          construction in your home, the disruption has a real personal cost.
        </li>
        <li>
          If you want certainty about the timeline and the final number, rather than hoping the
          market cooperates after months of work, a cash offer gives you that.
        </li>
        <li>
          If the carrying costs of holding and repairing a home for several months are
          meaningful to you, stopping the meter on a specific date matters.
        </li>
      </UL>
      <P>
        A local Wisconsin cash buyer will purchase your home in its current condition. You skip
        the repair bill, you skip the renovation timeline, and you know the exact date you stop
        carrying costs. When you compare the actual net to the actual net, many Wisconsin
        homeowners find the cash option beats the repair-first option.
      </P>

      <ContactCTA
        phoneDisplay={config.phoneDisplay}
        phoneHref={config.phoneHref}
        smsKeyword={config.smsKeyword}
        heading="See what your home qualifies for, as-is"
        subheading={`Text us the word ${config.smsKeyword} or call. Get a written offer on your home exactly as it sits today, no repairs needed.`}
      />
    </ArticleShell>
  )
}
