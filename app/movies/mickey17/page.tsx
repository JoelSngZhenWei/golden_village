"use client"

import { format, parseISO, addDays } from "date-fns"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Calendar, ChevronLeft, Clock, Film, Globe, MapPin, Play } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { cn } from "@/lib/utils"
import BackButton from "@/components/backbutton"

// Hardcoded movie data
const movie = {
  title: "Mickey 17",
  genre: "Sci-Fi",
  language: "English",
  image: "/movieposters/mickey17.jpg",
  trailerUrl:
    "https://www.youtube.com/embed/osYpGSz_0i4?si=_lrpE0DaK1FKklK1&autoplay=1&muted=1&controls=0&showinfo=0&modestbranding=1&rel=0&fs=1&iv_load_policy=3&disablekb=1",
  link: "mickey17",
  cinema_timings: [
    {
      cinema: "GV Bishan",
      timings: generateMockShowtimes("GV Bishan"),
    },
    {
      cinema: "GV Katong",
      timings: generateMockShowtimes("GV Katong"),
    },
    {
      cinema: "GV Plaza Singapura",
      timings: generateMockShowtimes("GV Plaza Singapura"),
    },
    {
      cinema: "GV Paya Lebar Quarter",
      timings: generateMockShowtimes("GV Paya Lebar Quarter"),
    },
  ],
}

// Get all available cinemas
const allCinemas = movie.cinema_timings.map((c) => c.cinema)

// Generate date objects for the next 7 days
const generateDateObjects = () => {
  const dates = []
  const today = new Date()

  for (let i = 0; i < 5; i++) {
    const date = addDays(today, i)
    dates.push({
      date: date.toISOString().split("T")[0], // YYYY-MM-DD format for comparison
      dayOfWeek: format(date, "EEE"),
      day: format(date, "d"),
      month: format(date, "MMM"),
    })
  }

  return dates
}

const dates = generateDateObjects()

// Generate 7 days of showtimes with 4 timings per day
function generateMockShowtimes(cinema: string) {
  const showtimes = []
  const today = new Date()

  for (let i = 0; i < 14; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() + i)
    const dateString = date.toISOString().split("T")[0]

    // 4 showtimes per day
    showtimes.push(`${dateString}T10:30:00`)
    showtimes.push(`${dateString}T13:45:00`)
    showtimes.push(`${dateString}T17:15:00`)
    showtimes.push(`${dateString}T20:30:00`)
  }
  console.log(cinema)
  return showtimes
}

// Helper function to group showtimes by date first, then by cinema
function groupShowtimesByDate(selectedCinemas: string[]) {
  const groupedByDate: Record<string, Record<string, string[]>> = {}

  // Get all unique dates from all cinemas
  const allDates = new Set<string>()
  movie.cinema_timings
    .filter((cinema) => selectedCinemas.includes(cinema.cinema))
    .forEach((cinema) => {
      cinema.timings.forEach((timing) => {
        const date = timing.split("T")[0]
        allDates.add(date)
      })
    })

  // Initialize the structure for each date
  Array.from(allDates)
    .sort()
    .forEach((date) => {
      groupedByDate[date] = {}
    })

  // Group showtimes by date and cinema
  movie.cinema_timings
    .filter((cinema) => selectedCinemas.includes(cinema.cinema))
    .forEach((cinema) => {
      cinema.timings.forEach((timing) => {
        const date = timing.split("T")[0]
        if (!groupedByDate[date][cinema.cinema]) {
          groupedByDate[date][cinema.cinema] = []
        }
        groupedByDate[date][cinema.cinema].push(timing)
      })
    })

  // Convert to array format for easier rendering
  return Object.entries(groupedByDate).map(([date, cinemas]) => ({
    date,
    cinemas: Object.entries(cinemas).map(([cinema, timings]) => ({
      cinema,
      timings,
    })),
  }))
}

export default function MovieDetailsPage() {
  const router = useRouter()
  const [isTrailerOpen, setIsTrailerOpen] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // By default, all cinemas are selected
  const [selectedCinemas, setSelectedCinemas] = useState<string[]>(allCinemas)

  // Set default selected date to today
  const today = new Date().toISOString().split("T")[0]
  const [selectedDate, setSelectedDate] = useState(today)

  // Group showtimes by date for selected cinemas
  const dateGroups = groupShowtimesByDate(selectedCinemas)

  // Get the selected date's cinema showtimes
  const selectedDateData = dateGroups.find((group) => group.date === selectedDate)

  // Toggle cinema selection
  const toggleCinema = (cinema: string) => {
    if (selectedCinemas.includes(cinema)) {
      // Don't allow deselecting all cinemas
      if (selectedCinemas.length > 1) {
        setSelectedCinemas(selectedCinemas.filter((c) => c !== cinema))
      }
    } else {
      setSelectedCinemas([...selectedCinemas, cinema])
    }
  }

  // Select all cinemas
  const selectAllCinemas = () => {
    setSelectedCinemas([...allCinemas])
  }

  return (
    <section className="pb-20">
      <Header />
      <BackButton />
      <div className="container mx-auto py-8 px-4">
        {/* Back button */}
        {/* <Button
          className="sticky top-5 -mt-13 left-15 z-50 flex items-center gap-2 font-bold bg-background text-accent hover:bg-accent hover:text-primary"
          onClick={() => router.back()}
        >
          <ChevronLeft className="h-12 w-12" />
        </Button> */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Movie poster and basic info */}
          <div className="md:col-span-1">
            <div className="rounded-lg overflow-hidden shadow-lg flex place-content-center relative group">
              <Image
                src={movie.image || "/placeholder.svg"}
                alt={movie.title}
                width={400}
                height={600}
                className="object-cover"
              />

              {/* Trailer button overlay */}
              <Dialog open={isTrailerOpen} onOpenChange={setIsTrailerOpen}>
                <DialogTrigger asChild>
                  <Button
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                    size="lg"
                  >
                    <Play className="h-6 w-6 mr-2" />
                    Play Trailer
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[800px] p-0 h-auto">
                  <DialogTitle className="sr-only">Trailer</DialogTitle>
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
              {/* Date selector as a row of buttons */}
              <div className="grid grid-cols-5 border-b border-neutral-800 w-full">
                {dates.map((date) => (
                  <button
                    key={date.date}
                    className={cn(
                      "flex flex-col items-center justify-center py-2 px-0 transition-colors w-full",
                      selectedDate === date.date ? "bg-primary text-primary-foreground" : "hover:bg-muted",
                    )}
                    onClick={() => setSelectedDate(date.date)}
                  >
                    <span
                      className={cn(
                        "text-xs",
                        selectedDate === date.date ? "text-primary-foreground/80" : "text-muted-foreground",
                      )}
                    >
                      {date.dayOfWeek}
                    </span>
                    <span className="text-lg font-bold">{date.day}</span>
                    <span className="text-xs">{date.month}</span>
                  </button>
                ))}
              </div>

              {/* Cinema filter */}
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-semibold">Cinemas</h2>
                <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-[200px] justify-between">
                      {selectedCinemas.length === allCinemas.length
                        ? "All Cinemas"
                        : `${selectedCinemas.length} Selected`}
                      <ChevronLeft
                        className={cn(
                          "h-4 w-4 shrink-0 transition-transform ml-2",
                          isFilterOpen ? "rotate-90" : "-rotate-90",
                        )}
                      />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0" align="start">
                    <div className="p-2">
                      <div className="flex items-center justify-between px-2 py-1 border-b">
                        <Label className="text-sm font-medium"></Label>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 text-xs"
                          onClick={(e) => {
                            e.preventDefault()
                            selectAllCinemas()
                          }}
                        >
                          Select All
                        </Button>
                      </div>
                      <div className="space-y-2 mt-2">
                        {allCinemas.map((cinema) => (
                          <div key={cinema} className="flex items-center space-x-2 px-2 py-1">
                            <Checkbox
                              id={`cinema-${cinema}`}
                              checked={selectedCinemas.includes(cinema)}
                              onCheckedChange={() => toggleCinema(cinema)}
                            />
                            <Label htmlFor={`cinema-${cinema}`} className="text-sm cursor-pointer flex-1">
                              {cinema}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              {selectedDateData && (
                <div className="space-y-6 min-h-[65vh]">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Showtimes for {format(parseISO(selectedDate), "EEEE, MMMM d, yyyy")}
                  </h2>

                  <div className="space-y-4">
                    {selectedDateData.cinemas.map((cinemaData) => (
                      <Card key={cinemaData.cinema}>
                        <CardContent className="pt-6">
                          <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            {cinemaData.cinema}
                          </h3>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {cinemaData.timings.map((time) => {
                              const timeOnly = time.split("T")[1].substring(0, 5)
                              return (
                                <Button
                                  key={`${cinemaData.cinema}-${time}`}
                                  variant="outline"
                                  className="flex items-center justify-center gap-2"
                                  onClick={() => router.push(`/movies/${movie.link}/purchase`)}
                                >
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

