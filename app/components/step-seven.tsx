"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const questions = [
  { question: "What is the current value of Bitcoin?", answer: "Varies, check latest price" },
  { question: "What is the website address of this game?", answer: "Current URL of the game" },
  { question: "Who is the singer of 'Bohemian Rhapsody'?", answer: "Freddie Mercury" },
  { question: "Who created Linux?", answer: "Linus Torvalds" },
  { question: "What year was the first iPhone released?", answer: "2007" },
  { question: "Who painted the Mona Lisa?", answer: "Leonardo da Vinci" },
]

interface CardType {
  id: number
  questionIndex: number
  isQuestion: boolean
  isFlipped: boolean
  isMatched: boolean
}

interface StepSevenProps {
  onComplete: () => void
}

export default function StepSeven({ onComplete }: StepSevenProps) {
  const [cards, setCards] = useState<CardType[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [matchedPairs, setMatchedPairs] = useState(0)

  useEffect(() => {
    resetGame()
  }, [])

  useEffect(() => {
    if (matchedPairs === questions.length) {
      onComplete()
    }
  }, [matchedPairs, onComplete])

  const resetGame = () => {
    const shuffledCards = [
      ...questions.map((_, index) => ({ questionIndex: index, isQuestion: true })),
      ...questions.map((_, index) => ({ questionIndex: index, isQuestion: false })),
    ]
      .sort(() => Math.random() - 0.5)
      .map((card, id) => ({
        ...card,
        id,
        isFlipped: false,
        isMatched: false,
      }))
    setCards(shuffledCards)
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
      const firstCard = cards[flippedCards[0]]
      const secondCard = newCards[id]
      if (firstCard.questionIndex === secondCard.questionIndex && firstCard.isQuestion !== secondCard.isQuestion) {
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
    <div className="container mx-auto p-4 text-orange-900 font-sans">
      <h1 className="text-3xl font-bold mb-4 text-center">Q&A Memory Game - Step 7</h1>
      <div className="mb-4 flex justify-between items-center">
        <p className="text-lg">Moves: {moves}</p>
        <p className="text-lg">
          Matched Pairs: {matchedPairs}/{questions.length}
        </p>
        <Button onClick={resetGame} className="bg-orange-500 hover:bg-orange-600 text-white">
          Reset Game
        </Button>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {cards.map((card) => (
          <Card
            key={card.id}
            className={`h-32 flex items-center justify-center cursor-pointer transition-all duration-300 rounded-lg ${
              card.isFlipped ? "bg-orange-200" : "bg-orange-400"
            }`}
            onClick={() => handleCardClick(card.id)}
          >
            {card.isFlipped ? (
              <p className="text-sm p-2 text-center">
                {card.isQuestion ? questions[card.questionIndex].question : questions[card.questionIndex].answer}
              </p>
            ) : (
              <span className="text-4xl">{card.isQuestion ? "❓" : "❗"}</span>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}

