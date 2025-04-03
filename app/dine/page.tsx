import Link from "next/link"

import { BottomNav } from "@/components/bottom-nav"
import { Header } from "@/components/header"

export default function FoodAndDrinks() {
  const sections = [
    {
      title: "Order to your seat",
      subtitle: (
        <>
          We see you&apos;re watching <strong className="text-accent">Snow White</strong>, we&apos;ll bring it right
          to you!
        </>
      ),
      image: "/food/order.png",
      href: "/dine/order",
      isOrderCard: true,
    },
    {
      title: "Gold Class Dining",
      subtitle: "Premium dining experience before your show",
      image: "/food/goldclass.png",
      href: "",
      isOrderCard: false,
    },
    {
      title: "Snacks",
      subtitle: "Classic movie treats and refreshments",
      image: "/food/snacks.png",
      href: "",
      isOrderCard: false,
    },
  ]

  return (
    <section className="pb-20">
      <Header />
      {/* Background Image with Gradient Fade */}
      <div
        className="absolute bottom-0 left-0 w-full h-[60vh]"
        style={{
          backgroundImage: `url('/backgrounds/theater.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
          maskImage: "linear-gradient(to top, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)",
          WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)",
        }}
      />
      <div className="container px-4 py-6">
        <h1 className="mb-6 text-center text-xl font-bold">Food &amp; Drinks</h1>
        <div className="flex flex-col space-y-4">
          {sections.map((section) => (
            <Link key={section.title} href={section.href} className="block">
              <div
                className={`relative overflow-hidden rounded-lg border ${
                  section.isOrderCard ? " border-accent/30 shadow-md shadow-accent/20" : "bg-background/70"
                } backdrop-blur-sm transition-all hover:shadow-lg`}
              >
                <div className="flex h-40 items-center justify-between p-4">
                  <div className="z-10 flex flex-col justify-center w-full">
                    <h2
                      className={`text-xl font-semibold ${
                        section.isOrderCard ? "text-accent" : "text-primary-foreground"
                      }`}
                    >
                      {section.title}
                    </h2>
                    <p
                      className={`text-sm mt-2 max-w-[60%] ${
                        section.isOrderCard ? "text-primary-foreground" : "text-primary-foreground/80"
                      }`}
                    >
                      {section.subtitle}
                    </p>
                    {section.isOrderCard && (
                      <div className="absolute top-2 right-2 bg-accent/90 text-accent-foreground text-xs px-2 py-1 rounded-full z-20">
                        Order Now
                      </div>
                    )}
                  </div>
                  <div
                    className="absolute inset-y-0 -right-2 w-1/2 bg-cover bg-right"
                    style={{
                      backgroundImage: `url(${section.image})`,
                      maskImage: "linear-gradient(to left, rgba(0,0,0,1), rgba(0,0,0,0))",
                      WebkitMaskImage: "linear-gradient(to left, rgba(0,0,0,1), rgba(0,0,0,0))",
                    }}
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <BottomNav />
    </section>
  )
}

