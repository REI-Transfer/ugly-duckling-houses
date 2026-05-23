import { ArticleShell, H2, P, UL, ArticleImage } from "@/components/article/article-shell"
import { ContactCTA } from "@/components/article/contact-cta"
import config from "@/lib/config"

export const metadata = {
  title: `No Repairs. No Showings. No Fees. So What Is the Catch? | ${config.companyName}`,
  description:
    "An honest look at where the money comes from in a cash home sale, and what the real trade-off actually is for Wisconsin homeowners.",
}

export default function Page() {
  const area = config.marketName || "the areas we serve"
  return (
    <ArticleShell
      title="No Repairs. No Showings. No Agent Fees. So What Is the Catch With a Cash Offer?"
      dek="An honest look at where the money actually comes from, and what the real trade-off is."
      companyName={config.companyName}
    >
      <P>
        That is a fair question, and it deserves a straight answer.
      </P>
      <P>
        When someone tells you they will buy your Wisconsin home as-is, skip all the repairs, skip
        the showings, and waive the agent commissions, it is completely reasonable to pause and
        ask what you are missing. People who have been around long enough know that when something
        sounds easier than expected, there is usually something underneath it.
      </P>
      <P>
        So let us talk about what is underneath it. No deflection, no spin. Just the actual
        explanation.
      </P>

      <ArticleImage
        src="/images/adv-couple-kitchen.jpg"
        alt="A Wisconsin homeowner couple thinking it through at the kitchen table"
        caption="The question is fair. Here is the honest answer."
      />

      <H2>Where the Money Comes From</H2>
      <P>
        A local cash buyer makes money by doing the work you do not want to do. Here is how that
        actually plays out.
      </P>
      <P>
        When a Wisconsin cash buyer looks at your home, they are not just seeing it as it is
        today. They are calculating what it will be worth after renovations. New flooring. Updated
        kitchen. Repaired roof. Fresh paint. Whatever the home needs to be move-in ready and
        appealing to the next buyer.
      </P>
      <P>
        They estimate the cost of all that work. They factor in the months it will take to do it.
        They account for the carrying costs during that time: property taxes, insurance, utilities,
        interest on the capital they put in. Then they need to leave room for a fair margin,
        because that is how they stay in business and keep buying homes across {area}.
      </P>
      <P>
        So the offer you receive is the after-repair value of your home, minus the cost of the
        repairs, minus the carrying costs, minus a reasonable profit margin. That is the formula.
        There is no mystery.
      </P>

      <H2>So the Catch Is That the Offer Is Lower Than a Listing Price</H2>
      <P>
        Yes. That is the trade-off, and we are not going to dress it up.
      </P>
      <P>
        A cash offer will typically be lower than what a fully repaired and professionally marketed
        Wisconsin home might achieve on the open market. That gap is real.
      </P>
      <P>
        But here is what fills that gap from your side of the transaction:
      </P>
      <UL>
        <li>
          You do not spend money on repairs and updates. Whatever the home needs, that comes out
          of the buyer's budget, not yours.
        </li>
        <li>
          You do not pay agent commissions. That is typically 5 to 6 percent of the sale price.
          On many Wisconsin homes, that alone is $10,000 to $20,000 or more.
        </li>
        <li>
          You do not pay the closing costs that sellers typically absorb in a traditional sale.
        </li>
        <li>
          You do not carry the home for months while it sits on the market. Every month of
          mortgage, taxes, insurance, and utilities is money you keep.
        </li>
        <li>
          You do not deal with a deal falling apart at the last minute because a buyer's financing
          fell through. That certainty is worth real money.
        </li>
      </UL>
      <P>
        When you add up what you save, the actual difference between the cash net and the listing
        net is often far smaller than the headline numbers suggest. Sometimes it is nothing. For
        some Wisconsin homes, after everything is counted, the cash route puts more money in your
        pocket.
      </P>

      <ArticleImage
        src="/images/adv-homeowner-repair.jpg"
        alt="A Wisconsin homeowner looking at a repair problem in the house"
        caption="The repairs the listing agent wants you to do first come out of your pocket. In a cash sale, that cost transfers to the buyer."
      />

      <H2>The Other Catch That Nobody Talks About</H2>
      <P>
        There is another version of the catch that most people miss, and it runs in the opposite
        direction.
      </P>
      <P>
        The catch with a traditional listing is the time, the disruption, and the uncertainty.
        It is the months of keeping your home spotless for strangers to walk through. It is the
        repair bills you front before you have seen a dollar. It is the possibility that the deal
        falls apart after 90 days and you start over.
      </P>
      <P>
        For a lot of Wisconsin homeowners over 45, those are not small costs. They are significant
        costs: financial, physical, and personal. The convenience of a cash sale is not just a
        luxury. For many people, it is the practical choice given where they are in life.
      </P>

      <H2>How to Know If the Trade-Off Works for You</H2>
      <P>
        Run the honest comparison. Here is how to do it in plain steps.
      </P>
      <P>
        First, figure out what your home might realistically sell for on the traditional market
        in its current condition. Not after repairs. Right now.
      </P>
      <P>
        Second, estimate what repairs and updates an agent would want you to do before listing,
        and what that would cost.
      </P>
      <P>
        Third, subtract the agent commission (call it 5 to 6 percent), closing costs, and a
        realistic number of months of carrying costs if it sits for two to three months.
      </P>
      <P>
        That is your real net from a listing. Compare it to the cash offer. That is the honest
        side-by-side.
      </P>
      <P>
        For some Wisconsin homeowners that comparison makes the traditional route the clear winner.
        For many, especially those with homes needing work or those who want certainty over
        maximum price, the cash option looks a lot better than they expected.
      </P>

      <ArticleImage
        src="/images/adv-numbers-table.jpg"
        alt="Running the real numbers at a Wisconsin kitchen table"
        caption="Run the actual math. Most Wisconsin homeowners are surprised by how close the numbers really are."
      />

      <H2>The Bottom Line</H2>
      <P>
        The catch with a cash offer is that the offer is lower than a peak listing price. That
        is the honest answer. But the catch with the traditional route is the repairs, the time,
        the disruption, the fees, and the risk. When you weigh the full picture, neither option
        is free.
      </P>
      <P>
        What a cash offer gives you is a clean, simple transaction where you know exactly what
        you are getting, on a date you choose, without putting anything more into a house you are
        already planning to leave.
      </P>
      <P>
        Whether that trade is right for you is your call. But it is a trade worth understanding
        clearly before you decide.
      </P>

      <ContactCTA
        phoneDisplay={config.phoneDisplay}
        phoneHref={config.phoneHref}
        smsKeyword={config.smsKeyword}
        heading="See the real number. Then decide."
        subheading={`Text us the word ${config.smsKeyword} or call. A written offer costs nothing and gives you something real to compare.`}
      />
    </ArticleShell>
  )
}
