"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Minus, Plus, ShoppingCart, Film, MapPin, Clock } from 'lucide-react'

import { BottomNav } from "@/components/bottom-nav"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import RobotCard from "@/components/Robot"

// First, let's define proper types for our snack item
type Snack = {
  id: number
  name: string
  price: number
  image: string
  category: string
}

// Snack data - hardcoded for the mockup
const snacks = [
  {
    id: 1,
    name: "Popcorn - Small",
    price: 5.99,
    image: "/food/popcorn_small.png",
    category: "Popcorn",
  },
  {
    id: 2,
    name: "Popcorn - Medium",
    price: 7.99,
    image: "/food/popcorn_med.png",
    category: "Popcorn",
  },
  {
    id: 3,
    name: "Popcorn - Large",
    price: 9.99,
    image: "/food/popcorn_large.png",
    category: "Popcorn",
  },
  {
    id: 4,
    name: "Nachos with Cheese",
    price: 8.49,
    image: "/food/nachos2.png",
    category: "Snacks",
  },
  {
    id: 5,
    name: "Hot Dog",
    price: 6.99,
    image: "/food/hotdog.png",
    category: "Snacks",
  },
  {
    id: 6,
    name: "Chips",
    price: 5.49,
    image: "/food/chips.png",
    category: "Snacks",
  },
  {
    id: 7,
    name: "Soda - Small",
    price: 3.99,
    image: "/food/cola.png",
    category: "Drinks",
  },
  {
    id: 8,
    name: "Soda - Medium",
    price: 4.99,
    image: "/food/cola.png",
    category: "Drinks",
  },
  {
    id: 9,
    name: "Soda - Large",
    price: 5.99,
    image: "/food/cola.png",
    category: "Drinks",
  },
  {
    id: 10,
    name: "Candy - M&Ms",
    price: 4.49,
    image: "/food/mnms.png",
    category: "Candy",
  },
  {
    id: 11,
    name: "Candy - Skittles",
    price: 4.49,
    image: "/food/skittles.png",
    category: "Candy",
  },
  {
    id: 13,
    name: "Ice Cream - Vanilla",
    price: 5.99,
    image: "/food/icecream_vanilla.png",
    category: "Desserts",
  },
  {
    id: 14,
    name: "Ice Cream - Chocolate",
    price: 5.99,
    image: "/food/icecream_chocolate.png",
    category: "Desserts",
  },
  {
    id: 15,
    name: "Combo - Popcorn & Soda",
    price: 12.99,
    image: "/food/popcorn_soda.png",
    category: "Combos",
  },
  {
    id: 16,
    name: "Combo - Nachos & Soda",
    price: 13.49,
    image: "/food/nachos.png",
    category: "Combos",
  },
]

// Group snacks by category
const snacksByCategory = snacks.reduce(
  (acc, snack) => {
    if (!acc[snack.category]) {
      acc[snack.category] = []
    }
    acc[snack.category].push(snack)
    return acc
  },
  {} as Record<string, typeof snacks>,
)

// Update the SnackItem component with proper types
function SnackItem({
  snack,
  onAdd,
  onRemove,
  quantity,
}: {
  snack: Snack
  onAdd: (snack: Snack) => void
  onRemove: (snack: Snack) => void
  quantity: number
}) {
  return (
    <Card className="mb-3">
      <CardContent className="p-3 flex items-center">
        <div className="flex-shrink-0 mr-3">
          <Image
            src={snack.image || "/placeholder.svg"}
            alt={snack.name}
            width={80}
            height={80}
            className="rounded-md"
          />
        </div>
        <div className="flex-grow">
          <h3 className="font-medium">{snack.name}</h3>
          <p className="text-sm text-muted-foreground">${snack.price.toFixed(2)}</p>
        </div>
        <div className="flex items-center">
          {quantity > 0 ? (
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => onRemove(snack)}>
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-6 text-center">{quantity}</span>
              <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => onAdd(snack)}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button variant="outline" size="sm" onClick={() => onAdd(snack)}>
              Add
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

// Update the CartSummary component with proper types
type CartItem = {
  snack: Snack
  quantity: number
}

function CartSummary({
  items,
  total,
}: {
  items: CartItem[]
  total: number
}) {
  return (
    <div className="fixed bottom-20 left-0 right-0 bg-background border-t shadow-lg p-4 z-10">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <ShoppingCart className="mr-2 h-5 w-5" />
          <span className="font-medium">Your Order</span>
        </div>
        <span className="font-bold">${total.toFixed(2)}</span>
      </div>
      <div className="text-sm text-muted-foreground mb-3">
        {items.length === 0 ? "Your cart is empty" : `${items.reduce((sum, item) => sum + item.quantity, 0)} items`}
      </div>
    </div>
  )
}

// Hardcoded movie session data
const movieSession = {
  hall: "Hall 5",
  seat: "F12",
  movie: "Dune: Part Two",
  startTime: "7:30 PM",
  endTime: "10:15 PM",
}

// Update the main component with proper types for the functions
export default function Deliver() {
  const router = useRouter()
  const [cart, setCart] = useState<CartItem[]>([])

  // Calculate total price
  const totalPrice = cart.reduce((sum, item) => sum + item.snack.price * item.quantity, 0)

  // Add item to cart
  const addToCart = (snack: Snack) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.snack.id === snack.id)
      if (existingItem) {
        return prevCart.map((item) => (item.snack.id === snack.id ? { ...item, quantity: item.quantity + 1 } : item))
      } else {
        return [...prevCart, { snack, quantity: 1 }]
      }
    })
  }

  // Remove item from cart
  const removeFromCart = (snack: Snack) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.snack.id === snack.id)
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map((item) => (item.snack.id === snack.id ? { ...item, quantity: item.quantity - 1 } : item))
      } else {
        return prevCart.filter((item) => item.snack.id !== snack.id)
      }
    })
  }

  // Get quantity of an item in cart
  const getQuantity = (snackId: number) => {
    const item = cart.find((item) => item.snack.id === snackId)
    return item ? item.quantity : 0
  }

  // Handle continue to next page
  const handleContinue = () => {
    // In a real app, you might want to save the cart state
    // For this mockup, we'll just navigate to the next page
    router.push("/dine/deliver/deliver2")
  }

  return (
    <section className="pb-32 bg-background min-h-screen">
      <Header />
      <div className="container px-4 py-6">

        <RobotCard />

        {/* Prominent location and movie time alert */}
        <Alert className="mb-6 border-none">
          <div className="flex items-center gap-2">
            <Film className="h-5 w-5 text-primary" />
            <AlertTitle className="text-primary-foreground font-bold">{movieSession.movie}</AlertTitle>

          </div>
          <AlertDescription className="mt-2 text-primary-foreground/80">
          <h1 className="font-bold tracking-wide">
            You are watching {movieSession.movie}
          </h1>
            <div className="flex items-center gap-2 mb-1">
              <MapPin className="h-4 w-4 text-accent" />
              <span className="font-medium">
                {movieSession.hall}, Seat {movieSession.seat}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-accent" />
              <span>
                {movieSession.startTime} - {movieSession.endTime}
              </span>
            </div>
            <p className="mt-2 text-sm">
              Your order will be delivered directly to your row by our robot waiter during the movie.
            </p>
          </AlertDescription>
        </Alert>

        <h1 className="text-2xl font-bold mb-6">Order Snacks to Your Seat</h1>

        <ScrollArea className="h-[calc(100vh-380px)]">
          {Object.entries(snacksByCategory).map(([category, categorySnacks]) => (
            <div key={category} className="mb-6">
              <h2 className="text-lg font-semibold mb-3">{category}</h2>
              {categorySnacks.map((snack) => (
                <SnackItem
                  key={snack.id}
                  snack={snack}
                  onAdd={addToCart}
                  onRemove={removeFromCart}
                  quantity={getQuantity(snack.id)}
                />
              ))}
              <Separator className="my-4" />
            </div>
          ))}
        </ScrollArea>
      </div>

      <CartSummary items={cart} total={totalPrice} />

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t z-20">
        <Button className="w-full" size="lg" variant='gv' disabled={cart.length === 0} onClick={handleContinue}>
          Continue to Checkout
        </Button>
      </div>

      <BottomNav />
    </section>
  )
}
