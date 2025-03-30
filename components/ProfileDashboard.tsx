"use client"

import * as React from "react"
import { Card, CardContent } from "./ui/card"
import { Building2, ChevronRight, Users } from "lucide-react"
import { ProfilePayment } from "./ProfilePayment"


export function ProfileDashboard() {
    return (
        <div className="pt-6">
            <ProfilePayment />
            <div className="px-4">
                <div className="flex flex-row">
                    <div className="w-[50%] pr-2">
                        <Card className="bg-secondary border border-muted-foreground h-22 relative overflow-hidden">
                            <CardContent className="p-4">
                                <div className="text-xs font-bold">Create Family Account</div>
                                <div className="absolute -bottom-2 -right-2 opacity-20">
                                    <Users className="h-16 w-16 text-accent" />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="w-[50%] pl-2">
                        <Card className="bg-secondary border border-muted-foreground h-22 relative overflow-hidden">
                            <CardContent className="p-4">
                                <div className="text-xs font-bold">Venue Bookings</div>
                                <div className="absolute -bottom-2 -right-2 opacity-20">
                                    <Building2 className="h-16 w-16 text-accent" />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            {/* Settings */}
            <div className="px-4 pt-4">
                {/* For more value section */}
                <div className="mb-6">
                    <Card>
                        <CardContent className="p-0 text-foreground/80">
                            <h3 className="text-lg font-medium mb-2 text-foreground">For more value</h3>
                            <div className="">
                                <div className="flex items-center justify-between py-3 border-b border-muted-foreground">
                                    <span>GV Rewards</span>
                                    <ChevronRight className="h-5 w-5 " />
                                </div>
                                <div className="flex items-center justify-between py-3 border-b border-muted-foreground">
                                    <span>Subscriptions</span>
                                    <ChevronRight className="h-5 w-5 " />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* General section */}
                <div className="mb-6">
                    <Card>
                        <CardContent className="p-0 text-foreground/80">
                            <h3 className="text-lg font-medium mb-2 text-foreground">General</h3>
                            <div className="">
                                <div className="flex items-center justify-between py-3 border-b border-muted-foreground">
                                    <span>Favourites</span>
                                    <ChevronRight className="h-5 w-5 " />
                                </div>
                                <div className="flex items-center justify-between py-3 border-b border-muted-foreground">
                                    <span>Settings</span>
                                    <ChevronRight className="h-5 w-5 " />
                                </div>
                                <div className="flex items-center justify-between py-3 border-b border-muted-foreground">
                                    <span>Safety Settings</span>
                                    <ChevronRight className="h-5 w-5 " />
                                </div>
                                <div className="flex items-center justify-between py-3 border-b border-muted-foreground">
                                    <span>Language</span>
                                    <ChevronRight className="h-5 w-5 " />
                                </div>

                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Support section */}
                <div className="mb-6">
                    <Card>
                        <CardContent className="p-0 text-foreground/80">
                            <h3 className="text-lg font-medium mb-2 text-foreground">Support</h3>
                            <div className="">
                                <div className="flex items-center justify-between py-3 border-b border-muted-foreground">
                                    <span>Help Centre</span>
                                    <ChevronRight className="h-5 w-5 " />
                                </div>
                                <div className="flex items-center justify-between py-3 border-b border-muted-foreground">
                                    <span>Share Feedback</span>
                                    <ChevronRight className="h-5 w-5 " />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

