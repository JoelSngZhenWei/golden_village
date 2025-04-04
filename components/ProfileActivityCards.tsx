"use client"
import { Card, CardHeader, CardFooter } from "@/components/ui/card"
import { ChevronRight, DollarSign, Coins } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Notification data
const notifications = [
  {
    title: "Get ready to watch Snow White today!",
    subtitle: "7:30 PM at GV Bishan",
    action: "View ticket",
    image: "/movieposters/snowwhite.jpeg",
    bgColor: "bg-blue-950",
    textColor: "text-blue-100",
    borderColor: "border-muted-foreground/50",
    iconColor: "text-blue-100",
    actionColor: "text-blue-100",
    useImage: true,
  },
  {
    title: "Let's talk about Chhaava!",
    subtitle: "How did you like your movie?",
    action: "Rate and review",
    image: "/movieposters/chhaava.jpg",
    bgColor: "bg-purple-950",
    textColor: "text-purple-100",
    borderColor: "border-muted-foreground/50",
    iconColor: "text-purple-100",
    actionColor: "text-purple-100",
    useImage: true,
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
    title: "Upcoming Harry Potter Watch Party!",
    subtitle: "At GV Paya Lebar Quarter",
    action: "Register interest",
    image: "/movieposters/harrypotter.JPG",
    bgColor: "bg-emerald-950",
    textColor: "text-emerald-100",
    borderColor: "border-muted-foreground/50",
    iconColor: "text-emerald-100",
    actionColor: "text-emerald-100",
    useImage: true,
  },
]

export function ProfileActivityCards() {
  return (
    <div className="px-4 dark">
      {/* horizontal scroll w/ notifications */}
      <div className="mb-6">
        <div className="relative group">
          <div
            className="flex overflow-x-auto space-x-4 scrollbar-hide pb-4 px-1 snap-x snap-mandatory scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {notifications.map((notification, index) => (
              <div key={index} className="snap-center shrink-0">
                <Card
                  className={`border w-[90vw] h-[200px] rounded-xl overflow-hidden relative flex flex-col ${notification.bgColor} ${notification.borderColor}`}
                >
                  {/* Card Header for Title and Subtitle - 75% of card height */}
                  <CardHeader
                    className={`pb-0 pt-4 px-5 relative z-10 border-b ${notification.borderColor} h-[150px] flex flex-col justify-end`}
                  >
                    <h3 className={`font-medium text-xl ${notification.textColor}`}>{notification.title}</h3>
                    {notification.subtitle && (
                      <p className="text-sm text-muted-foreground mt-1">{notification.subtitle}</p>
                    )}
                  </CardHeader>

                  {/* Card Footer for Action - remaining 25% of height */}
                  <CardFooter className="pt-0 pb-4 px-5 relative z-10 h-[25px] flex items-center">
                    <Link href="#" className={`text-sm font-medium flex items-center ${notification.actionColor}`}>
                      {notification.action}
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </CardFooter>

                  {/* Large icon or image positioned to overflow off the right side */}
                  <div className="absolute top-2/3 -right-7 -translate-y-1/2">
                    {notification.useImage ? (
                      <div className="relative opacity-30  rounded-full">
                        <Image
                          src={notification.image || "/placeholder.svg"}
                          alt={notification.title}
                          width={250}
                          height={250}
                        />
                      </div>
                    ) : (
                      <div className={notification.iconColor}>{notification.icon}</div>
                    )}
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

