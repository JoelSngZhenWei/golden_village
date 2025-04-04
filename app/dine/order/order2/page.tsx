import { BottomNav } from "@/components/bottom-nav"
import { Header } from "@/components/header"
import OrderConfirmation from "@/components/OrderConfirmation"

export default function order() {
  return (
    <section className="pb-20">
      <Header />

      <OrderConfirmation />
      <BottomNav />
    </section>
  )
}

