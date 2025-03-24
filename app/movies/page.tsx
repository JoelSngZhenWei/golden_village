"use client"

import { BottomNav } from "@/components/bottom-nav"
import CarouselComponent from "@/components/Carousel"
import { Header } from "@/components/header"
import { HorizontalScroll } from "@/components/horizontalscroll"
import { InfoButton } from "@/components/InfoButton"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { X, ChevronDown, Film } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// sample data for carousel movies
const carouselmovies = {
  captainamerica: {
    title: "Captain America: Brave New World",
    image: "/movieposters/captainamerica.JPG",
    genre: "Action",
    language: "English",
  },
  wicked: {
    title: "Wicked",
    image: "/movieposters/wicked.JPG",
    genre: "Fantasy",
    language: "English",
  },
  apple: {
    title: "You are the Apple of My Eye",
    image: "/movieposters/appleofmyeye.jpg",
    genre: "Romance",
    language: "Mandarin",
  },
  chhaava: {
    title: "Chaava",
    image: "/movieposters/chhaava.jpg",
    genre: "Historical",
    language: "Hindi",
  },
  snowwhite: {
    title: "Snow White",
    image: "/movieposters/snowwhite.jpeg",
    genre: "Fantasy",
    language: "English",
  },
  dragon: {
    title: "Dragon",
    image: "/movieposters/dragon.jpg",
    genre: "Action",
    language: "Tamil",
  },
  nezha: {
    title: "Ne Zha 2",
    image: "/movieposters/nezha.jpg",
    genre: "Fantasy",
    language: "Mandarin",
  },
}

// Sample data for movies
const latestMovies = [
  { title: "Snow White", image: "/movieposters/snowwhite.jpeg", genre: "Fantasy", language: "English" },
  { title: "Mickey 17", image: "/movieposters/mickey17.jpg", genre: "Sci-Fi", language: "English" },
  { title: "Close ur Kopitiam", image: "/movieposters/kopitiam.jpg", genre: "Drama", language: "Mandarin" },
  { title: "Dragon", image: "/movieposters/dragon.jpg", genre: "Action", language: "Tamil" },
  { title: "Mufasa", image: "/movieposters/mufasa.jpg", genre: "Fantasy", language: "English" },
  { title: "Ne Zha 2", image: "/movieposters/nezha.jpg", genre: "Fantasy", language: "Mandarin" },
  {
    title: "Captain America: Brave New World",
    image: "/movieposters/captainamerica.JPG",
    genre: "Action",
    language: "English",
  },
  {
    title: "You are the Apple of my Eye",
    image: "/movieposters/appleofmyeye.jpg",
    genre: "Romance",
    language: "Mandarin",
  },
  { title: "Chhaava", image: "/movieposters/chhaava.jpg", genre: "Historical", language: "Hindi" },
]

const recommendations = [
  { title: "Mickey 17", image: "/movieposters/mickey17.jpg", genre: "Sci-Fi", language: "English" },
  { title: "Ne Zha 2", image: "/movieposters/nezha.jpg", genre: "Fantasy", language: "Mandarin" },
  { title: "Mufasa", image: "/movieposters/mufasa.jpg", genre: "Fantasy", language: "English" },
  { title: "Chhaava", image: "/movieposters/chhaava.jpg", genre: "Historical", language: "Hindi" },
  { title: "Wicked", image: "/movieposters/wicked.JPG", genre: "Fantasy", language: "English" },
]

// Get unique genres and languages from all movies
const getAllMovies = () => {
  const allMovies = [...Object.values(carouselmovies), ...latestMovies, ...recommendations]
  return allMovies
}

const getUniqueGenres = () => {
  const allMovies = getAllMovies()
  const genres = [...new Set(allMovies.map((movie) => movie.genre))]
  return genres.sort()
}

const getUniqueLanguages = () => {
  const allMovies = getAllMovies()
  const languages = [...new Set(allMovies.map((movie) => movie.language))]
  return languages.sort()
}

// Recommendation system information
const recommendationInfo = {
  title: "Your Recommendations",
  description: (
    <div className="space-y-4">
      <div>
        Our recommendation system uses a combination of collaborative filtering and content-based algorithms to suggest
        content you might enjoy.
      </div>

      <h3 className="font-medium text-base">What We Consider:</h3>
      <ul className="list-disc pl-5 space-y-1">
        <li>Your movie viewing history</li>
        <li>Ratings you&apos;ve given to movies</li>
        <li>What similar users have enjoyed</li>
        <li>Genre preferences based on your movie history</li>
        <li>Time of day and viewing patterns</li>
      </ul>

      <h3 className="font-medium text-base">Personalization:</h3>
      <div>
        The more you watch, the better our recommendations become. We continuously learn from your interactions to
        improve suggestions over time.
      </div>

      <div className="text-xs text-muted-foreground mt-4">
        You can reset your recommendation data at any time in your account settings.
      </div>
    </div>
  ),
}

export default function Movies() {
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null)
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null)
  const [isFilterVisible, setIsFilterVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  const genres = getUniqueGenres()
  const languages = getUniqueLanguages()

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Determine if we're scrolling up or down
      if (currentScrollY > lastScrollY) {
        // Scrolling down - hide filter
        setIsFilterVisible(false)
      } else {
        // Scrolling up - show filter
        setIsFilterVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [lastScrollY])

  type Movie = {
    title: string
    image: string
    genre: string
    language: string
  }

  type CarouselMovies = {
    [key: string]: Movie
  }

  const filterMovies = (movies: Movie[]): Movie[] => {
    return movies.filter(
      (movie) =>
        (!selectedGenre || movie.genre === selectedGenre) && (!selectedLanguage || movie.language === selectedLanguage),
    )
  }

  // Filter carousel movies
  const filterCarouselMovies = (): CarouselMovies => {
    const filtered: CarouselMovies = {}

    Object.entries(carouselmovies).forEach(([key, movie]) => {
      if (
        (!selectedGenre || movie.genre === selectedGenre) &&
        (!selectedLanguage || movie.language === selectedLanguage)
      ) {
        filtered[key] = movie
      }
    })

    return filtered
  }

  const filteredCarouselMovies = filterCarouselMovies()
  const filteredLatestMovies = filterMovies(latestMovies)
  const filteredRecommendations = filterMovies(recommendations)

  const clearFilters = () => {
    setSelectedGenre(null)
    setSelectedLanguage(null)
  }

  const hasActiveFilters = selectedGenre || selectedLanguage
  const hasCarouselMovies = Object.keys(filteredCarouselMovies).length > 0

  return (
    <section className="">
      <Header />
      <div className="h-full mb-24">
        {/* Filter Section */}
        <div
          className={`px-4 py-3 sticky top-0 z-10 backdrop-blur-sm transition-transform duration-300 ${
            isFilterVisible ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <div className="pt-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {/* Genre Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant={selectedGenre ? "default" : "outline"}
                    size="sm"
                    className="ml-10 h-9 min-w-2 rounded-full min-w-[120px] border-foreground/40"
                  >
                    {selectedGenre || "Genre"} <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                  {genres.map((genre) => (
                    <DropdownMenuCheckboxItem
                      key={genre}
                      checked={selectedGenre === genre}
                      onCheckedChange={() => setSelectedGenre(selectedGenre === genre ? null : genre)}
                    >
                      {genre}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Language Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant={selectedLanguage ? "default" : "outline"}
                    size="sm"
                    className="h-9 rounded-full min-w-[120px] border-foreground/40"
                  >
                    {selectedLanguage || "Language"} <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                  {languages.map((language) => (
                    <DropdownMenuCheckboxItem
                      key={language}
                      checked={selectedLanguage === language}
                      onCheckedChange={() => setSelectedLanguage(selectedLanguage === language ? null : language)}
                    >
                      {language}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters} className="h-8 text-xs">
                <X className="h-3 w-3 mr-1" /> Clear
              </Button>
            )}
          </div>
        </div>

        {/* Carousel */}
        <div>
          {hasCarouselMovies ? (
            <CarouselComponent movies={filteredCarouselMovies} />
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center px-4">
              <Film className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No featured movies match your filters</h3>
              <p className="text-muted-foreground mt-2">Try adjusting your filter criteria</p>
            </div>
          )}
        </div>

        <div className="px-2 flex flex-col space-y-8">
          {/* Latest Movies */}
          <div>
            <h2 className="text-xl font-bold mb-4">Latest Movies</h2>
            {filteredLatestMovies.length > 0 ? (
              <HorizontalScroll items={filteredLatestMovies} />
            ) : (
              <p className="text-muted-foreground text-sm py-8 text-center">No movies match your filter criteria.</p>
            )}
          </div>

          {/* Recommendations */}
          <div>
            <div className="flex items-center mb-4">
              <h2 className="text-xl font-bold">Recommendations</h2>
              <InfoButton title={recommendationInfo.title} description={recommendationInfo.description} />
            </div>
            {filteredRecommendations.length > 0 ? (
              <HorizontalScroll items={filteredRecommendations} />
            ) : (
              <p className="text-muted-foreground text-sm py-8 text-center">
                No recommendations match your filter criteria.
              </p>
            )}
          </div>
        </div>
      </div>

      <BottomNav />
    </section>
  )
}

