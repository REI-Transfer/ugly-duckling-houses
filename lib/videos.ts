// Video manifest (Second Shoot, Oct 2026). Files live in the Vercel Blob store
// `ugly-duckling-houses-blob` (store_IlhHuOyAlQ2zXwHx), folder `videos/`.

const BLOB_BASE = "https://ilhhuoyalq2zxwhx.public.blob.vercel-storage.com/videos"

const blob = (file: string) => (BLOB_BASE ? `${BLOB_BASE}/${file}` : "")

// Landing hero VSL (UD26), sits right above the form.
export const HERO_VIDEO = {
  url: blob("UD26.mp4"),
  // Skip the fade-in so the first frame shows the title card.
  startAt: 2,
}

// Thank-you page intro (UD7), shown at the top.
export const THANKYOU_TOP_VIDEO = {
  url: blob("UD7.mp4"),
  title: "Thanks! Here's What Happens Next",
}

export interface LibraryVideo {
  id: string
  title: string
  url: string
}

export interface LibraryCategory {
  category: string
  videos: LibraryVideo[]
}

// Thank-you video library, grouped by topic.
export const VIDEO_LIBRARY: LibraryCategory[] = [
  {
    category: "Your Offer",
    videos: [
      { id: "ud4", title: "Will You Lowball Me?", url: blob("UD4.mp4") },
      { id: "ud22", title: "Exactly How We Calculate Your Offer", url: blob("UD22.mp4") },
      { id: "ud19", title: "Can I Negotiate the Offer?", url: blob("UD19.mp4") },
      { id: "ud8", title: "Will the Price Drop Before Closing?", url: blob("UD8.mp4") },
      { id: "ud6", title: "What If I Owe Back Taxes or Have Liens?", url: blob("UD6.mp4") },
    ],
  },
  {
    category: "Selling As-Is",
    videos: [
      { id: "ud5", title: "What Does As-Is Really Mean?", url: blob("UD5.mp4") },
      { id: "ud23", title: "Will You Ask for Money Off After the Inspection?", url: blob("UD23.mp4") },
      { id: "ud2", title: "Do I Have to Clean Out the House?", url: blob("UD2.mp4") },
      { id: "ud1", title: "What Happens to My House After I Sell?", url: blob("UD1.mp4") },
    ],
  },
  {
    category: "Timeline & Moving",
    videos: [
      { id: "ud13", title: "How Fast Can You Close?", url: blob("UD13.mp4") },
      { id: "ud24", title: "Can I Stay in the House After Closing?", url: blob("UD24.mp4") },
      { id: "ud9", title: "Can You Help With Moving Costs?", url: blob("UD9.mp4") },
    ],
  },
  {
    category: "Why Ugly Duckling",
    videos: [
      { id: "ud16", title: "What Makes Us Different?", url: blob("UD16.mp4") },
      { id: "ud17", title: "Should I List With a Realtor Instead?", url: blob("UD17.mp4") },
      { id: "ud18", title: "My House Is in Good Shape. Why Sell to You?", url: blob("UD18.mp4") },
      { id: "ud10", title: "How to Spot a Cash Buyer Scam", url: blob("UD10.mp4") },
      { id: "ud21", title: "Look Us Up Before You Decide", url: blob("UD21.mp4") },
    ],
  },
]

// Only videos with a URL are shown; empty categories are dropped.
export const ACTIVE_LIBRARY: LibraryCategory[] = VIDEO_LIBRARY
  .map((c) => ({ ...c, videos: c.videos.filter((v) => v.url) }))
  .filter((c) => c.videos.length > 0)
