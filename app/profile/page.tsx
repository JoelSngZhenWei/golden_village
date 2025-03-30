import { BottomNav } from "@/components/bottom-nav"
import { Header } from "@/components/header"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProfileCard } from "@/components/ProfileCard"
import { ProfileActivity } from "@/components/ProfileActivity"
import { ProfileSettings } from "@/components/ProfileSettings"

export default function Profile() {
  return (
    <section className="pb-20">
      <Header />

      <ProfileCard />

      {/* Tabs */}
      <Tabs defaultValue="dashboard" className="w-full">
        <div className="px-4">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="dashboard">Activity</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="dashboard" className="space-y-4 text-foreground">
          <ProfileActivity />
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <ProfileSettings />
        </TabsContent>
      </Tabs>
      <BottomNav />
    </section>
  )
}

