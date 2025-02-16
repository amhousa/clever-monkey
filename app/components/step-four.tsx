"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Image from "next/image"

const airdrops = [
  {
    name: "Telegram",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Telegram_(1)-zTaIdTujxfcUSpxKZS7MAstxw5mWDq.png",
    emoji: "📱",
    bgColor: "bg-[#2B2E33]",
    textColor: "text-white",
  },
  {
    name: "Uniswap",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/uniswap-uni-logo-Ez2QKyFJaZHadJtscZWfF3WDX60gVR.png",
    emoji: "🦄",
    bgColor: "bg-[#FF007A]",
    textColor: "text-white",
  },
  {
    name: "Optimism",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/optimism-ethereum-op-logo-32auscMZlU66q7f5SmsGJlDKclfkyF.png",
    emoji: "⭕",
    bgColor: "bg-[#FF0420]",
    textColor: "text-white",
  },
  {
    name: "Arbitrum",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/arbitrum-arb-logo-PkhMXnq7LLYYa3mCJ0EcKZF2GOP8G9.png",
    emoji: "🔵",
    bgColor: "bg-[#213147]",
    textColor: "text-white",
  },
  {
    name: "dYdX",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dydx-chain-dydx-logo-IOus9KbWVw9CXpy8A7R9iCaKrqeydy.png",
    emoji: "📊",
    bgColor: "bg-[#1C1C28]",
    textColor: "text-white",
  },
  {
    name: "1inch",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1inch-1inch-logo-lL6pYcBDAqAUkEV1J9JpBR19nSDbqH.png",
    emoji: "🦄",
    bgColor: "bg-[#1B314F]",
    textColor: "text-white",
  },
]

interface CardType {
  id: number
  airdropIndex: number
  isFlipped: boolean
  isMatched: boolean
}

interface StepFourProps {
  onComplete: () => void
}

export default function StepFour({ onComplete }: StepFourProps) {
  const [cards, setCards] = useState<CardType[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [matchedPairs, setMatchedPairs] = useState(0)

  useEffect(() => {
    resetGame()
  }, [])

  useEffect(() => {
    if (matchedPairs === airdrops.length) {
      onComplete()
    }
  }, [matchedPairs, onComplete])

  const resetGame = () => {
    const shuffledAirdrops = [...Array(airdrops.length).keys(), ...Array(airdrops.length).keys()]
      .sort(() => Math.random() - 0.5)
      .map((airdropIndex, id) => ({
        id,
        airdropIndex,
        isFlipped: false,
        isMatched: false,
      }))
    setCards(shuffledAirdrops)
    setFlippedCards([])
    setMoves(0)
    setMatchedPairs(0)
  }

  const handleCardClick = (id: number) => {
    if (flippedCards.length === 2) return
    if (cards[id].isMatched) return

    const newCards = [...cards]
    newCards[id].isFlipped = true
    setCards(newCards)

    setFlippedCards([...flippedCards, id])

    if (flippedCards.length === 1) {
      setMoves(moves + 1)
      if (cards[flippedCards[0]].airdropIndex === newCards[id].airdropIndex) {
        newCards[flippedCards[0]].isMatched = true
        newCards[id].isMatched = true
        setCards(newCards)
        setMatchedPairs(matchedPairs + 1)
        setFlippedCards([])
      } else {
        setTimeout(() => {
          newCards[flippedCards[0]].isFlipped = false
          newCards[id].isFlipped = false
          setCards(newCards)
          setFlippedCards([])
        }, 1000)
      }
    }
  }

  return (
    <div className="container mx-auto p-4 text-purple-900 font-mono">
      <h1 className="text-3xl font-bold mb-4 text-center">Telegram Airdrops Memory Game - Step 4</h1>
      <div className="mb-4 flex justify-between items-center">
        <p className="text-lg">Moves: {moves}</p>
        <p className="text-lg">
          Matched Pairs: {matchedPairs}/{airdrops.length}
        </p>
        <Button onClick={resetGame} className="bg-purple-500 hover:bg-purple-600 text-white">
          Reset Game
        </Button>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {cards.map((card) => (
          <Card
            key={card.id}
            className={`h-32 flex items-center justify-center cursor-pointer transition-all duration-300 overflow-hidden rounded-lg ${
              card.isFlipped
                ? `${airdrops[card.airdropIndex].bgColor} ${airdrops[card.airdropIndex].textColor}`
                : "bg-purple-400 hover:bg-purple-500"
            }`}
            onClick={() => handleCardClick(card.id)}
          >
            {card.isFlipped ? (
              <div className="flex flex-col items-center gap-2 p-2">
                <div className="relative w-16 h-16">
                  <Image
                    src={airdrops[card.airdropIndex].image || "/placeholder.svg"}
                    alt={airdrops[card.airdropIndex].name}
                    fill
                    className="object-contain drop-shadow-md"
                    priority
                  />
                </div>
                <span className="text-xs font-medium text-center">{airdrops[card.airdropIndex].name}</span>
              </div>
            ) : (
              <span className="text-4xl text-white">❓</span>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}

