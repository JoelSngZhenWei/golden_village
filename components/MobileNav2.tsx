"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Menu, User, HomeIcon, LogOut } from "lucide-react"
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

// Updated links array without Logout
const links = [
  { name: "home", path: "/home", icon: HomeIcon },
  // Add more navigation links here as needed
]

const MobileSidebar = () => {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className="flex justify-center items-center">
        <Menu className="h-8 w-8 text-accent" />
      </SheetTrigger>
      <SheetContent side="left" className="pl-5 w-[300px]">
        <SheetHeader className="mb-6 mt-6">
          <div className="flex items-center space-x-4 pb-4">
            <Avatar className="h-16 w-16 border-2 border-primary">
              <AvatarImage src="/gigachad.jpg" alt="Matthew Chang" />
              <AvatarFallback className="bg-muted">
                <User className="h-8 w-8" />
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <SheetTitle className="text-left text-xl font-bold">Matthew Chang</SheetTitle>
              <p className="text-sm text-muted-foreground font-bold">Gold Class Member</p>
            </div>
          </div>
          <div className="h-px w-full bg-foreground/20" />
        </SheetHeader>

        {/* Navigation */}
        <nav className="flex flex-col justify-start items-start gap-6 py-4">
          {links.map((link, index) => {
            const isActive = link.path === "/" ? pathname === "/" : pathname.startsWith(link.path)

            return (
              <Link
                href={link.path}
                key={index}
                className={`capitalize hover:text-accent transition-all duration-300 font-medium tracking-wide w-full text-start text-lg`}
                onClick={() => setIsOpen(false)}
              >
                <div className="flex items-center gap-3">
                  {link.icon && <link.icon className="h-5 w-5" />}
                  <span className={`py-1 ${isActive ? "text-accent border-b-2 border-accent" : ""}`}>{link.name}</span>
                </div>
              </Link>
            )
          })}

          {/* Additional navigation items can be added here */}
          <p className="text-muted-foreground text-sm">More to come here</p>

          {/* Separate Logout Button */}
          <Link href='/'>
            <Button
              variant="ghost"
              className="w-full justify-start text-lg font-medium hover:text-destructive hover:bg-destructive/10 px-0"
            >
              <div className="flex items-center gap-3">
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </div>
            </Button>
          </Link>
        </nav>

        <SheetFooter className="mt-auto">
          <div className="w-full pt-4">
            <p className="text-sm text-muted-foreground">© Golden Village</p>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default MobileSidebar

