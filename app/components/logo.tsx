export default function Logo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="50" cy="50" r="45" fill="#FFB627" />
      <path
        d="M35 40C35 36.6863 37.6863 34 41 34C44.3137 34 47 36.6863 47 40C47 43.3137 44.3137 46 41 46C37.6863 46 35 43.3137 35 40Z"
        fill="#4B3621"
      />
      <path
        d="M53 40C53 36.6863 55.6863 34 59 34C62.3137 34 65 36.6863 65 40C65 43.3137 62.3137 46 59 46C55.6863 46 53 43.3137 53 40Z"
        fill="#4B3621"
      />
      <path
        d="M50 52C44.4772 52 40 56.4772 40 62C40 67.5228 44.4772 72 50 72C55.5228 72 60 67.5228 60 62C60 56.4772 55.5228 52 50 52Z"
        fill="#4B3621"
      />
      <path d="M30 25L40 35M70 25L60 35" stroke="#4B3621" strokeWidth="4" strokeLinecap="round" />
      <path d="M50 15L50 25" stroke="#4B3621" strokeWidth="4" strokeLinecap="round" />
      <path d="M45 20L55 20" stroke="#4B3621" strokeWidth="4" strokeLinecap="round" />
    </svg>
  )
}

