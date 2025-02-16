"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import confetti from "canvas-confetti"
import Logo from "@/app/components/logo"

interface StepTenProps {
  onRestart: () => void
  isVisible: boolean
}

export default function StepTen({ onRestart, isVisible }: StepTenProps) {
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (isVisible && !hasAnimated) {
      setHasAnimated(true)

      const burstConfetti = () => {
        confetti({
          particleCount: 150,
          spread: 100,
          origin: { y: 0.5, x: 0.5 },
          colors: ["#FF0000", "#8A2BE2", "#00BFFF", "#FFD700", "#FF69B4"],
          shapes: ["square", "circle"],
          ticks: 200,
        })
      }

      // Multiple bursts for a more dramatic effect
      burstConfetti()
      setTimeout(burstConfetti, 200)
      setTimeout(burstConfetti, 400)
      setTimeout(burstConfetti, 600)
    }
  }, [isVisible, hasAnimated])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-pink-50 to-purple-50 flex flex-col items-center justify-start z-50 overflow-y-auto">
      <div className="w-full bg-gradient-to-r from-amber-500 to-orange-600 p-4 flex items-center justify-center shadow-lg">
        <Logo className="w-8 h-8 mr-2" />
        <h1 className="text-xl font-bold text-white">CleverMonkey</h1>
      </div>
      <div className="container max-w-md mx-auto p-4 text-center mt-4">
        <motion.h2
          className="text-3xl font-bold mb-2 text-gray-800"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Congratulations!
        </motion.h2>
        <motion.p
          className="text-lg mb-4 text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          You've finished the game!
        </motion.p>
        <motion.div
          className="space-y-4 text-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <p className="text-gray-600">
            Email: <span className="font-medium">info@amirsalmani.com</span>
          </p>
          <div className="bg-white p-6 rounded-xl shadow-lg border border-purple-100">
            <h2 className="text-lg font-bold mb-3 text-purple-600">Your Prize:</h2>
            <p className="mb-3">
              Secret cheat code: <span className="font-bold text-green-600 bg-green-50 px-2 py-1 rounded">amhousa</span>
            </p>
            <p className="font-medium mb-2 text-gray-700">How to use:</p>
            <ol className="list-decimal list-inside text-left text-gray-700 space-y-1">
              <li className="hover:text-purple-600 transition-colors">Start a new game or continue playing</li>
              <li className="hover:text-purple-600 transition-colors">Type "amhousa" on your keyboard</li>
              <li className="hover:text-purple-600 transition-colors">Advance to the next level instantly</li>
            </ol>
          </div>
          <Button
            onClick={onRestart}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            Play Again
          </Button>
        </motion.div>
      </div>
    </div>
  )
}

