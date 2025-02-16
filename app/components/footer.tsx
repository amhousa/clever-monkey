import { Heart, Coffee } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 text-xs py-2 px-4 relative z-50">
      <p className="text-center">
        Designed and implemented by:{" "}
        <Link href="https://amirsalmani.com" target="_blank" className="hover:text-gray-100 transition-colors">
          Amirhossein Salmani
        </Link>{" "}
        with <Heart className="inline-block w-3 h-3 mx-1" /> and <Coffee className="inline-block w-3 h-3 mx-1" /> + AI
      </p>
    </footer>
  )
}

