"use client"

import { useState } from "react"
import { ChevronLeft, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { useRouter } from "next/navigation"
import { movies } from "@/data/movies"

// Seat status types
type SeatStatus = "available" | "selected" | "unavailable"

// type SeatStatus = "available" | "unavailable";
const targetmovie = "You are the Apple of my Eye"
const movie = movies.find((m) => m.title === targetmovie)
const purchaseURL2 = `/movies/` + movie?.link + `/purchase/purchase2`

const generateSeats = (rows: number, seatsPerRow: number): Record<string, SeatStatus> => {
  const seats: Record<string, SeatStatus> = {}
  const rowLabels = "ABCDEFGHIJKLMNOP".split("")

  const isUnavailable = (row: number, seat: number): boolean => {
    // Tweaked logic to look pseudo-random but consistent
    const code = (row * 13 + seat * 7) % 17
    return code === 0 || code === 3 || code === 5
  }

  for (let i = 0; i < rows; i++) {
    const rowLabel = rowLabels[i]
    const rowNumber = i + 1

    for (let j = 1; j <= seatsPerRow; j++) {
      const seatId = `${rowLabel}${j}`
      seats[seatId] = isUnavailable(rowNumber, j) ? "unavailable" : "available"
    }
  }

  return seats
}

export default function PurchasePage() {
  const [selectedDate, setSelectedDate] = useState("30 Mar")
  const [selectedTime, setSelectedTime] = useState("12:15 AM")
  const [seats, setSeats] = useState(generateSeats(16, 20))
  const [selectedSeats, setSelectedSeats] = useState<string[]>([])

  const handleSeatClick = (seatId: string) => {
    if (seats[seatId] === "unavailable") return

    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((id) => id !== seatId))
      setSeats({ ...seats, [seatId]: "available" })
    } else {
      setSelectedSeats([...selectedSeats, seatId])
      setSeats({ ...seats, [seatId]: "selected" })
    }
  }

  const dates = [
    { day: "30", month: "Mar", dayOfWeek: "Sat" },
    { day: "31", month: "Mar", dayOfWeek: "Sun" },
    { day: "1", month: "Apr", dayOfWeek: "Mon" },
    { day: "2", month: "Apr", dayOfWeek: "Tue" },
    { day: "3", month: "Apr", dayOfWeek: "Wed" },
  ]

  const times = ["10:30 AM", "12:15 PM", "3:45 PM", "6:30 PM", "9:15 PM"]
  const router = useRouter()
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
  return (
    <section className="pb-18">
      <Header />
      <Button
        className="sticky top-5 -mt-13 left-15 z-50 flex items-center gap-2 font-bold bg-background text-accent hover:bg-accent hover:text-primary"
        onClick={() => router.back()}
      >
        <ChevronLeft className="h-12 w-12" />
      </Button>
      <div className="flex flex-col min-h-screen text-foreground">
        {/* Movie details header */}
        <div className="p-4 py-8 border-b border-muted-foreground">
          <div className="flex items-center gap-2">

            <div>
              <h1 className="text-xl font-bold flex items-center gap-2">{movie.title}</h1>
              <div className="flex items-center gap-2 text-sm mt-1">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" /> 116 minutes
                </span>
                <span>{movie?.language} (Sub: Chinese)</span>
              </div>
            </div>
          </div>
          <p className="mt-2 text-sm font-medium">GV Bishan</p>
        </div>

        {/* Date selection */}
        <div className="grid grid-cols-5 border-b border-primary-foreground/80">
          {dates.map((date) => (
            <button
              key={`${date.day}-${date.month}`}
              className={cn(
                "flex flex-col items-center justify-center py-3",
                selectedDate === `${date.day} ${date.month}` ? "bg-primary" : "",
              )}
              onClick={() => setSelectedDate(`${date.day} ${date.month}`)}
            >
              <span className="text-xs text-primary-foreground/80">{date.dayOfWeek}</span>
              <span className="text-lg font-bold">{date.day}</span>
              <span className="text-xs">{date.month}</span>
            </button>
          ))}
        </div>

        {/* Time selection */}
        <div className="p-2 border-b border-muted-foreground">
          <div className="flex flex-wrap gap-2">
            {times.map((time) => (
              <button
                key={time}
                className={cn(
                  "px-3 py-1 text-sm border border-muted-foreground rounded",
                  selectedTime === time ? "bg-accent text-primary" : "",
                )}
                onClick={() => setSelectedTime(time)}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        {/* Selected seats */}
        <div className="p-4 border-b border-muted-foreground">
          <p className="text-sm">
            Seat(s) Selected: {selectedSeats.length > 0 ? selectedSeats.sort().join(", ") : "None"} (Hall 3)
          </p>
        </div>

        {/* Screen indicator */}
        <div className="text-center py-2 border-b border-muted-foreground">
          <p className="text-sm uppercase tracking-widest">Screen</p>
        </div>

        {/* Seat map */}
        <div className="flex-1 overflow-auto p-4">
          <div className="flex flex-col items-center">
            <div className="grid grid-cols-20 gap-1 max-w-[85vw] mx-auto">
              {Object.entries(seats).map(([seatId, status]) => {
                const rowLabel = seatId.charAt(0)
                const seatNumber = Number.parseInt(seatId.substring(1))

                // Only show row labels at the beginning of each row
                const showRowLabel = seatNumber === 1

                return (
                  <div key={seatId} className="relative">
                    {showRowLabel && (
                      <span className="absolute -left-5 top-1/2 -translate-y-1/2 text-xs text-neutral-400">
                        {rowLabel}
                      </span>
                    )}
                    <button
                      className={cn(
                        "w-5 h-5 rounded-t-sm text-[8px]",
                        status === "available" ? "bg-blue-400" : "",
                        status === "selected" ? "bg-green-400" : "",
                        status === "unavailable" ? "bg-red-500" : "",
                      )}
                      onClick={() => handleSeatClick(seatId)}
                      disabled={status === "unavailable"}
                    />
                  </div>
                )
              })}
            </div>

            {/* Legend */}
            <div className="mt-6 flex items-center justify-center gap-4 text-xs ">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-blue-400 rounded-t-sm" />
                <span>Available</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-green-400 rounded-t-sm" />
                <span>Selected</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-red-500 rounded-t-sm" />
                <span>Unavailable</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="grid grid-cols-1 border-t border-muted-foreground p-4 bg-background">
          <Button
            className="h-14 text-base font-semibold bg-accent text-primary transition-all duration-300 shadow-lg rounded-xl flex items-center justify-center gap-2 hover:bg-primary hover:text-foreground"
            onClick={() => router.push(purchaseURL2)}
          >
            Continue to Payment
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="ml-1"
            >
              <path
                d="M9 18L15 12L9 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Button>
        </div>
      </div>
      <BottomNav />
    </section>
  )
}

