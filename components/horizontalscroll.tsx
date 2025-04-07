"use client"

import * as React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Star, StarHalf } from "lucide-react"

interface HorizontalScrollProps {
  items: {
    title: string
    image: string
    link: string
    rating?: number // Rating from 0-5
  }[]
  className?: string
}

// Star Rating Component (compact version for horizontal scroll)
const StarRating = ({ rating }: { rating: number }) => {
  // Convert rating to a scale of 0-5 (if it's not already)
  const normalizedRating = Math.max(0, Math.min(5, rating))

  // Calculate full and half stars
  const fullStars = Math.floor(normalizedRating)
  const hasHalfStar = normalizedRating % 1 >= 0.5

  return (
    <div className="flex items-center justify-center">
      {/* Render full stars */}
      {Array.from({ length: fullStars }).map((_, i) => (
        <Star key={`full-${i}`} className="w-3 h-3 fill-amber-400 text-amber-400" />
      ))}

      {/* Render half star if needed */}
      {hasHalfStar && <StarHalf className="w-3 h-3 fill-amber-400 text-amber-400" />}

      {/* Render empty stars */}
      {Array.from({ length: 5 - fullStars - (hasHalfStar ? 1 : 0) }).map((_, i) => (
        <Star key={`empty-${i}`} className="w-3 h-3 text-gray-300" />
      ))}

      <span className="ml-1 text-xs font-medium">{normalizedRating.toFixed(1)}</span>
    </div>
  )
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
            <Link href={`/movies/${item.link}`}>
              <div className="relative aspect-[2/3] border border-foreground/20 rounded-md overflow-hidden shadow-sm">
                <Image
                  src={item.image || "/placeholder.svg?height=300&width=200"}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
              <p className="mt-2 text-sm truncate text-center">{item.title}</p>

              {/* Star Rating */}
              {item.rating !== undefined && (
                <div className="mt-1">
                  <StarRating rating={item.rating} />
                </div>
              )}
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

