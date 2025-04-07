import { generateShowtimes } from "@/utils/showtimes";

export const carouselmovies = {
    captainamerica: {
        title: "Captain America: Brave New World",
        image: "/movieposters/captainamerica.JPG",
        genre: "Action",
        language: "English",
        rating: 4.5
    },
    wicked: {
        title: "Wicked",
        image: "/movieposters/wicked.png",
        genre: "Fantasy",
        language: "English",
        rating: 4.8
    },
    apple: {
        title: "You are the Apple of My Eye",
        image: "/movieposters/appleofmyeye.jpg",
        genre: "Romance",
        language: "Mandarin",
        rating: 3.9
    },
    chhaava: {
        title: "Chaava",
        image: "/movieposters/chhaava.jpg",
        genre: "Historical",
        language: "Hindi",
        rating: 4.7
    },
    snowwhite: {
        title: "Snow White",
        image: "/movieposters/snowwhite.jpeg",
        genre: "Fantasy",
        language: "English",

        rating: 3.5
    },
    dragon: {
        title: "Dragon",
        image: "/movieposters/dragon.jpg",
        genre: "Action",
        language: "Tamil",
        rating: 4.5
    },
    nezha: {
        title: "Ne Zha 2",
        image: "/movieposters/nezha.jpg",
        genre: "Fantasy",
        language: "Mandarin",
        rating: 4.7
    },

}

export const movies = [
    {
        title: "Snow White",
        image: "/movieposters/snowwhite.jpeg",
        genre: "Fantasy",
        language: "English",
        link: "snowwhite",
        trailerUrl: "https://www.youtube.com/embed/iV46TJKL8cU?si=ZJmH7rLoAzZrL0lP&autoplay=1&muted=1&controls=0&showinfo=0&modestbranding=1&rel=0&fs=1&iv_load_policy=3&disablekb=1",
        cinema_timings: [
            { cinema: "GV Bishan", timings: generateShowtimes("2025-03-11", "2025-04-22") },
            { cinema: "GV Paya Lebar Quarter", timings: generateShowtimes("2025-03-12", "2025-04-12") },
            { cinema: "GV Plaza Singapura", timings: generateShowtimes("2025-03-30", "2025-04-13") },
            { cinema: "GV Katong", timings: generateShowtimes("2025-03-28", "2025-04-11") },
        ],
        rating: 3.5

    },
    {
        title: "Mickey 17",
        image: "/movieposters/mickey17.jpg",
        genre: "Sci-Fi",
        language: "English",
        link: "mickey17",
        cinema_timings: [
            { cinema: "GV Bishan", timings: generateShowtimes("2025-03-11", "2025-04-22") },
            { cinema: "GV Paya Lebar Quarter", timings: generateShowtimes("2025-03-12", "2025-04-12") },
            { cinema: "GV Plaza Singapura", timings: generateShowtimes("2025-03-30", "2025-04-13") },
            { cinema: "GV Katong", timings: generateShowtimes("2025-03-28", "2025-04-11") },
        ],
        rating: 4

    },
    {
        title: "Close ur Kopitiam",
        image: "/movieposters/kopitiam.jpg",
        genre: "Drama",
        language: "Mandarin",
        link: "close-ur-kopitiam",
        cinema_timings: [
            { cinema: "GV Bishan", timings: generateShowtimes("2025-03-11", "2025-04-22") },
            { cinema: "GV Paya Lebar Quarter", timings: generateShowtimes("2025-03-12", "2025-04-12") },
            { cinema: "GV Plaza Singapura", timings: generateShowtimes("2025-03-30", "2025-04-13") },
            { cinema: "GV Katong", timings: generateShowtimes("2025-03-28", "2025-04-11") },
        ],
        rating: 4

    },
    {
        title: "Dragon",
        image: "/movieposters/dragon.jpg",
        genre: "Action",
        language: "Tamil",
        link: "dragon",
        cinema_timings: [
            { cinema: "GV Plaza Singapura", timings: generateShowtimes("2025-03-30", "2025-04-13") },
            { cinema: "GV Bishan", timings: generateShowtimes("2025-03-30", "2025-04-13") },
            { cinema: "GV City Square", timings: generateShowtimes("2025-03-30", "2025-04-13") },
            { cinema: "GV Tampines", timings: generateShowtimes("2025-03-30", "2025-04-13") },
        ],
        rating: 4.5

    },
    {
        title: "Mufasa",
        image: "/movieposters/mufasa.jpg",
        genre: "Fantasy",
        language: "English",
        link: "mufasa",
        cinema_timings: [
            { cinema: "GV Bishan", timings: generateShowtimes("2025-03-11", "2025-04-22") },
            { cinema: "GV Paya Lebar Quarter", timings: generateShowtimes("2025-03-12", "2025-04-12") },
            { cinema: "GV Plaza Singapura", timings: generateShowtimes("2025-03-30", "2025-04-13") },
            { cinema: "GV Katong", timings: generateShowtimes("2025-03-28", "2025-04-11") },
        ],
        rating: 4

    },
    {
        title: "Ne Zha 2",
        image: "/movieposters/nezha.jpg",
        genre: "Fantasy",
        language: "Mandarin",
        link: "ne-zha-2",
        cinema_timings: [
            { cinema: "GV Bishan", timings: generateShowtimes("2025-03-11", "2025-04-22") },
            { cinema: "GV Paya Lebar Quarter", timings: generateShowtimes("2025-03-12", "2025-04-12") },
            { cinema: "GV Plaza Singapura", timings: generateShowtimes("2025-03-30", "2025-04-13") },
            { cinema: "GV Katong", timings: generateShowtimes("2025-03-28", "2025-04-11") },
        ],
        rating: 4.7
    },
    {
        title: "Captain America: Brave New World",
        image: "/movieposters/captainamerica.JPG",
        genre: "Action",
        language: "English",
        link: "captain-america-brave-new-world",
        cinema_timings: [
            { cinema: "GV Bishan", timings: generateShowtimes("2025-03-11", "2025-04-22") },
            { cinema: "GV Paya Lebar Quarter", timings: generateShowtimes("2025-03-12", "2025-04-12") },
            { cinema: "GV Plaza Singapura", timings: generateShowtimes("2025-03-30", "2025-04-13") },
            { cinema: "GV Katong", timings: generateShowtimes("2025-03-28", "2025-04-11") },
        ],
        rating: 4.5

    },
    {
        title: "You are the Apple of my Eye",
        image: "/movieposters/appleofmyeye.jpg",
        genre: "Romance",
        language: "Mandarin",
        link: "you-are-the-apple-of-my-eye",
        cinema_timings: [
            { cinema: "GV Bishan", timings: generateShowtimes("2025-03-11", "2025-04-22") },
            { cinema: "GV Paya Lebar Quarter", timings: generateShowtimes("2025-03-12", "2025-04-12") },
            { cinema: "GV Plaza Singapura", timings: generateShowtimes("2025-03-30", "2025-04-13") },
            { cinema: "GV Katong", timings: generateShowtimes("2025-03-28", "2025-04-11") },
        ],
        rating: 3.9

    },
    {
        title: "Chhaava",
        image: "/movieposters/chhaava.jpg",
        genre: "Historical",
        language: "Hindi",
        link: "chhaava",
        cinema_timings: [
            { cinema: "GV Bishan", timings: generateShowtimes("2025-03-11", "2025-04-22") },
            { cinema: "GV Paya Lebar Quarter", timings: generateShowtimes("2025-03-12", "2025-04-12") },
            { cinema: "GV Plaza Singapura", timings: generateShowtimes("2025-03-30", "2025-04-13") },
            { cinema: "GV Katong", timings: generateShowtimes("2025-03-28", "2025-04-11") },
        ],
        rating: 4.7

    },
];