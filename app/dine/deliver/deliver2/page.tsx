import BackButton from "@/components/backbutton"
import { BottomNav } from "@/components/bottom-nav"
import DeliveryConfirmation from "@/components/DeliveryConfirmation"
import { Header } from "@/components/header"

export default function deliver2() {
  return (
    <section className="pb-20">
      <Header />
      <BackButton />

      <DeliveryConfirmation />
      <BottomNav />
    </section>
  )
}

