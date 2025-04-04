import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { InfoIcon } from "lucide-react"

const RobotCard = () => {
  return (
    <Card className="p-0 overflow-hidden border border-foreground/20 mb-6">
      <CardContent className="relative p-0 h-[300px] flex items-center justify-center">
        <Image
          src="/robot.jpg"
          alt="GV Delivery Robot"
          width={600}
          height={400}
          className="rounded-md object-cover w-full h-full"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black to-transparent" />

        {/* Content overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="text-xl font-bold mb-2">Meet GV Bot!</h3>
          <p className="text-sm mb-3 opacity-90">
            Our hardworking robot waiter will deliver your snacks directly to your row during the movie without disturbing
            other viewers.
          </p>
          {/* <div className="flex space-x-2">
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              <InfoIcon className="w-4 h-4 mr-2" />
              How It Works
            </Button>
          </div> */}
        </div>
      </CardContent>
    </Card>
  )
}

export default RobotCard

