"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { BookmarkIcon, Star, StarHalf, TicketIcon } from "lucide-react"

// Define the movie type
type Movie = {
  title: string
  image: string
  rating?: number // Rating from 0-5
}

// Component can accept either an object/dictionary or array of movies
type MovieCarouselProps = {
  movies: Record<string, Movie> | Movie[]
}

// Star Rating Component
const StarRating = ({ rating }: { rating: number }) => {
  // Convert rating to a scale of 0-5 (if it's not already)
  const normalizedRating = Math.max(0, Math.min(5, rating))

  // Calculate full and half stars
  const fullStars = Math.floor(normalizedRating)
  const hasHalfStar = normalizedRating % 1 >= 0.5

  return (
    <div className="flex items-center">
      {/* Render full stars */}
      {Array.from({ length: fullStars }).map((_, i) => (
        <Star key={`full-${i}`} className="w-5 h-5 fill-amber-400 text-amber-400" />
      ))}

      {/* Render half star if needed */}
      {hasHalfStar && <StarHalf className="w-5 h-5 fill-amber-400 text-amber-400" />}

      {/* Render empty stars */}
      {Array.from({ length: 5 - fullStars - (hasHalfStar ? 1 : 0) }).map((_, i) => (
        <Star key={`empty-${i}`} className="w-5 h-5 text-gray-300" />
      ))}

      <span className="ml-2 text-sm font-medium">{normalizedRating.toFixed(1)}</span>
    </div>
  )
}

export default function CarouselComponent({ movies }: MovieCarouselProps) {
  // Convert movies to array if it's an object/dictionary
  const movieArray = Array.isArray(movies) ? movies : Object.values(movies)

  // State to track saved movies
  const [savedMovies, setSavedMovies] = useState<Record<string, boolean>>({})

  // Toggle saved state for a movie
  const toggleSave = (title: string) => {
    setSavedMovies((prev) => ({
      ...prev,
      [title]: !prev[title],
    }))
  }

  return (
    <div className="container mx-auto py-6">
      <Carousel className="w-full max-w-4xl mx-auto px-5">
        <CarouselContent>
          {movieArray.map((movie, index) => (
            <CarouselItem key={index}>
              <div className="py-2 px-4">
                <Card className="p-0 overflow-hidden border border-foreground/20">
                  <CardContent className="relative p-0 h-[500px] flex items-center justify-center">
                    <Image
                      src={movie.image || `/placeholder.svg?height=300&width=500&text=${movie.title}`}
                      alt={movie.title}
                      width={500}
                      height={300}
                      className="rounded-md object-cover w-full h-full"
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black to-transparent" />

                    {/* Content overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="text-xl font-bold mb-1">{movie.title}</h3>

                      {/* Star Rating */}
                      <div className="mb-3">
                        <StarRating rating={movie.rating || 0} />
                      </div>

                      <div className="flex space-x-2">
                        <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg clickable">
                          <TicketIcon className="w-4 h-4 mr-2" />
                          Buy Tickets
                        </Button>
                        <Button
                          size="lg"
                          variant="outline"
                          className={`border text-foreground text-xl clickable ${savedMovies[movie.title] ? "border-foreground/20" : "border-foreground/20"}`}
                          onClick={() => toggleSave(movie.title)}
                        >
                          <BookmarkIcon
                            className={`w-4 h-4 mr-2 transition-all duration-500 ${savedMovies[movie.title] ? "fill-amber-400 text-amber-400" : ""}`}
                          />
                          Save
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}

