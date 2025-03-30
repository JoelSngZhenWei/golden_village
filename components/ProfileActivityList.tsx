"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"
import { CalendarDays, Star, MapPin, Clock, Edit, Loader2, CheckCircle } from "lucide-react"

// Updated movie activities with rating property
const movieActivities = [
  {
    title: "Snow White",
    image: "/movieposters/snowwhite.jpeg",
    genre: "Fantasy",
    language: "English",
    date: "2025-03-30T19:30:00",
    price: 12.99,
    status: "Today",
    reviewed: false,
    location: "GV Bishan",
    review: "",
    rating: 0,
  },
  {
    title: "Mickey 17",
    image: "/movieposters/mickey17.jpg",
    genre: "Sci-Fi",
    language: "English",
    date: "2025-04-05T20:15:00",
    price: 12.99,
    status: "Upcoming",
    reviewed: false,
    location: "GV Paya Lebar Quarter",
    review: "",
    rating: 0,
  },
  {
    title: "Wicked",
    image: "/movieposters/wicked.JPG",
    genre: "Fantasy",
    language: "English",
    date: "2025-04-07T18:45:00",
    price: 12.99,
    status: "Upcoming",
    reviewed: false,
    location: "GV City Square",
    review: "",
    rating: 0,
  },
  {
    title: "Chhaava",
    image: "/movieposters/chhaava.jpg",
    genre: "Historical",
    language: "Hindi",
    date: "2025-04-10T14:30:00",
    price: 12.99,
    status: "Watched",
    reviewed: false,
    location: "GV Tampines",
    review: "",
    rating: 0,
  },
  {
    title: "Captain America: Brave New World",
    image: "/movieposters/captainamerica.JPG",
    genre: "Action",
    language: "English",
    date: "2025-03-20T21:00:00",
    price: 12.99,
    status: "Watched",
    reviewed: false,
    location: "GV Katong",
    review: "",
    rating: 0,
  },
  {
    title: "Mufasa",
    image: "/movieposters/mufasa.jpg",
    genre: "Fantasy",
    language: "English",
    date: "2025-03-18T15:45:00",
    price: 12.99,
    status: "Watched",
    reviewed: false,
    location: "GV Yishun",
    review: "",
    rating: 0,
  },
  {
    title: "Ne Zha 2",
    image: "/movieposters/nezha.jpg",
    genre: "Fantasy",
    language: "Mandarin",
    date: "2025-03-10T17:30:00",
    price: 12.99,
    status: "Reviewed",
    reviewed: true,
    location: "GV Plaza Singapura",
    review:
      "A thrilling sequel with incredible animation and a heartwarming message about self-acceptance and destiny.",
    rating: 5,
  },
  {
    title: "You are the Apple of my Eye",
    image: "/movieposters/appleofmyeye.jpg",
    genre: "Romance",
    language: "Mandarin",
    date: "2025-03-01T19:15:00",
    price: 12.99,
    status: "Reviewed",
    reviewed: true,
    location: "GV Bishan",
    review:
      "A touching and relatable tale of young love. The chemistry between the leads makes this a must-watch for fans of heartfelt romance.",
    rating: 4,
  },
]

// Star Rating component
function StarRating({
  rating,
  setRating,
  readOnly = false,
}: {
  rating: number
  setRating?: (rating: number) => void
  readOnly?: boolean
}) {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => !readOnly && setRating?.(star)}
          className={`${readOnly ? "cursor-default" : "cursor-pointer"} p-1`}
          disabled={readOnly}
          aria-label={`Rate ${star} stars`}
        >
          {star <= rating ? (
            <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
          ) : (
            <Star className="h-6 w-6 text-muted-foreground" />
          )}
        </button>
      ))}
    </div>
  )
}

export function ProfileActivityList() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedMovie, setSelectedMovie] = useState<(typeof movieActivities)[0] | null>(null)
  const [reviewText, setReviewText] = useState("")
  const [rating, setRating] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Function to format date and time
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)

    // Format the date part
    const dateOptions: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
    const formattedDate = date.toLocaleDateString("en-US", dateOptions)

    // Format the time part
    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }
    const formattedTime = date.toLocaleTimeString("en-US", timeOptions)

    return { formattedDate, formattedTime }
  }

  // Function to handle opening the modal
  const handleOpenModal = (movie: (typeof movieActivities)[0]) => {
    setSelectedMovie(movie)
    setReviewText(movie.review || "")
    setRating(movie.rating || 0)
    setIsSubmitting(false)
    setIsSubmitted(false)
    setIsModalOpen(true)
  }

  // Function to handle review submission
  const handleSubmitReview = () => {
    setIsSubmitting(true)

    // Simulate API call with a 2-second delay
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 2000)
  }

  // Function to check if a movie can be reviewed
  const canReview = (movie: (typeof movieActivities)[0]) => {
    return !movie.reviewed && movie.status === "Watched"
  }

  return (
    <div className="px-4 space-y-4">
      <div className="flex flex-row justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-4">History</h2>
        </div>
        <div>View More</div>
      </div>

      {movieActivities.map((movie, index) => {
        const { formattedDate, formattedTime } = formatDate(movie.date)

        return (
          <Card
            key={index}
            className="overflow-hidden border border-muted-foreground cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => handleOpenModal(movie)}
          >
            <CardContent className="p-0">
              <div className="flex items-start gap-4 p-4 h-full content-center">
                {/* Movie poster */}
                <div className="flex-shrink-0 rounded-md overflow-hidden border border-muted-foreground h-full">
                  <Image
                    src={movie.image || "/placeholder.svg"}
                    alt={`${movie.title} poster`}
                    width={90}
                    height={200}
                    className="object-cover rounded-lg"
                  />
                </div>

                {/* Movie details */}
                <div className="flex-grow space-y-1">
                  <div className="flex flex-col">
                    <div>
                      {(movie.status === "Upcoming" || movie.status === "Today") && (
                        <span
                          className={`text-xs font-medium ${movie.status === "Today" ? "text-accent" : "text-green-200"}`}
                        >
                          {movie.status}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold text-md">{movie.title}</h3>

                    <div className="flex items-center gap-1 text-muted-foreground">
                      <span className="text-sm">S${movie.price.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-muted-foreground">
                    <CalendarDays className="h-4 w-4" />
                    <span className="text-sm">{formattedDate}</span>
                  </div>

                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">{formattedTime}</span>
                  </div>

                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{movie.location}</span>
                  </div>

                  {canReview(movie) && (
                    <Button
                      className="mt-2"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleOpenModal(movie)
                      }}
                      size="sm"
                    >
                      <Star className="h-4 w-4 mr-2" />
                      Write a Review
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}

      {/* Movie Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        {selectedMovie && (
          <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl">{selectedMovie.title}</DialogTitle>
              <DialogDescription className="flex items-center gap-2 text-sm">
                <span>{selectedMovie.genre}</span>
                <span>•</span>
                <span>{selectedMovie.language}</span>
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col gap-4 py-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Image
                    src={selectedMovie.image || "/placeholder.svg"}
                    alt={`${selectedMovie.title} poster`}
                    width={120}
                    height={180}
                    className="object-cover rounded-md"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <CalendarDays className="h-4 w-4" />
                    <span className="text-sm">{formatDate(selectedMovie.date).formattedDate}</span>
                  </div>

                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">{formatDate(selectedMovie.date).formattedTime}</span>
                  </div>

                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{selectedMovie.location}</span>
                  </div>
                </div>
              </div>

              {/* Only show review section for reviewed movies or those with "Watched" status */}
              {(selectedMovie.reviewed || selectedMovie.status === "Watched") && (
                <div>
                  <h4 className="font-medium mb-2">{selectedMovie.reviewed ? "Your Review" : "Write a Review"}</h4>

                  {selectedMovie.reviewed ? (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <StarRating rating={selectedMovie.rating} readOnly={true} />
                        <span className="text-sm text-muted-foreground">({selectedMovie.rating}/5)</span>
                      </div>
                      <p className="text-sm bg-muted p-3 rounded-md">{selectedMovie.review}</p>
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <Edit className="h-4 w-4" />
                        Edit Review
                      </Button>
                    </div>
                  ) : selectedMovie.status === "Watched" ? (
                    <div className="space-y-3">
                      {isSubmitted ? (
                        <div className="flex flex-col items-center justify-center py-4 space-y-2">
                          <CheckCircle className="h-8 w-8 text-green-500" />
                          <p className="text-center font-medium">Review submitted successfully!</p>
                          <p className="text-center text-sm text-muted-foreground">
                            Thank you for sharing your thoughts.
                          </p>
                        </div>
                      ) : (
                        <>
                          <div className="space-y-2">
                            <p className="text-sm font-medium">Did you enjoy the movie?</p>
                            <div className="flex items-center gap-2">
                              <StarRating rating={rating} setRating={setRating} />
                              {rating > 0 && <span className="text-sm text-muted-foreground">({rating}/5)</span>}
                            </div>
                          </div>
                          <Textarea
                            placeholder="Share your thoughts about the movie..."
                            className="min-h-[120px]"
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                            disabled={isSubmitting}
                          />
                          <Button
                            onClick={handleSubmitReview}
                            disabled={isSubmitting || reviewText.trim() === "" || rating === 0}
                            className="w-full"
                          >
                            {isSubmitting ? (
                              <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                Submitting...
                              </>
                            ) : (
                              "Submit Review"
                            )}
                          </Button>
                        </>
                      )}
                    </div>
                  ) : null}
                </div>
              )}
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  )
}

