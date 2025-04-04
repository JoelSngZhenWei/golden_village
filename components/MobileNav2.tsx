"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Menu, User, HomeIcon, LogOut, } from "lucide-react"
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
// import GlowButton from "./glow-button"

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
      <SheetTrigger className="flex justify-center items-center hover:bg-accent rounded-lg hover:text-primary text-accent">
        <Menu className="h-8 w-8" />
      </SheetTrigger>
      <SheetContent side="left" className="pl-5 w-[300px]">
        <SheetHeader className="mb-6 mt-6">
          <Link href="/profile" className="" onClick={() => setIsOpen(false)}>
            <div className="flex items-center space-x-4 pb-4 clickable">
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
          </Link>
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

          {/* Separator before Dev Tools section */}
          {/* <div className="h-px w-full bg-foreground/10 my-2" /> */}

          {/* Dev Tools Section */}
          {/* <div className="w-full"> */}
            {/* <div className="flex items-center gap-3 mb-4"> */}
              {/* <Terminal className="h-5 w-5 text-muted-foreground" /> */}
              {/* <p className="text-muted-foreground text-sm font-medium">Dev Tools</p> */}
            {/* </div> */}

            {/* <div className="pl-8"> */}
              {/* <Link href="/dev/glow" className="block mb-3">
                <div className="flex items-center gap-3">
                  <Code className="h-5 w-5" />
                  <span className="text-base font-medium">Glow Effect</span>
                </div>
              </Link>

              <GlowButton /> */}
            {/* </div> */}
          {/* </div> */}
 
          {/* Separator after Dev Tools section */}
          <div className="h-px w-full bg-foreground/10 my-2" />

          {/* Separate Logout Button */}
          <Link href="/">
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

