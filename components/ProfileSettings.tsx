"use client"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight } from "lucide-react"
import { ProfilePayment } from "./ProfileSettingsPayment"

export function ProfileSettings() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Set visible after component mounts to trigger animations
    // Small delay to ensure smooth animation after tab switch
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="pt-6">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ height: 0, overflow: "hidden" }}
            animate={{
              height: "auto",
              transition: {
                height: {
                  duration: 0.5,
                  ease: [0.33, 1, 0.68, 1], // Custom easing for more natural growth
                },
              },
            }}
            style={{ overflow: "hidden" }}
            layout // This helps with pushing content down
          >
            <ProfilePayment />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cards section - these will be pushed down by the growing ProfilePayment */}
      <motion.div layout>
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
      </motion.div>
    </div>
  )
}

