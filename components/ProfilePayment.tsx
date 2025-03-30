"use client"

import * as React from "react"
import { Card, CardContent } from "./ui/card"
import { Badge } from "./ui/badge"
import Image from "next/image"

// Payment methods data
const paymentMethods = [
    {
        title: "Paylah",
        image: "/paymentoptions/paylah.png",
        default: "true",
        description: "+65 9••• ••12",
    },
    {
        title: "PayNow",
        image: "/paymentoptions/paynow.png",
        default: "false",
        description: "+65 8••• ••45",
    },
    {
        title: "Apple Pay",
        image: "/paymentoptions/applepay3.png",
        default: "false",
        description: "",
    },
    {
        title: "GrabPay",
        image: "/paymentoptions/grabpay.png",
        default: "false",
        description: "",
    },
    {
        title: "MasterCard",
        image: "/paymentoptions/mastercard.png",
        default: "false",
        description: "•••• 4382",
    },
]
export function ProfilePayment() {
    return (
        <div className="px-4">
            {/* horizontal scroll w/ payment methods */}
            <div className="mb-6">
                <div className="relative group">
                    <div
                        className="flex overflow-x-auto space-x-4 scrollbar-hide pb-4 px-1"
                        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                    >
                        {paymentMethods.map((method, index) => (
                            <div key={index}>
                                <Card className="border border-muted-foreground w-[165px] h-[165px] rounded-xl p-5">
                                    <CardContent className="px-0 h-full">
                                        <div className="flex flex-col justify-between gap-5 h-full">
                                            <div className="flex flex-row justify-between">
                                                <div className="bg-secondary rounded-full p-1 w-[35px] h-[35px] text-center justify-center flex">
                                                    <Image
                                                        src={method.image || "/placeholder.svg"}
                                                        alt={method.title}
                                                        width={30}
                                                        height={30}
                                                        className="object-contain"
                                                    />
                                                </div>
                                                {method.default === "true" && (
                                                    <Badge className="bg-gradient-to-r bg-secondary text-foreground text-center text-xs rounded-full">
                                                        Default
                                                    </Badge>
                                                )}
                                            </div>

                                            <div className="flex flex-col">
                                                <span className="font-medium text-base">{method.title}</span>
                                                <span className="text-xs text-muted-foreground mt-1 h-4">
                                                    {method.description || "\u00A0"}
                                                </span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

