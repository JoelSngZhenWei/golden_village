"use client"
import { Card, CardHeader, CardFooter } from "@/components/ui/card"
import { ChevronRight, DollarSign, Coins, Crown, Popcorn, Gift, Calendar } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Notification data
const notifications = [
  {
    title: "Get ready to watch Snow White today!",
    subtitle: "7:30 PM at GV Bishan",
    action: "View ticket",
    image: "/snowwhite2.jpeg",
    bgColor: "bg-blue-950",
    textColor: "text-primary",
    borderColor: "border-muted-foreground/50",
    iconColor: "text-blue-100",
    actionColor: "text-primary",
    useImage: true,
  },
  {
    title: "Let's talk about Chhaava!",
    subtitle: "How did you like your movie?",
    action: "Rate and review",
    image: "/chhaava2.jpg",
    bgColor: "bg-purple-950",
    textColor: "text-primary",
    borderColor: "border-muted-foreground/50",
    iconColor: "text-purple-100",
    actionColor: "text-primary",
    useImage: true,
  },
  {
    title: "Book a Private Cinema Experience",
    subtitle: "Perfect for corporate events and celebrations",
    action: "Book now",
    image: "/private.png",
    bgColor: "bg-rose-950",
    textColor: "text-primary",
    borderColor: "border-muted-foreground/50",
    iconColor: "text-rose-100",
    actionColor: "text-primary",
    useImage: true,
  },

  {
    title: "Upcoming Harry Potter Watch Party!",
    subtitle: "At GV Paya Lebar Quarter",
    action: "Register interest",
    image: "/harrypotter2.jpg",
    bgColor: "bg-emerald-950",
    textColor: "text-primary",
    borderColor: "border-muted-foreground/50",
    iconColor: "text-emerald-100",
    actionColor: "text-primary",
    useImage: true,
  },
  {
    title: "Upgrade to GV Premium",
    subtitle: "Enjoy exclusive perks and priority booking",
    action: "Learn more",
    icon: <Crown className="h-24 w-24 opacity-40" />,
    bgColor: "bg-yellow-950",
    textColor: "text-yellow-100",
    borderColor: "border-muted-foreground/50",
    iconColor: "text-yellow-100",
    actionColor: "text-yellow-100",
    useImage: false,
  },

  {
    title: "Cinema Snacks Delivered",
    subtitle: "Get your favorite movie treats at home",
    action: "Order now",
    icon: <Popcorn className="h-24 w-24 opacity-40" />,
    bgColor: "bg-teal-950",
    textColor: "text-teal-100",
    borderColor: "border-muted-foreground/50",
    iconColor: "text-teal-100",
    actionColor: "text-teal-100",
    useImage: false,
  },
  {
    title: "You have rewards waiting for you",
    subtitle: "Redeem exclusive items!",
    action: "Explore GV exclusive rewards",
    icon: <Coins className="h-24 w-24 opacity-40" />,
    bgColor: "bg-amber-950",
    textColor: "text-amber-100",
    borderColor: "border-muted-foreground/50",
    iconColor: "text-amber-100",
    actionColor: "text-amber-100",
    useImage: false,
  },
  {
    title: "Give the Gift of Movies",
    subtitle: "Perfect for any occasion",
    action: "Purchase gift cards",
    icon: <Gift className="h-24 w-24 opacity-40" />,
    bgColor: "bg-pink-950",
    textColor: "text-pink-100",
    borderColor: "border-muted-foreground/50",
    iconColor: "text-pink-100",
    actionColor: "text-pink-100",
    useImage: false,
  },
  {
    title: "You saved S$48.20 with your Member savings.",
    subtitle: "",
    action: "View your other benefits",
    icon: <DollarSign className="h-24 w-24 opacity-40" />,
    bgColor: "bg-orange-950",
    textColor: "text-orange-100",
    borderColor: "border-muted-foreground/50",
    iconColor: "text-orange-100",
    actionColor: "text-orange-100",
    useImage: false,
  },
  {
    title: "Host a Birthday Movie Party",
    subtitle: "Special packages for kids and adults",
    action: "See packages",
    icon: <Calendar className="h-24 w-24 opacity-40" />,
    bgColor: "bg-indigo-950",
    textColor: "text-indigo-100",
    borderColor: "border-muted-foreground/50",
    iconColor: "text-indigo-100",
    actionColor: "text-indigo-100",
    useImage: false,
  },

]

export function ProfileActivityCards() {
  return (
    <div className="px-4 dark">
      {/* horizontal scroll w/ notifications */}
      <div className="">
        <div className="relative group">
          <div
            className="flex overflow-x-auto space-x-4 scrollbar-hide pb-4 px-1 snap-x snap-mandatory scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {notifications.map((notification, index) => (
              <div key={index} className="snap-center shrink-0">
                <Card
                  className={`border w-[85vw] h-[200px] rounded-xl overflow-hidden relative flex flex-col ${notification.useImage
                    ? notification.bgColor.replace("bg-", "bg-opacity-70 bg-")
                    : notification.bgColor
                    } ${notification.borderColor}`}
                >
                  {/* Background image when useImage is true */}
                  {notification.useImage && (
                    <div className="absolute inset-0 w-full h-full z-0">
                      <Image
                        src={notification.image || "/placeholder.svg"}
                        alt={notification.title}
                        fill
                        className="object-cover opacity-50"
                        priority
                      />
                    </div>
                  )}

                  {/* Card Header for Title and Subtitle - 75% of card height */}
                  <CardHeader
                    className={`pb-0 pt-4 px-5 relative z-10 border-b ${notification.borderColor} h-[150px] flex flex-col justify-end`}
                  >
                    <h3
                      className={`font-medium text-xl ${notification.useImage ? "text-shadow" : ""}`}
                    >
                      {notification.title}
                    </h3>
                    {notification.subtitle && (
                      <p className={`text-sm text-primary mt-1 ${notification.useImage ? "text-shadow" : ""}`}>
                        {notification.subtitle}
                      </p>
                    )}
                  </CardHeader>

                  {/* Card Footer for Action - remaining 25% of height */}
                  <CardFooter className="pt-0 pb-4 px-5 relative z-10 h-[25px] flex items-center">
                    <Link
                      href="#"
                      className={`text-sm font-medium flex items-center ${notification.actionColor} ${notification.useImage ? "text-shadow" : ""}`}
                    >
                      {notification.action}
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </CardFooter>

                  {/* Only show icon if not using image */}
                  {!notification.useImage && (
                    <div className="absolute top-2/3 -right-7 -translate-y-1/2">
                      <div className={notification.iconColor}>{notification.icon}</div>
                    </div>
                  )}
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

