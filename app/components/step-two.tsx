"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Sparkles, Star, Heart, Sun, Moon, Cloud, Rainbow, Zap } from "lucide-react"

const icons = [
  { icon: Sparkles, color: "text-yellow-400" },
  { icon: Star, color: "text-purple-500" },
  { icon: Heart, color: "text-red-500" },
  { icon: Sun, color: "text-orange-500" },
  { icon: Moon, color: "text-indigo-500" },
  { icon: Cloud, color: "text-blue-400" },
  { icon: Rainbow, color: "text-pink-500" },
  { icon: Zap, color: "text-green-500" },
]

interface CardType {
  id: number
  iconIndex: number
  isFlipped: boolean
  isMatched: boolean
}

interface StepTwoProps {
  onComplete: () => void
}

export default function StepTwo({ onComplete }: StepTwoProps) {
  const [cards, setCards] = useState<CardType[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [matchedPairs, setMatchedPairs] = useState(0)

  useEffect(() => {
    resetGame()
  }, [])

  useEffect(() => {
    if (matchedPairs === icons.length) {
      onComplete()
    }
  }, [matchedPairs, onComplete])

  const resetGame = () => {
    const shuffledIcons = [...Array(icons.length).keys(), ...Array(icons.length).keys()]
      .sort(() => Math.random() - 0.5)
      .map((iconIndex, id) => ({
        id,
        iconIndex,
        isFlipped: false,
        isMatched: false,
      }))
    setCards(shuffledIcons)
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
      if (cards[flippedCards[0]].iconIndex === newCards[id].iconIndex) {
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
    <div className="container mx-auto p-4 text-gray-800">
      <h1 className="text-3xl font-bold mb-4 text-center text-sky-800">Colorful Icon Memory Game - Step 2</h1>
      <div className="mb-4 flex justify-between items-center">
        <p className="text-lg">Moves: {moves}</p>
        <p className="text-lg">
          Matched Pairs: {matchedPairs}/{icons.length}
        </p>
        <Button onClick={resetGame} className="bg-sky-500 hover:bg-sky-600 text-white">
          Reset Game
        </Button>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {cards.map((card) => {
          const IconComponent = icons[card.iconIndex].icon
          return (
            <Card
              key={card.id}
              className={`h-24 flex items-center justify-center text-4xl cursor-pointer transition-all duration-300 rounded-lg ${
                card.isFlipped ? "bg-white" : "bg-sky-300"
              }`}
              onClick={() => handleCardClick(card.id)}
            >
              {card.isFlipped ? <IconComponent className={`w-12 h-12 ${icons[card.iconIndex].color}`} /> : "❓"}
            </Card>
          )
        })}
      </div>
    </div>
  )
}

