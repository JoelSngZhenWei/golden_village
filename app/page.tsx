import { Button } from "@/components/ui/button";
import { BiLogoGmail } from "react-icons/bi";
import { FaApple } from "react-icons/fa";
import Link from "next/link";
import Photo from "@/components/Photo";

export default function Home() {
  return (
    <section className="h-full mt-2">
      <div className="container px-2 h-full">
        <div className="flex flex-col items-center space-y-4 justify-center py-24 align">
          {/* Logo */}
          <div>
            <Photo />
          </div>
          {/* Login Group */}
          <div className="text-center w-full space-y-3">
            <Link href={'/home'}>
              <Button className="w-full py-6 text-base bg-slate-700">
                Log in to GV
              </Button>
            </Link>

            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="flex-shrink mx-4 text-sm text-gray-500">or continue with</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="py-5 flex items-center justify-center gap-2">
                <BiLogoGmail size={18} />
                <span>Gmail</span>
              </Button>

              <Button variant="outline" className="py-5 flex items-center justify-center gap-2">
                <FaApple size={18} />
                <span>Apple</span>
              </Button>
            </div>

            <p className="text-xs text-start text-muted-foreground mt-4">
              Security Advisory: Beware of calls from scammers claiming to be from Golden Village. Do not give away your login/payment details to anyone. <span className="text-blue-500 hover:underline">Learn more</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
