import { BottomNav } from "@/components/bottom-nav"
import { Header } from "@/components/header"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star } from "lucide-react"

export default function Home() {
  return (
    <section className="pb-20">
      <Header />

      <div className="container px-6 pt-6">
        {/* Profile card */}
        <Card className="mb-6 py-1 bg-secondary">
          <CardContent className="py-3 px-3 flex flex-col gap-3">
            <div className="flex flex-row justify-between text-foreground">
              <div className="flex flex-row gap-2">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/gigachad.jpg" alt="Profile picture" />
                </Avatar>
                <div className="content-center text-sm">
                  Matthew Chang
                </div>
              </div>
              <div className="content-center">
                <Button className="rounded-full text-sm">
                  Profile Details
                </Button>

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
      {/* Tabs */}
      <Tabs defaultValue="dashboard" className="w-full">
        <div className="px-6">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="dashboard" className="space-y-4 text-foreground">
          <div className="px-6">
            {/* horizontal scroll w/ payment methods */}
            <div>
              horizontal scroll
            </div>

            {/* horizontal scroll w more options */}
            <div>

            </div>
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <div className="px-6">
            {/* horizontal scroll w/ advertisements */}
            <div>
              Horizontal scroll w/ advertisements
            </div>

            {/* horizontal scroll w more options */}
            <div>

            </div>
          </div>
        </TabsContent>
      </Tabs>
      <BottomNav />
    </section>
  )
}

