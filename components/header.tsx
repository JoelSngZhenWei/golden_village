"use client"

import * as React from "react"
import Link from "next/link"
import MobileNav2 from "./MobileNav2"
import { ThemeToggleButton } from "./ThemeButton";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-primary/80 backdrop-blur-sm border-b border-secondary">
      <div className="py-1 lg:py-2 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="lg:hidden">
            <MobileNav2 />
          </div>

          {/* Logo */}
          <Link href="/" className="transition-all duration-300 hover:text-accent text-primary-foreground">
            <h1 className="text-lg lg:text-2xl font-semibold tracking-wide">Golden Village</h1>
          </Link>

          {/* Theme Toggle Button */}
          <div className="justify-center lg:hidden">
            <ThemeToggleButton />
          </div>

        </div>
      </div>
    </header>
  )
}

