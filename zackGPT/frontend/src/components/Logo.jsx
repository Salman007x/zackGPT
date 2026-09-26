export default function Logo({ className = 'h-10 w-10' }) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <linearGradient id="zackgpt-grad" x1="4" y1="4" x2="60" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#c084fc" />
          <stop offset="0.55" stopColor="#8b3bff" />
          <stop offset="1" stopColor="#4f14d1" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="17" fill="url(#zackgpt-grad)" />
      <path
        d="M20 20.5H44L23.5 43.5H44"
        fill="none"
        stroke="#fff"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="47.5" cy="17.5" r="3" fill="#47bfff" />
    </svg>
  )
}
