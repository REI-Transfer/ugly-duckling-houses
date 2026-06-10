"use client"

import { useState } from "react"
import { Play } from "lucide-react"

interface Vid {
  id: string
  title: string
}

interface TabDef {
  label: string
  videos: Vid[]
}

// Pulled from the @UglyDucklingHouses YouTube channel, split into two tabs.
const TABS: TabDef[] = [
  {
    label: "Customer Testimonials",
    videos: [
      { id: "PEEt0FVNNOk", title: "Rehab Gone Wrong: Eileen's Hassle-Free Home Sale" },
      { id: "FrqCSzMKDlE", title: "Angela's Home Selling Journey" },
      { id: "bCFAxVaJMVY", title: "Jeff's Testimonial: Hassle-Free Home Selling" },
      { id: "Q13yFZF3_xE", title: "Jessica's Testimonial" },
      { id: "q_shVmOenrM", title: "Chris's Testimonial" },
      { id: "Ml-shqH4QV8", title: "Cindy's Testimonial" },
      { id: "7mMfhWqQdws", title: "Ryan's Testimonial" },
      { id: "oQaSUqSPJqo", title: "Ross & Sara's Testimonial" },
      { id: "Hjz2f1VgpI4", title: "Greg's Testimonial" },
      { id: "CQ6b1zBGW7A", title: "Manny's Testimonial" },
      { id: "tb4DIiMeuGg", title: "Connie's Testimonial" },
    ],
  },
  {
    label: "See How It Works",
    videos: [
      { id: "amnSKx785Ng", title: "Seller Horror Story: How a Wholesaler Almost Stole $120,000" },
      { id: "TaBpb6kPFI8", title: "Ugly Duckling Houses vs Grandview Homes vs We Buy Ugly Houses" },
      { id: "WfIfARYEtqE", title: "Faulkner Rd. Before & After" },
      { id: "0NGipCL39_w", title: "Sell Your House Fast With Ugly Duckling Houses" },
    ],
  },
]

export function VideoTestimonials({ accent = "#32bc87" }: { accent?: string }) {
  const [tab, setTab] = useState(0)
  const [selected, setSelected] = useState<Vid>(TABS[0].videos[0])
  const [playing, setPlaying] = useState(false)

  const switchTab = (i: number) => {
    setTab(i)
    setSelected(TABS[i].videos[0])
    setPlaying(false)
  }

  const pick = (v: Vid) => {
    setSelected(v)
    setPlaying(true)
  }

  const embedSrc =
    `https://www.youtube.com/embed/${selected.id}?rel=0&playsinline=1` +
    (playing ? "&autoplay=1" : "")

  return (
    <div>
      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {TABS.map((t, i) => (
          <button
            key={t.label}
            onClick={() => switchTab(i)}
            className="rounded-full px-5 py-2.5 text-sm font-semibold transition-colors"
            style={
              tab === i
                ? { backgroundColor: accent, color: "#ffffff" }
                : { backgroundColor: "#ffffff", color: "#374151", border: "1px solid #e5e7eb" }
            }
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Selected video player (16:9) */}
      <div className="mx-auto max-w-3xl">
        <div
          className="relative overflow-hidden rounded-2xl bg-black shadow-lg"
          style={{ aspectRatio: "16 / 9" }}
        >
          <iframe
            key={`${selected.id}-${playing ? "play" : "idle"}`}
            src={embedSrc}
            title={selected.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
        </div>
        <p className="mt-3 text-center text-base font-semibold text-gray-900">{selected.title}</p>
      </div>

      {/* Thumbnail grid for the active tab */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {TABS[tab].videos.map((v) => {
          const active = v.id === selected.id
          return (
            <button
              key={v.id}
              onClick={() => pick(v)}
              className="group text-left"
              aria-label={`Play ${v.title}`}
            >
              <div
                className="relative overflow-hidden rounded-xl bg-gray-200"
                style={{
                  aspectRatio: "16 / 9",
                  outline: active ? `3px solid ${accent}` : "none",
                  outlineOffset: "2px",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`}
                  alt={v.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
                <span className="absolute inset-0 flex items-center justify-center bg-black/25 opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow">
                    <Play className="h-4 w-4 text-gray-900 ml-0.5" fill="currentColor" />
                  </span>
                </span>
              </div>
              <p className="mt-1.5 line-clamp-2 text-xs font-medium text-gray-600">{v.title}</p>
            </button>
          )
        })}
      </div>
    </div>
  )
}
