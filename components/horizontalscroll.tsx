"use client"

import * as React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface HorizontalScrollProps {
  items: {
    title: string
    image: string
    link: string
  }[]
  className?: string
}

export function HorizontalScroll({ items, className }: HorizontalScrollProps) {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current
    if (!container) return

    const scrollAmount = direction === "left" ? -240 : 240
    container.scrollBy({ left: scrollAmount, behavior: "smooth" })
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      scroll("left")
    } else if (e.key === "ArrowRight") {
      scroll("right")
    }
  }

  return (
    <div className={cn("relative group", className)} onKeyDown={handleKeyDown} tabIndex={0}>

      {/* Scroll container */}
      <div
        ref={scrollContainerRef}
        className={cn("flex overflow-x-auto pb-2 px-4 scrollbar-hide", "scroll-smooth snap-x snap-mandatory")}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className="flex-none snap-start sm:w-[150px] w-[120px] px-2 transition-transform duration-500 hover:scale-95"
          >
            <Link href={`/movies/${item.link}`} >

              <div className="relative aspect-[2/3] border border-foreground/20 rounded-md overflow-hidden shadow-sm">
                <Image
                  src={item.image || "/placeholder.svg?height=300&width=200"}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
              <p className="mt-2 text-sm truncate text-center">{item.title}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

