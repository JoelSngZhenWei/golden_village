'use client'

import { Home, Utensils, Film, Trophy, User } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function BottomNav() {
  const pathname = usePathname()
  const activeSegment = "/" + pathname.split("/")[1]

  const navigation = [
    { name: "Dine", href: "", icon: Utensils },
    { name: "Movies", href: "/movies", icon: Film },
    { name: "Home", href: "/home", icon: Home },
    { name: "Rewards", href: "", icon: Trophy },
    { name: "Profile", href: "/profile", icon: User },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t border-foreground/20 bg-background pb-2">
      <div className="relative">
        <div className="flex h-16">
          {navigation.map((item) => {
            const isActive = activeSegment === item.href
            const shouldGlow = item.name === 'Home' || item.name === 'Plan'
            return (
              <Link
                key={item.name}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "flex-1 flex flex-col items-center justify-center gap-1 relative clickable",
                  isActive && "text-accent",
                  shouldGlow && "highlight-glow"
                )}
              >
                <item.icon
                  className={cn(
                    "h-6 w-6",
                    isActive ? "text-accent" : "text-muted-foreground"
                  )}
                />
                <span className="text-xs font-medium">
                  {item.name}
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}