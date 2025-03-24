"use client"
import { motion } from "framer-motion"
import Image from "next/image"

const Photo = () => {
  return (
    <div className="relative w-[230px] h-[230px] lg:w-[506px] lg:h-[506px]">
      <motion.div
        className="w-full h-full"
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { delay: 1, duration: 0.4, ease: "easeIn" },
        }}
      >
        {/* image */}
        <motion.div
          className="w-[230px] h-[230px] lg:w-[498px] lg:h-[498px] absolute inset-0 z-10"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { delay: 1.4, duration: 0.4, ease: "easeInOut" },
          }}
        >
          <Image
            src="/largelogo.png"
            priority
            quality={100}
            fill
            alt="Joel Sng's portrait"
            className="object-cover rounded-full "
          />
        </motion.div>

        {/* circle */}
        <motion.svg
          className="absolute inset-0 w-full h-full z-40"
          fill="transparent"
          viewBox="0 0 506 506"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.circle
            cx="253"
            cy="253"
            r="250"
            // stroke="#ffffff"
            className="stroke-secondary"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ strokeDasharray: "24 10 0 0" }}
            animate={{
              strokeDasharray: [
                "15 120 25 25",
                "16 25 92 72",
                "4 250 22 22"],
              rotate: [120, 360],
            }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        </motion.svg>
      </motion.div>
    </div>
  )
}

export default Photo

