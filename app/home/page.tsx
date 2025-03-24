import { BottomNav } from "@/components/bottom-nav";
import CarouselComponent from "@/components/Carousel";
import { Header } from "@/components/header";
import { HorizontalScroll } from "@/components/horizontalscroll";
import { InfoButton } from "@/components/InfoButton";


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

export default function Home() {
  return (
    <section className="">
      <Header />
      <div className="h-full mb-24">
        {/* Carousel */}
        <div>
          <CarouselComponent movies={carouselmovies} />
        </div>

        <div className="px-2 flex flex-col space-y-8">
          {/* Latest Movies */}
          <div>
            <h2 className="text-xl font-bold mb-4">Latest Movies</h2>
            <HorizontalScroll items={latestMovies} />
          </div>

          {/* Recommendations */}
          <div>
            <div className="flex items-center mb-4">
              <h2 className="text-xl font-bold">Recommendations</h2>
              <InfoButton title={recommendationInfo.title} description={recommendationInfo.description} />
            </div>
            <HorizontalScroll items={recommendations} />
          </div>
        </div>
      </div>


      <BottomNav />
    </section>
  );
}
