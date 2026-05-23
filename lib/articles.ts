// Single source of truth for the advertorial article library.
// Used by the /articles index and the "keep reading" loop at the bottom of every article.

export interface ArticleMeta {
  slug: string // full path, e.g. "/articles/whats-the-catch"
  title: string
  teaser: string
  image: string
}

export const ARTICLES: ArticleMeta[] = [
  {
    slug: "/articles/what-happens-next",
    title:
      "What Really Happens After You Ask for a Cash Offer (Most Wisconsin Homeowners Are Relieved)",
    teaser:
      "A clear, step-by-step look at the whole process, so you know exactly what to expect before you make a single call.",
    image: "/images/adv-keys-couple.jpg",
  },
  {
    slug: "/articles/the-truth-about-lowball-offers",
    title:
      "The Truth About Cash Offers: Why the Number You Keep Matters More Than the Sticker Price",
    teaser:
      "The comparison most sellers get backwards, and how to run the honest math before you decide anything.",
    image: "/images/adv-handshake.jpg",
  },
  {
    slug: "/articles/real-buyer-vs-tire-kicker",
    title:
      "How to Tell a Serious Cash Buyer From a Tire-Kicker Before You Share a Single Detail",
    teaser:
      "Five plain questions that filter the real buyers from the flakes, in about five minutes flat.",
    image: "/images/adv-local-team.jpg",
  },
  {
    slug: "/articles/cash-offer-vs-agent",
    title:
      "Cash Offer or List With an Agent? An Honest Side-by-Side for Wisconsin Homeowners",
    teaser:
      "Neither route is right for everyone. Here is how to line them up fairly so you choose what fits your home and your life.",
    image: "/images/adv-strangers-open-house.jpg",
  },
  {
    slug: "/articles/whats-the-catch",
    title:
      "No Repairs. No Showings. No Agent Fees. So What Is the Catch With a Cash Offer?",
    teaser:
      "An honest look at where the money actually comes from, and what the real trade-off is.",
    image: "/images/adv-couple-kitchen.jpg",
  },
  {
    slug: "/articles/fix-up-before-selling",
    title:
      "Should You Fix Up Your Wisconsin Home Before You Sell? The Math Most Homeowners Miss",
    teaser:
      "The instinct to renovate first is understandable. Here is why it often costs more than it earns back.",
    image: "/images/adv-homeowner-repair.jpg",
  },
  {
    slug: "/articles/real-cash-buyer-vs-scam",
    title:
      "How To Spot a Legit Cash Buyer vs. a Scam: 5 Questions That Tell You Everything",
    teaser:
      "Five direct questions every honest buyer will answer without hesitation, so you stay protected.",
    image: "/images/adv-phone-vetting.jpg",
  },
  {
    slug: "/articles/wait-for-better-market",
    title:
      "Is Now a Bad Time to Sell in Wisconsin? Why Waiting for the Market Can Quietly Cost You",
    teaser:
      "Holding out for a higher price feels patient. Here is what that patience actually costs while you wait.",
    image: "/images/adv-couple-window.jpg",
  },
  {
    slug: "/articles/sell-it-yourself",
    title:
      "Why Not Just Sell It Yourself and Keep Every Dollar? The Hidden Cost of Going It Alone",
    teaser:
      "Skipping the middleman sounds smart. Here is what it actually takes, and where it tends to go sideways.",
    image: "/images/adv-paperwork-alone.jpg",
  },
]
