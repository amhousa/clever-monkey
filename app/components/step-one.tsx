"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const emojis = ["😀", "😎", "🚀", "🌈", "🍕", "🎉", "🐱", "🦄"]

interface CardType {
  id: number
  emoji: string
  isFlipped: boolean
  isMatched: boolean
}

interface StepOneProps {
  onComplete: () => void
}

export default function StepOne({ onComplete }: StepOneProps) {
  const [cards, setCards] = useState<CardType[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [matchedPairs, setMatchedPairs] = useState(0)

  useEffect(() => {
    resetGame()
  }, [])

  useEffect(() => {
    if (matchedPairs === emojis.length) {
      onComplete()
    }
  }, [matchedPairs, onComplete])

  const resetGame = () => {
    const shuffledEmojis = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false,
      }))
    setCards(shuffledEmojis)
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
      if (cards[flippedCards[0]].emoji === newCards[id].emoji) {
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
    <div className="container mx-auto p-4 text-gray-300">
      <h1 className="text-3xl font-bold mb-4 text-center text-gray-100">Emoji Memory Game - Step 1</h1>
      <div className="mb-4 flex justify-between items-center">
        <p className="text-lg">Moves: {moves}</p>
        <p className="text-lg">
          Matched Pairs: {matchedPairs}/{emojis.length}
        </p>
        <Button onClick={resetGame} className="bg-gray-800 hover:bg-gray-700 text-gray-300">
          Reset Game
        </Button>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {cards.map((card) => (
          <Card
            key={card.id}
            className={`h-24 flex items-center justify-center text-4xl cursor-pointer transition-all duration-300 rounded-lg ${
              card.isFlipped ? "bg-gray-700 text-gray-100" : "bg-gray-800 text-gray-400"
            }`}
            onClick={() => handleCardClick(card.id)}
          >
            {card.isFlipped ? card.emoji : "?"}
          </Card>
        ))}
      </div>
    </div>
  )
}

