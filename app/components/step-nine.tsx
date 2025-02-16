"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

interface Question {
  question: string
  answer: number
}

interface StepNineProps {
  onComplete: () => void
}

export default function StepNine({ onComplete }: StepNineProps) {
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswer, setUserAnswer] = useState("")
  const [score, setScore] = useState(0)

  useEffect(() => {
    generateQuestions()
  }, [])

  const generateQuestions = () => {
    const newQuestions: Question[] = []
    for (let i = 0; i < 5; i++) {
      const num1 = Math.floor(Math.random() * 90) + 10
      const num2 = Math.floor(Math.random() * 9) + 1
      const operation = ["+", "-", "*", "/"][Math.floor(Math.random() * 4)]
      let question: string
      let answer: number

      switch (operation) {
        case "+":
          question = `${num1} + ${num2} = ?`
          answer = num1 + num2
          break
        case "-":
          question = `${num1} - ${num2} = ?`
          answer = num1 - num2
          break
        case "*":
          question = `${num1} × ${num2} = ?`
          answer = num1 * num2
          break
        case "/":
          question = `${num1 * num2} ÷ ${num2} = ?`
          answer = num1
          break
        default:
          question = ""
          answer = 0
      }

      newQuestions.push({ question, answer })
    }
    setQuestions(newQuestions)
  }

  const handleSubmit = () => {
    if (Number(userAnswer) === questions[currentQuestionIndex].answer) {
      setScore(score + 1)
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setUserAnswer("")
    } else {
      onComplete()
    }
  }

  return (
    <div className="container mx-auto p-4 text-gray-800 font-sans">
      <h1 className="text-3xl font-bold mb-4 text-center">Math Challenge - Step 9</h1>
      <Card className="p-6 bg-white rounded-lg">
        <p className="text-2xl mb-4 text-center">{questions[currentQuestionIndex]?.question}</p>
        <div className="flex justify-center items-center space-x-4">
          <Input
            type="number"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            className="w-24 text-center text-xl"
          />
          <Button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-600 text-white">
            Submit
          </Button>
        </div>
        <p className="mt-4 text-center">
          Score: {score} / {currentQuestionIndex + 1}
        </p>
      </Card>
    </div>
  )
}

