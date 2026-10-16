"use client"

import { useRef, useState } from "react"
import { HERO_VIDEO } from "@/lib/videos"

// Large VSL right above the form (same pattern as Nuhome's hero VSL).
// Click-to-play with sound; renders nothing until the video URL is set.
export function HeroVSL({ accent }: { accent: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  const [started, setStarted] = useState(false)
  if (!HERO_VIDEO.url) return null

  const play = () => {
    setStarted(true)
    const v = ref.current
    if (!v) return
    v.currentTime = 0
    v.play().catch(() => setStarted(false))
  }

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-gray-200 bg-black shadow-xl">
      <video
        ref={ref}
        src={`${HERO_VIDEO.url}#t=${HERO_VIDEO.startAt}`}
        controls={started}
        playsInline
        preload="metadata"
        className="block w-full"
        style={{ aspectRatio: "16/9" }}
      />
      {!started && (
        <button
          onClick={play}
          aria-label="Play video"
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/25 transition-colors hover:bg-black/35"
        >
          <span
            className="flex h-16 w-16 items-center justify-center rounded-full shadow-xl md:h-20 md:w-20"
            style={{ backgroundColor: accent }}
          >
            <svg className="ml-1 h-7 w-7 text-white md:h-9 md:w-9" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
          <span className="rounded-full bg-black/60 px-4 py-1.5 text-sm font-semibold text-white md:text-base">
            Watch how it works
          </span>
        </button>
      )}
    </div>
  )
}
