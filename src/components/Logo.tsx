export function LogoMark({ className = 'h-9 w-9' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="64" height="64" rx="14" fill="#0B1220" />
      <path
        d="M18 44c0-10 6-16 14-20 4-2 8-3 12-2"
        stroke="#1E3A5F"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <path
        d="M22 20c8 2 14 8 16 18 1 5 0 10-3 14"
        stroke="#0D9488"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <path
        d="M38 18c6 4 10 12 9 22"
        stroke="#F59E0B"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.95"
      />
    </svg>
  )
}

export function LogoWordmark({ className = '' }: { className?: string }) {
  return (
    <a href="#top" className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark />
      <span className="font-display text-xl font-bold tracking-tight text-fg">
        جدل
      </span>
    </a>
  )
}
