"use client"

import { useState } from "react"
import { Play, ChevronDown } from "lucide-react"
import { ACTIVE_LIBRARY as LIBRARY, type LibraryVideo } from "@/lib/videos"

// Player + topic sidebar (same layout as Elevate's thank-you video library).
const allVideos = LIBRARY.flatMap((c) => c.videos)

export function VideoLibrary({ accent }: { accent: string }) {
  const [selected, setSelected] = useState<LibraryVideo | undefined>(allVideos[0])
  const [openCategories, setOpenCategories] = useState<Set<string>>(new Set())

  if (!selected) return null

  function toggleCategory(category: string) {
    setOpenCategories((prev) => {
      const next = new Set(prev)
      if (next.has(category)) {
        next.delete(category)
      } else {
        next.add(category)
      }
      return next
    })
  }

  return (
    <div className="flex flex-col md:flex-row md:items-start overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg">
      {/* Main video player */}
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="relative bg-gray-900" style={{ paddingTop: "56.25%" }}>
          <video
            key={selected.id}
            controls
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full"
            src={`${selected.url}#t=0.1`}
          />
        </div>
        <div className="bg-gray-900 px-5 py-4">
          <p className="text-base font-semibold leading-snug text-white">{selected.title}</p>
        </div>
      </div>

      {/* Video list sidebar */}
      <div className="w-full max-h-72 overflow-y-auto border-t border-gray-200 md:max-h-[480px] md:w-72 md:border-l md:border-t-0 lg:w-80">
        {LIBRARY.map((group) => {
          const isOpen = openCategories.has(group.category)
          return (
            <div key={group.category}>
              <button
                onClick={() => toggleCategory(group.category)}
                className="sticky top-0 z-10 flex w-full items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-2 transition-colors hover:bg-gray-100"
              >
                <p className="text-left text-[10px] font-bold uppercase tracking-widest text-gray-500">
                  {group.category}
                </p>
                <ChevronDown
                  className={`h-3 w-3 flex-shrink-0 text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isOpen && group.videos.map((video) => {
                const active = selected.id === video.id
                return (
                  <button
                    key={video.id}
                    onClick={() => setSelected(video)}
                    className={`flex w-full items-start gap-3 border-b border-gray-200 py-3 text-left transition-colors ${
                      active ? "border-l-4 bg-gray-50 pl-3" : "pl-4 hover:bg-gray-50"
                    }`}
                    style={active ? { borderLeftColor: accent } : undefined}
                  >
                    <div
                      className={`mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full ${active ? "" : "bg-gray-200"}`}
                      style={active ? { backgroundColor: accent } : undefined}
                    >
                      <Play className={`h-3 w-3 ${active ? "text-white" : "text-gray-500"}`} fill="currentColor" />
                    </div>
                    <span className={`pr-3 text-sm leading-snug ${active ? "font-medium text-gray-900" : "text-gray-500"}`}>
                      {video.title}
                    </span>
                  </button>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}
