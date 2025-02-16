"use client"

import { motion } from "framer-motion"
import { Heart, Coffee } from "lucide-react"

export function CreditStrip() {
  return (
    <motion.div
      className="fixed bottom-0 left-0 w-full bg-black text-white text-sm py-1 overflow-hidden"
      initial={{ x: "100%" }}
      animate={{
        x: "-100%",
        transition: {
          repeat: Number.POSITIVE_INFINITY,
          duration: 20,
          ease: "linear",
        },
      }}
    >
      <div className="whitespace-nowrap">
        <p className="inline-block">
          Designed and implemented by:{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300 transition-colors"
            href="https://amirsalmani.com"
          >
            Amirhossein Salmani
          </a>{" "}
          with <Heart className="inline-block w-4 h-4 mx-1" /> and <Coffee className="inline-block w-4 h-4 mx-1" /> + AI
        </p>
      </div>
    </motion.div>
  )
}

