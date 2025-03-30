"use client"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Building2, Users } from "lucide-react"
import { ProfileActivityCards } from "./ProfileActivityCards"
import { ProfileActivityList } from "./ProfileActivityList"

export function ProfileActivity() {
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
            <ProfileActivityCards />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cards section - these will be pushed down by the growing ProfilePayment */}
      <motion.div layout className="">
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

        <div className="mt-6">
          <ProfileActivityList />
        </div>
      </motion.div>
    </div>
  )
}

