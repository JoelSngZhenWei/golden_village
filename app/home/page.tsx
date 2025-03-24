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
    description: "A team of explorers travel through a wormhole in space.",
  },
  inception: {
    title: "Wicked",
    image: "/movieposters/wicked.JPG",
    description: "A thief who steals corporate secrets through the use of dream-sharing technology.",
  },
  apple: {
    title: "You are the Apple of My Eye",
    image: "/movieposters/appleofmyeye.jpg",
    description: "Batman fights the menace known as the Joker.",
  },
  pulpFiction: {
    title: "Snow White",
    image: "/movieposters/snowwhite.jpeg",
    description: "The lives of two mob hitmen, a boxer, and a pair of diner bandits intertwine.",
  },
  shawshank: {
    title: "Ne Zha 2",
    image: "/movieposters/nezha.jpg",
    description: "Two imprisoned men bond over a number of years.",
  },
}

// Sample data for movies
const latestMovies = [
  { id: 1, title: "Snow White", imageUrl: "/movieposters/snowwhite.jpeg" },
  { id: 2, title: "Mickey 17", imageUrl: "/movieposters/mickey17.jpg" },
  { id: 3, title: "Close ur Kopitiam", imageUrl: "/movieposters/kopitiam.jpg" },
  { id: 4, title: "Dragon", imageUrl: "/movieposters/dragon.jpg" },
  { id: 5, title: "Mufasa", imageUrl: "/movieposters/mufasa.jpg" },
  { id: 6, title: "Ne Zha 2", imageUrl: "/movieposters/nezha.jpg" },
  { id: 7, title: "Captain America: Brave New World", imageUrl: "/movieposters/captainamerica.JPG" },
  { id: 8, title: "You are the Apple of my Eye", imageUrl: "/movieposters/appleofmyeye.jpg" },
  { id: 9, title: "Chhaava", imageUrl: "/movieposters/chhaava.jpg" },
]

const recommendations = [
  { id: 1, title: "Mickey 17", imageUrl: "/movieposters/mickey17.jpg" },
  { id: 2, title: "Ne Zha 2", imageUrl: "/movieposters/nezha.jpg" },
  { id: 3, title: "Mufasa", imageUrl: "/movieposters/mufasa.jpg" },
  { id: 4, title: "Chhaava", imageUrl: "/movieposters/chhaava.jpg" },
  { id: 5, title: "Wicked", imageUrl: "/movieposters/wicked.JPG" },
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

export default function Movies() {
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
