"use client"

import { useState, useEffect } from "react"
import { BottomNav } from "@/components/bottom-nav"
import CarouselComponent from "@/components/Carousel"
import { Header } from "@/components/header"
import { HorizontalScroll } from "@/components/horizontalscroll"
import { InfoButton } from "@/components/InfoButton"
import { carouselmovies } from "@/data/movies"
import { movies } from "@/data/movies"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Filter } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

const latestTitles = [
  "Snow White",
  "Mickey 17",
  "Close ur Kopitiam",
  "Dragon",
  "Mufasa",
  "Ne Zha 2",
  "Captain America: Brave New World",
  "You are the Apple of my Eye",
  "Chhaava",
]

const recommendationTitles = ["Mickey 17", "Ne Zha 2", "Mufasa", "Chhaava", "Wicked"]

// Recommendation system information
const recommendationInfo = {
  title: "Your Recommendations",
  description: (
    <span className="space-y-4">
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
    </span>
  ),
}

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredLatest, setFilteredLatest] = useState<typeof movies>([])
  const [filteredRecommendations, setFilteredRecommendations] = useState<typeof movies>([])

  // Extract unique genres and languages
  const allGenres = [...new Set(movies.map((movie) => movie.genre))]
  const allLanguages = [...new Set(movies.map((movie) => movie.language))]

  // State for selected filters
  const [selectedGenres, setSelectedGenres] = useState(allGenres)
  const [selectedLanguages, setSelectedLanguages] = useState(allLanguages)

  // Handle genre selection
  const handleGenreChange = (genre: string) => {
    setSelectedGenres((prev) => (prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]))
  }

  // Handle language selection
  const handleLanguageChange = (language: string) => {
    setSelectedLanguages((prev) => (prev.includes(language) ? prev.filter((l) => l !== language) : [...prev, language]))
  }

  // Select all genres
  const selectAllGenres = () => {
    setSelectedGenres(allGenres)
  }

  // Select all languages
  const selectAllLanguages = () => {
    setSelectedLanguages(allLanguages)
  }

  // Filter movies based on search term and filters
  useEffect(() => {
    const latestMovies = movies.filter((movie) => latestTitles.includes(movie.title))
    const recommendations = movies.filter((movie) => recommendationTitles.includes(movie.title))

    setFilteredLatest(latestMovies)
    setFilteredRecommendations(recommendations)
  }, [])

  useEffect(() => {
    const latestMovies = movies.filter((movie) => latestTitles.includes(movie.title))
    const recommendations = movies.filter((movie) => recommendationTitles.includes(movie.title))

    // Apply search and filters to latest movies
    const filteredLatestMovies = latestMovies.filter(
      (movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        selectedGenres.includes(movie.genre) &&
        selectedLanguages.includes(movie.language),
    )

    // Apply search and filters to recommendations
    const filteredRecommendationMovies = recommendations.filter(
      (movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        selectedGenres.includes(movie.genre) &&
        selectedLanguages.includes(movie.language),
    )

    setFilteredLatest(filteredLatestMovies)
    setFilteredRecommendations(filteredRecommendationMovies)
  }, [searchTerm, selectedGenres, selectedLanguages])

  return (
    <section className="">
      <Header />
      <div className="h-full mb-24">
        {/* Carousel */}
        <div>
          <CarouselComponent movies={carouselmovies} />
        </div>

        {/* Search and Filter Bar */}
        <div className="px-4 py-4 sticky top-0 z-10 bg-background/80 backdrop-blur-sm">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search movies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 w-full"
              />
            </div>
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Genre
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 p-3">
                  <div className="flex justify-between mb-2">
                    <h4 className="font-medium">Genres</h4>
                    <Button variant="ghost" size="sm" onClick={selectAllGenres} className="h-auto py-0 px-2 text-xs">
                      Select All
                    </Button>
                  </div>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {allGenres.map((genre) => (
                      <div key={genre} className="flex items-center space-x-2">
                        <Checkbox
                          id={`genre-${genre}`}
                          checked={selectedGenres.includes(genre)}
                          onCheckedChange={() => handleGenreChange(genre)}
                        />
                        <Label htmlFor={`genre-${genre}`}>{genre}</Label>
                      </div>
                    ))}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Language
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 p-3">
                  <div className="flex justify-between mb-2">
                    <h4 className="font-medium">Languages</h4>
                    <Button variant="ghost" size="sm" onClick={selectAllLanguages} className="h-auto py-0 px-2 text-xs">
                      Select All
                    </Button>
                  </div>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {allLanguages.map((language) => (
                      <div key={language} className="flex items-center space-x-2">
                        <Checkbox
                          id={`language-${language}`}
                          checked={selectedLanguages.includes(language)}
                          onCheckedChange={() => handleLanguageChange(language)}
                        />
                        <Label htmlFor={`language-${language}`}>{language}</Label>
                      </div>
                    ))}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        <div className="px-2 flex flex-col space-y-8">
          {/* Latest Movies */}
          <div>
            <h2 className="text-xl font-bold mb-4">Latest Movies</h2>
            {filteredLatest.length > 0 ? (
              <HorizontalScroll items={filteredLatest} />
            ) : (
              <p className="text-muted-foreground text-center py-8">No movies match your search criteria</p>
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
              <p className="text-muted-foreground text-center py-8">No recommendations match your search criteria</p>
            )}
          </div>
        </div>
      </div>

      <BottomNav />
    </section>
  )
}

