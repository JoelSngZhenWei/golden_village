"use client"

import * as React from "react"
import Image from "next/image"

interface HorizontalScrollProps {
  items: {
    title: string
    image: string
  }[]
}

export function HorizontalScroll({ items }: HorizontalScrollProps) {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null)

  // const scrollLeft = () => {
  //   if (scrollContainerRef.current) {
  //     scrollContainerRef.current.scrollBy({
  //       left: -200,
  //       behavior: "smooth",
  //     })
  //   }
  // }

  // const scrollRight = () => {
  //   if (scrollContainerRef.current) {
  //     scrollContainerRef.current.scrollBy({
  //       left: 200,
  //       behavior: "smooth",
  //     })
  //   }
  // }

  return (
    <div className="relative group">
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto space-x-4 scrollbar-hide pb-2  px-4 text-center"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className="flex-none w-[120px] transition-transform duration-300"
          >
            <div className="relative aspect-[2/3] border border-foreground/20 rounded-md overflow-hidden">
              <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
            </div>
            <p className="mt-2 text-sm truncate">{item.title}</p>
          </div>
        ))}
        {/* {items.map((item) => (
          <div
            key={item.id}
            className="flex-none w-[120px] transition-transform duration-300"
          >
            <div className="relative aspect-[2/3] border border-foreground/20 rounded-md overflow-hidden">
              <Image src={item.imageUrl || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
            </div>
            <p className="mt-2 text-sm truncate">{item.title}</p>
          </div>
        ))} */}
      </div>
    </div>
  )
}

