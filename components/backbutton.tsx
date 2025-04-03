"use client"

import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

const BackButton = () => {
    const router = useRouter()


    return (
        <div className="absolute left-15 top-10">
            <Button
                className="sticky top-5 -mt-13 left-15 z-50 flex items-center gap-2 font-bold bg-background text-accent hover:bg-accent hover:text-primary"
                onClick={() => router.back()}
            >
                <ChevronLeft className="h-12 w-12" />
            </Button>
        </div>
    )
}

export default BackButton

