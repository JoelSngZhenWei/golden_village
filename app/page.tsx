import { Button } from "@/components/ui/button"
import { BiLogoGmail } from "react-icons/bi"
import { FaApple } from "react-icons/fa"
import Link from "next/link"

export default function Home() {
  return (
    <section className="relative h-screen w-full bg-black">
      {/* Background Image with Gradient Fade */}
      <div
        className="absolute top-0 left-0 w-full h-[70vh]"
        style={{
          backgroundImage: `url('/backgrounds/theater.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
          maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full w-full">
        <div className="container px-2 h-full">
          <div className="flex flex-col items-center justify-between h-full pt-[65vh] pb-10">
            <div className="text-white text-center mb-auto">
              <h2 className="text-lg font-bold tracking-wide">Movies. <span className="text-accent">Like never before.</span></h2>
            </div>

            {/* Login Group - positioned at bottom like OCBC app */}
            <div className="text-center w-full max-w-md space-y-3">
              <Link href={"/home"}>
                <Button className="w-full py-6 text-base bg-slate-700 hover:bg-slate-600">
                  Log in to GV
                </Button>
              </Link>

              <div className="relative flex items-center py-2">
                <div className="flex-grow border-t border-gray-600"></div>
                <span className="flex-shrink mx-4 text-sm text-gray-400">or continue with</span>
                <div className="flex-grow border-t border-gray-600"></div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="py-5 flex items-center justify-center gap-2 border-gray-700 text-white hover:bg-gray-800">
                  <BiLogoGmail size={18} />
                  <span>Gmail</span>
                </Button>

                <Button variant="outline" className="py-5 flex items-center justify-center gap-2 border-gray-700 text-white hover:bg-gray-800">
                  <FaApple size={18} />
                  <span>Apple</span>
                </Button>
              </div>

              <p className="text-xs text-start text-gray-400 mt-4">
                Security Advisory: Beware of calls from scammers claiming to be from Golden Village. Do not give away
                your login/payment details to anyone. <span className="text-blue-400 hover:underline">Learn more</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
