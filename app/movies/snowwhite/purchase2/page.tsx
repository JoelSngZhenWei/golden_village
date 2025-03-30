"use client"


import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { useRouter } from "next/navigation"
import { movies } from "@/data/movies"


// type SeatStatus = "available" | "unavailable";
const targetmovie = "Snow White"
const movie = movies.find((m) => m.title === targetmovie)
// const purchaseURL2 = `/movies/` + movie?.link + `/purchase2`

export default function PurchasePage2() {

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
      {/* Personal details */}
      Double check personal details
      {/* Online deals*/}
      Opt in to any online deal combos
      {/* Payment and payment details and T&C*/}
      Payment details
      {/* Summary page */}
      Summary page of purchase
      {/* Notification and back to home */}
      Successful purchase page
      <BottomNav />
    </section>
  )
}

