"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const currencies = [
  { name: "Bitcoin", symbol: "₿" },
  { name: "Ethereum", symbol: "Ξ" },
  { name: "US Dollar", symbol: "$" },
  { name: "Euro", symbol: "€" },
  { name: "Japanese Yen", symbol: "¥" },
  { name: "British Pound", symbol: "£" },
]

interface CardType {
  id: number
  currencyIndex: number
  isFlipped: boolean
  isMatched: boolean
}

interface StepSixProps {
  onComplete: () => void
}

export default function StepSix({ onComplete }: StepSixProps) {
  const [cards, setCards] = useState<CardType[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [matchedPairs, setMatchedPairs] = useState(0)

  useEffect(() => {
    resetGame()
  }, [])

  useEffect(() => {
    if (matchedPairs === currencies.length) {
      onComplete()
    }
  }, [matchedPairs, onComplete])

  const resetGame = () => {
    const shuffledCurrencies = [...Array(currencies.length).keys(), ...Array(currencies.length).keys()]
      .sort(() => Math.random() - 0.5)
      .map((currencyIndex, id) => ({
        id,
        currencyIndex,
        isFlipped: false,
        isMatched: false,
      }))
    setCards(shuffledCurrencies)
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
      if (cards[flippedCards[0]].currencyIndex === newCards[id].currencyIndex) {
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
    <div className="container mx-auto p-4 text-green-900 font-sans">
      <h1 className="text-3xl font-bold mb-4 text-center">Popular Currencies Memory Game - Step 6</h1>
      <div className="mb-4 flex justify-between items-center">
        <p className="text-lg">Moves: {moves}</p>
        <p className="text-lg">
          Matched Pairs: {matchedPairs}/{currencies.length}
        </p>
        <Button onClick={resetGame} className="bg-green-500 hover:bg-green-600 text-white">
          Reset Game
        </Button>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {cards.map((card) => (
          <Card
            key={card.id}
            className={`h-24 flex items-center justify-center cursor-pointer transition-all duration-300 rounded-lg ${
              card.isFlipped ? "bg-green-200" : "bg-green-400"
            }`}
            onClick={() => handleCardClick(card.id)}
          >
            {card.isFlipped ? (
              <div className="flex flex-col items-center">
                <span className="text-4xl">{currencies[card.currencyIndex].symbol}</span>
                <span className="text-xs mt-1">{currencies[card.currencyIndex].name}</span>
              </div>
            ) : (
              <span className="text-4xl">💰</span>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}

