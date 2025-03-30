"use client"
import { useState } from "react"
import { Card, CardContent } from "./ui/card"
import { Avatar, AvatarImage } from "@radix-ui/react-avatar"
import { Barcode, Star, User } from "lucide-react"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import Link from "next/link"

export function ProfileCard() {
  const [showBarcode, setShowBarcode] = useState(false)

  return (
    <div className="container px-6 pt-6 ">
      {/* Profile card */}
      <Card className="py-1 bg-secondary h-[200px] ">
        <CardContent className="py-3 px-3 flex flex-col gap-3 h-full">
          <div className="flex flex-row justify-between text-foreground">
            <div className="flex flex-row gap-2">
              <Avatar className="h-10 w-10 rounded-full overflow-hidden">
                <AvatarImage src="/gigachad.jpg" alt="Profile picture" />
              </Avatar>
              <div className="content-center text-sm">Matthew Chang</div>
            </div>
            <div className="content-center flex gap-2">
              {!showBarcode && (
                <Button variant="outline" size="icon" className="rounded-full" onClick={() => setShowBarcode(true)}>
                  <Barcode className="h-4 w-4" />
                </Button>
              )}
              {showBarcode && (
                <Button variant="outline" size="icon" className="rounded-full" onClick={() => setShowBarcode(false)}>
                  <User className="h-4 w-4" />
                </Button>
              )}
              <Link href="/profile/details">
                <Button variant="outline" className="rounded-full text-sm">
                  Details
                </Button>
              </Link>
            </div>
          </div>

          <div className="flex flex-row gap-6 h-full">
            {/* Membership status or Barcode based on state */}
            {!showBarcode ? (
              <div className="flex flex-col justify-center w-full items-center">
                <Badge className="bg-gradient-to-r from-amber-500 to-amber-300 hover:from-amber-500 hover:to-amber-300 text-foreground text-lg font-bold w-[75%]">
                  <Star className="h-3 w-3 mr-1 fill-current" /> Gold Class Member
                </Badge>
                <span className="text-xs text-muted-foreground mt-2">Valid until Dec 2025</span>
              </div>
            ) : (
              <div className="flex flex-col justify-center w-full items-center py-2">
                <div className="w-full h-20 bg-white flex items-center justify-center">
                  <div className="w-[80%] h-16 bg-gradient-to-r from-gray-900 to-gray-900 relative">
                    {/* Barcode lines - simplified representation */}
                    {Array.from({ length: 30 }).map((_, i) => (
                      <div
                        key={i}
                        className="absolute bg-white"
                        style={{
                          left: `${i * 3.33}%`,
                          top: 0,
                          width: `${Math.random() * 1.5 + 0.5}%`,
                          height: "100%",
                        }}
                      />
                    ))}
                  </div>
                </div>
                <span className="text-xs text-muted-foreground mt-2">Scan for membership verification</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

