"use client"

import { useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"

interface GameResultsImageProps {
  gameResults: {
    totalMoves: number
    totalTime: number
    stepsCompleted: number
  }
}

export default function GameResultsImage({ gameResults }: GameResultsImageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d")
      if (ctx) {
        // Set canvas size
        canvas.width = 1200
        canvas.height = 630

        // Background
        ctx.fillStyle = "linear-gradient(to bottom, #fdf4ff, #ede9fe)"
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Logo
        const logo = new Image()
        logo.src = "/logo.png" // Make sure to add a logo.png file to your public folder
        logo.onload = () => {
          ctx.drawImage(logo, 50, 50, 100, 100)
        }

        // Title
        ctx.font = "bold 48px Arial"
        ctx.fillStyle = "#4B0082"
        ctx.fillText("CleverMonkey Game Results", 200, 100)

        // Game results
        ctx.font = "24px Arial"
        ctx.fillStyle = "#333333"
        ctx.fillText(`Total Moves: ${gameResults.totalMoves}`, 200, 200)
        ctx.fillText(`Total Time: ${gameResults.totalTime} seconds`, 200, 250)
        ctx.fillText(`Steps Completed: ${gameResults.stepsCompleted}/10`, 200, 300)

        // Signature
        ctx.font = "italic 18px Arial"
        ctx.fillStyle = "#666666"
        ctx.fillText("CleverMonkey - Train Your Memory!", 200, 550)
      }
    }
  }, [gameResults])

  const handleDownload = () => {
    if (canvasRef.current) {
      const link = document.createElement("a")
      link.download = "clever-monkey-results.png"
      link.href = canvasRef.current.toDataURL()
      link.click()
    }
  }

  return (
    <div className="space-y-4">
      <canvas ref={canvasRef} className="mx-auto border rounded-lg shadow-md" />
      <Button onClick={handleDownload} className="bg-green-500 hover:bg-green-600 text-white">
        Download Results Image
      </Button>
    </div>
  )
}

