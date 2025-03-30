"use client"

import * as React from "react"
import { Card, CardContent } from "./ui/card"
import { Avatar, AvatarImage } from "@radix-ui/react-avatar"
import { Star } from "lucide-react"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import Link from "next/link"


export function ProfileCard() {
    return (
        <div className="container px-6 pt-6">
            {/* Profile card */}
            <Card className="py-1 bg-secondary">
                <CardContent className="py-3 px-3 flex flex-col gap-3">
                    <div className="flex flex-row justify-between text-foreground">
                        <div className="flex flex-row gap-2">
                            <Avatar className="h-10 w-10">
                                <AvatarImage src="/gigachad.jpg" alt="Profile picture" />
                            </Avatar>
                            <div className="content-center text-sm">Matthew Chang</div>
                        </div>
                        <div className="content-center">
                            <Link href="/profile/details">
                                <Button className="rounded-full text-sm">Profile Details</Button>
                            </Link>
                        </div>
                    </div>

                    <div className="flex flex-row gap-6">
                        {/* Membership status */}
                        <div className="flex flex-col justify-center w-full items-center">
                            <Badge className="bg-gradient-to-r from-amber-500 to-amber-300 hover:from-amber-500 hover:to-amber-300 text-foreground text-sm w-[50%]">
                                <Star className="h-3 w-3 mr-1 fill-current" /> Gold Class
                            </Badge>
                            <span className="text-xs text-muted-foreground mt-2">Valid until Dec 2025</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

