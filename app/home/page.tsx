import { BottomNav } from "@/components/bottom-nav";
import CarouselComponent from "@/components/Carousel";
import { Header } from "@/components/header";
import { HomeActivityCards } from "@/components/HomeActivityCards";
import { HorizontalScroll } from "@/components/horizontalscroll";
import { InfoButton } from "@/components/InfoButton";
import { carouselmovies } from "@/data/movies";
import { movies } from "@/data/movies";
import { generateShowtimes } from "@/utils/showtimes";

console.log(generateShowtimes);

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
];

const recommendationTitles = [
  "Mickey 17",
  "Ne Zha 2",
  "Mufasa",
  "Chhaava",
  "Wicked",
];

const latestMovies = movies.filter(movie => latestTitles.includes(movie.title));
const recommendations = movies.filter(movie => recommendationTitles.includes(movie.title));

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

          <div>
            <h2 className="text-xl font-bold mb-4">Explore</h2>
            <HomeActivityCards />
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
