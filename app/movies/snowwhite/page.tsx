"use client"

import { format, parseISO } from "date-fns"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Calendar, ChevronLeft, Clock, Film, Globe, Play } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { generateShowtimes } from "@/utils/showtimes"
import { movies } from "@/data/movies"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"

const targetmovie = "Snow White"
const movie = movies.find((m) => m.title === targetmovie)
const purchaseURL = `/movies/`+ movie?.link + `/purchase`
console.log(generateShowtimes)

// Helper function to group showtimes by date
function groupShowtimesByDate(showtimes: string[]) {
  const grouped: Record<string, string[]> = {}

  showtimes.forEach((showtime) => {
    const date = showtime.split("T")[0]
    if (!grouped[date]) {
      grouped[date] = []
    }
    grouped[date].push(showtime)
  })

  return Object.entries(grouped).map(([date, times]) => ({
    date,
    times,
  }))
}

export default function MovieDetailsPage() {
  const router = useRouter()
  const [selectedCinema, setSelectedCinema] = useState(movie?.cinema_timings[0]?.cinema || "")
  const [isTrailerOpen, setIsTrailerOpen] = useState(false)

  if (!movie) {
    return (
      <div className="container mx-auto py-8 px-4">
        <p className="text-center text-red-500 font-semibold">Movie not found.</p>
        <Button onClick={() => router.back()} className="mt-4">
          Go Back
        </Button>
      </div>
    )
  }

  const selectedCinemaTimings = movie.cinema_timings.find((cinema) => cinema.cinema === selectedCinema)

  return (
    <section className="pb-20">
      <Header />
      <div className="container mx-auto py-8 px-4">
        {/* Back button - now with absolute positioning */}
        <Button
          className="absolute top-5 left-15 z-50 flex items-center gap-2 font-bold bg-background text-accent hover:bg-accent hover:text-primary"
          onClick={() => router.back()}
        >
          <ChevronLeft className="h-12 w-12" />
        </Button>

        <div className="grid grid-cols-1 gap-8">
          {/* Movie poster and basic info */}
          <div className="">
            <div className="rounded-lg overflow-hidden shadow-lg flex place-content-center relative group">
              <Image src={movie.image || "/placeholder.svg"} alt={movie.title} width={400} height={400} />

              {/* Trailer button overlay */}
              <Dialog open={isTrailerOpen} onOpenChange={setIsTrailerOpen}>
                <DialogTrigger asChild></DialogTrigger>
                <DialogContent className="sm:max-w-[800px] p-0 h-auto">
                  <DialogTitle></DialogTitle>
                  <div className="relative w-full pb-[56.25%]">
                    <iframe
                      className="absolute top-0 left-0 w-full h-full"
                      src={movie.trailerUrl}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; fullscreen; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    ></iframe>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="mt-6 flex items-center justify-between text-muted-foreground">
              <div className="flex items-center gap-x-3">
                <Film /> {movie.genre}
              </div>

              <Button variant="outline" className="flex items-center gap-2" onClick={() => setIsTrailerOpen(true)}>
                <Play className="h-5 w-5" />
                Watch Trailer
              </Button>

              <div className="flex items-center gap-x-3">
                <Globe /> {movie.language}
              </div>
            </div>
          </div>

          {/* Movie details and showtimes */}
          <div className="md:col-span-2">
            <h1 className="text-3xl font-bold mb-6 text-center">{movie.title}</h1>

            <div className="w-full space-y-6">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-semibold">Cinema</h2>
                <Select value={selectedCinema} onValueChange={setSelectedCinema}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select a cinema" />
                  </SelectTrigger>
                  <SelectContent>
                    {movie.cinema_timings.map((cinema) => (
                      <SelectItem key={cinema.cinema} value={cinema.cinema}>
                        {cinema.cinema}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedCinemaTimings && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Showtimes at {selectedCinemaTimings.cinema}
                  </h2>

                  {groupShowtimesByDate(selectedCinemaTimings.timings).map((dateGroup) => (
                    <Card key={dateGroup.date}>
                      <CardContent className="pt-6">
                        <h3 className="text-lg font-medium mb-4">
                          {format(parseISO(dateGroup.date), "EEEE, MMMM d, yyyy")}
                        </h3>
                        <div className="grid grid-cols-3 gap-3">
                          {dateGroup.times.map((time) => {
                            const timeOnly = time.split("T")[1].substring(0, 5)
                            return (
                              <Button key={time} variant="outline" className="flex items-center justify-center gap-2" onClick={() => router.push(purchaseURL)}>
                                <Clock className="h-4 w-4" />
                                {timeOnly}
                              </Button>
                            )
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <BottomNav />
    </section>
  )
}

