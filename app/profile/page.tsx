import { BottomNav } from "@/components/bottom-nav"
import { Header } from "@/components/header"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProfileCard } from "@/components/ProfileCard"
import { ProfileDashboard } from "@/components/ProfileDashboard"

export default function Profile() {
  return (
    <section className="pb-20">
      <Header />

      <ProfileCard />

      {/* Tabs */}
      <Tabs defaultValue="dashboard" className="w-full">
        <div className="px-4">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="dashboard" className="space-y-4 text-foreground">
          <ProfileDashboard />
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <div className="px-6">
            {/* horizontal scroll w/ advertisements */}
            <div>Horizontal scroll w/ advertisements</div>

            {/* horizontal scroll w more options */}
            <div></div>
          </div>
        </TabsContent>
      </Tabs>
      <BottomNav />
    </section>
  )
}

