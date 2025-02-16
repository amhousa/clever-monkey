"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const animals = [
  { name: "Lion", emoji: "🦁" },
  { name: "Elephant", emoji: "🐘" },
  { name: "Giraffe", emoji: "🦒" },
  { name: "Penguin", emoji: "🐧" },
  { name: "Koala", emoji: "🐨" },
  { name: "Octopus", emoji: "🐙" },
]

interface CardType {
  id: number
  animalIndex: number
  isFlipped: boolean
  isMatched: boolean
}

interface StepEightProps {
  onComplete: () => void
}

export default function StepEight({ onComplete }: StepEightProps) {
  const [cards, setCards] = useState<CardType[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [matchedPairs, setMatchedPairs] = useState(0)

  useEffect(() => {
    resetGame()
  }, [])

  useEffect(() => {
    if (matchedPairs === animals.length) {
      onComplete()
    }
  }, [matchedPairs, onComplete])

  const resetGame = () => {
    const shuffledAnimals = [...Array(animals.length).keys(), ...Array(animals.length).keys()]
      .sort(() => Math.random() - 0.5)
      .map((animalIndex, id) => ({
        id,
        animalIndex,
        isFlipped: false,
        isMatched: false,
      }))
    setCards(shuffledAnimals)
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
      if (cards[flippedCards[0]].animalIndex === newCards[id].animalIndex) {
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
    <div className="container mx-auto p-4 text-pink-900 font-sans">
      <h1 className="text-3xl font-bold mb-4 text-center">Colorful Animals Memory Game - Step 8</h1>
      <div className="mb-4 flex justify-between items-center">
        <p className="text-lg">Moves: {moves}</p>
        <p className="text-lg">
          Matched Pairs: {matchedPairs}/{animals.length}
        </p>
        <Button onClick={resetGame} className="bg-pink-500 hover:bg-pink-600 text-white">
          Reset Game
        </Button>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {cards.map((card) => (
          <Card
            key={card.id}
            className={`h-24 flex items-center justify-center cursor-pointer transition-all duration-300 rounded-lg ${
              card.isFlipped ? "bg-pink-200" : "bg-pink-400"
            }`}
            onClick={() => handleCardClick(card.id)}
          >
            {card.isFlipped ? (
              <div className="flex flex-col items-center">
                <span className="text-6xl">{animals[card.animalIndex].emoji}</span>
                <span className="text-xs mt-1">{animals[card.animalIndex].name}</span>
              </div>
            ) : (
              <span className="text-4xl">🎨</span>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}

