"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function GlowButton() {
  const [isGlowing, setIsGlowing] = useState(false)

  const toggleGlow = () => {
    const interactableElements = document.querySelectorAll(".interactable")

    setIsGlowing(!isGlowing)

    interactableElements.forEach((element) => {
      if (!isGlowing) {
        element.classList.add("glowing-border")
      } else {
        element.classList.remove("glowing-border")
      }
    })
  }

  return (
    <Button onClick={toggleGlow} variant={isGlowing ? "gv" : "gv_outline"} className="font-medium">
      {isGlowing ? "Dev Mode" : "Dev Mode"}
    </Button>
  )
}

