export function Divider({ className = '' }) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`}>
      <span className="gold-line w-16 md:w-28" />
      <svg
        width="46"
        height="24"
        viewBox="0 0 46 24"
        fill="none"
        className="text-gold"
        aria-hidden="true"
      >
        <path
          d="M23 2c3 5 8 5 11 3-2 4-2 8 3 10-5 1-8 4-8 7-1-4-4-6-6-6s-5 2-6 6c0-3-3-6-8-7 5-2 5-6 3-10 3 2 8 2 11-3z"
          fill="currentColor"
          opacity="0.9"
        />
        <circle cx="23" cy="12" r="2.4" fill="#3B0A16" />
      </svg>
      <span className="gold-line w-16 md:w-28" />
    </div>
  )
}

export function Sparkle({ className = '' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 0l2.2 7.6L22 10l-7.8 2.4L12 20l-2.2-7.6L2 10l7.8-2.4z"
        fill="currentColor"
      />
    </svg>
  )
}
