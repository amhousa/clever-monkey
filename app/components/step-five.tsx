"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Image from "next/image"

const presidents = [
  {
    name: "George Washington",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/b/b6/Gilbert_Stuart_Williamstown_Portrait_of_George_Washington.jpg",
  },
  {
    name: "Abraham Lincoln",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/ab/Abraham_Lincoln_O-77_matte_collodion_print.jpg",
  },
  {
    name: "Franklin D. Roosevelt",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/42/FDR_1944_Color_Portrait.jpg",
  },
  {
    name: "John F. Kennedy",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/c/c3/John_F._Kennedy%2C_White_House_color_photo_portrait.jpg",
  },
  {
    name: "Ronald Reagan",
    image: "https://upload.wikimedia.org/wikipedia/commons/1/16/Official_Portrait_of_President_Reagan_1981.jpg",
  },
  { name: "Barack Obama", image: "https://upload.wikimedia.org/wikipedia/commons/8/8d/President_Barack_Obama.jpg" },
]

interface CardType {
  id: number
  presidentIndex: number
  isFlipped: boolean
  isMatched: boolean
}

interface StepFiveProps {
  onComplete: () => void
}

export default function StepFive({ onComplete }: StepFiveProps) {
  const [cards, setCards] = useState<CardType[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [matchedPairs, setMatchedPairs] = useState(0)

  useEffect(() => {
    resetGame()
  }, [])

  useEffect(() => {
    if (matchedPairs === presidents.length) {
      onComplete()
    }
  }, [matchedPairs, onComplete])

  const resetGame = () => {
    const shuffledPresidents = [...Array(presidents.length).keys(), ...Array(presidents.length).keys()]
      .sort(() => Math.random() - 0.5)
      .map((presidentIndex, id) => ({
        id,
        presidentIndex,
        isFlipped: false,
        isMatched: false,
      }))
    setCards(shuffledPresidents)
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
      if (cards[flippedCards[0]].presidentIndex === newCards[id].presidentIndex) {
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
    <div className="container mx-auto p-4 text-blue-900 font-serif">
      <h1 className="text-3xl font-bold mb-4 text-center">U.S. Presidents Memory Game - Step 5</h1>
      <div className="mb-4 flex justify-between items-center">
        <p className="text-lg">Moves: {moves}</p>
        <p className="text-lg">
          Matched Pairs: {matchedPairs}/{presidents.length}
        </p>
        <Button onClick={resetGame} className="bg-blue-500 hover:bg-blue-600 text-white">
          Reset Game
        </Button>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {cards.map((card) => (
          <Card
            key={card.id}
            className={`h-32 flex items-center justify-center cursor-pointer transition-all duration-300 rounded-lg ${
              card.isFlipped ? "bg-blue-200" : "bg-blue-400"
            }`}
            onClick={() => handleCardClick(card.id)}
          >
            {card.isFlipped ? (
              <div className="flex flex-col items-center">
                <Image
                  src={presidents[card.presidentIndex].image || "/placeholder.svg"}
                  alt={presidents[card.presidentIndex].name}
                  width={80}
                  height={100}
                  className="object-cover rounded"
                />
                <span className="text-xs mt-1 text-center">{presidents[card.presidentIndex].name}</span>
              </div>
            ) : (
              <span className="text-4xl">🇺🇸</span>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}

