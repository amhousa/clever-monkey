"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Image from "next/image"

const countries = [
  { name: "America", flag: "/flags/usa.svg" },
  { name: "Netherlands", flag: "/flags/netherlands.svg" },
  { name: "Iran", flag: "/flags/iran.svg" },
  { name: "Finland", flag: "/flags/finland.svg" },
  { name: "Germany", flag: "/flags/germany.svg" },
  { name: "Nigeria", flag: "/flags/nigeria.svg" },
]

interface CardType {
  id: number
  countryIndex: number
  isFlipped: boolean
  isMatched: boolean
}

interface StepThreeProps {
  onComplete: () => void
}

export default function StepThree({ onComplete }: StepThreeProps) {
  const [cards, setCards] = useState<CardType[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [matchedPairs, setMatchedPairs] = useState(0)

  useEffect(() => {
    resetGame()
  }, [])

  const resetGame = () => {
    const shuffledCountries = [...Array(countries.length).keys(), ...Array(countries.length).keys()]
      .sort(() => Math.random() - 0.5)
      .map((countryIndex, id) => ({
        id,
        countryIndex,
        isFlipped: false,
        isMatched: false,
      }))
    setCards(shuffledCountries)
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
      if (cards[flippedCards[0]].countryIndex === newCards[id].countryIndex) {
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

  useEffect(() => {
    if (matchedPairs === countries.length) {
      onComplete()
    }
  }, [matchedPairs, onComplete])

  return (
    <div className="container mx-auto p-4 text-gray-800">
      <h1 className="text-3xl font-bold mb-4 text-center text-emerald-800">Country Flag Memory Game - Step 3</h1>
      <div className="mb-4 flex justify-between items-center">
        <p className="text-lg">Moves: {moves}</p>
        <p className="text-lg">
          Matched Pairs: {matchedPairs}/{countries.length}
        </p>
        <Button onClick={resetGame} className="bg-emerald-500 hover:bg-emerald-600 text-white">
          Reset Game
        </Button>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {cards.map((card) => (
          <Card
            key={card.id}
            className={`h-24 flex items-center justify-center cursor-pointer transition-all duration-300 rounded-lg ${
              card.isFlipped ? "bg-white" : "bg-emerald-200"
            }`}
            onClick={() => handleCardClick(card.id)}
          >
            {card.isFlipped ? (
              <div className="flex flex-col items-center">
                <Image
                  src={countries[card.countryIndex].flag || "/placeholder.svg"}
                  alt={countries[card.countryIndex].name}
                  width={80}
                  height={48}
                  className="object-contain"
                />
                <span className="text-xs mt-1">{countries[card.countryIndex].name}</span>
              </div>
            ) : (
              <span className="text-4xl">🌍</span>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}

