"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import StepOne from "@/app/components/step-one"
import StepTwo from "@/app/components/step-two"
import StepThree from "@/app/components/step-three"
import StepFour from "@/app/components/step-four"
import StepFive from "@/app/components/step-five"
import StepSix from "@/app/components/step-six"
import StepSeven from "@/app/components/step-seven"
import StepEight from "@/app/components/step-eight"
import StepNine from "@/app/components/step-nine"
import StepTen from "@/app/components/step-ten"
import Logo from "@/app/components/logo"
import { WelcomeModal } from "@/app/components/welcome-modal"
import { Analytics } from "@vercel/analytics/react"

const CHEAT_CODE = "amhousa"

export default function EmojiGamePage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [cheatCode, setCheatCode] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [])

  const handleCheatCodeActivated = useCallback(() => {
    console.log("Cheat code activated!") // Debug log
    const nextStep = Math.min(currentStep + 1, 10)
    console.log("Advancing to step:", nextStep) // Debug log
    handleStepComplete(nextStep)
  }, [currentStep])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      setCheatCode((prevCode) => {
        const newCode = (prevCode + event.key).toLowerCase().slice(-7)
        console.log("Current cheat code:", newCode) // Debug log
        if (newCode === CHEAT_CODE) {
          handleCheatCodeActivated()
          return ""
        }
        return newCode
      })
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [handleCheatCodeActivated])

  const handleStepComplete = (nextStep: number) => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setCurrentStep(nextStep)
      if (containerRef.current) {
        containerRef.current.style.transform = `translateY(-${(nextStep - 1) * 100}vh)`
      }
    }, 2000)
  }

  const handleRestart = () => {
    setCurrentStep(1)
    setCheatCode("")
    if (containerRef.current) {
      containerRef.current.style.transform = "translateY(0)"
    }
  }

  const getBackgroundColor = (step: number) => {
    switch (step) {
      case 1:
        return "bg-[#0f0f0f]"
      case 2:
        return "bg-sky-200"
      case 3:
        return "bg-emerald-100"
      case 4:
        return "bg-purple-100"
      case 5:
        return "bg-blue-100"
      case 6:
        return "bg-green-100"
      case 7:
        return "bg-orange-100"
      case 8:
        return "bg-pink-100"
      case 9:
        return "bg-yellow-100"
      case 10:
        return "bg-red-100"
      default:
        return "bg-gray-100"
    }
  }

  const renderStep = (step: number) => {
    switch (step) {
      case 1:
        return <StepOne onComplete={() => handleStepComplete(2)} />
      case 2:
        return <StepTwo onComplete={() => handleStepComplete(3)} />
      case 3:
        return <StepThree onComplete={() => handleStepComplete(4)} />
      case 4:
        return <StepFour onComplete={() => handleStepComplete(5)} />
      case 5:
        return <StepFive onComplete={() => handleStepComplete(6)} />
      case 6:
        return <StepSix onComplete={() => handleStepComplete(7)} />
      case 7:
        return <StepSeven onComplete={() => handleStepComplete(8)} />
      case 8:
        return <StepEight onComplete={() => handleStepComplete(9)} />
      case 9:
        return <StepNine onComplete={() => handleStepComplete(10)} />
      case 10:
        return null // We'll render StepTen separately
      default:
        return null
    }
  }

  return (
    <div className="overflow-hidden">
      <WelcomeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <div className="fixed top-2 left-2 z-50 flex items-center gap-1">
        <Logo className="w-6 h-6" />
        <h1 className="text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-orange-600">
          CleverMonkey
        </h1>
      </div>
      <div ref={containerRef} className="transition-transform duration-1000 ease-in-out" style={{ height: "1000vh" }}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((step) => (
          <div key={step} className={`h-screen w-full flex items-center justify-center ${getBackgroundColor(step)}`}>
            {isLoading && currentStep === step ? (
              <div className="text-4xl font-bold text-gray-800 animate-pulse">Loading Next Stage...</div>
            ) : (
              renderStep(step)
            )}
          </div>
        ))}
      </div>
      <StepTen onRestart={handleRestart} isVisible={currentStep === 10} />
      <Analytics/>
    </div>
  )
}

