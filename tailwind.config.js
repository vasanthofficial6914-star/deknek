/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-dark': '#020617',
        'bg-card': 'rgba(15, 23, 42, 0.6)',
        'neon-blue': '#0ea5e9',
        'neon-cyan': '#22d3ee',
        'neon-purple': '#a855f7',
        'neon-green': '#22c55e',
        'neon-red': '#ef4444',
        'neon-yellow': '#eab308',
        'secondary': '#94a3b8',
        'glass-border': 'rgba(255, 255, 255, 0.05)',
      },
      fontFamily: {
        'outfit': ['Outfit', 'Space Grotesk', 'system-ui', 'sans-serif'],
      },
      backdropBlur: {
        md: '16px',
      },
      animation: {
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ping': 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
        'spin': 'spin 1s linear infinite',
      },
    },
  },
  plugins: [],
  safelist: [
    { pattern: /neon-text-(blue|purple|green|red|cyan|yellow|secondary)/ },
    { pattern: /text-(neon-blue|neon-cyan|neon-purple|neon-green|neon-red|neon-yellow|secondary)/ },
    { pattern: /bg-(neon-blue|neon-cyan|neon-purple|neon-green|neon-red|neon-yellow|bg-dark|bg-card)/ },
    { pattern: /border-(neon-blue|neon-cyan|neon-purple|neon-green|neon-red|neon-yellow|glass-border)/ },
    { pattern: /shadow-\[.+\]/ },
    { pattern: /col-span-(1|2|3|4|5|6|7|8|9|10|11|12)/ },
    { pattern: /grid-cols-(1|2|3|4|6|12)/ },
    { pattern: /md:(col-span|grid-cols|flex-row)-.+/ },
    { pattern: /lg:(col-span|grid-cols|flex|grid)-.+/ },
    { pattern: /from-(neon-blue|neon-cyan|neon-purple|neon-green|neon-red)\/\d+/ },
    { pattern: /to-(neon-blue|neon-cyan|neon-purple|neon-green|neon-red)\/\d+/ },
    { pattern: /(bg|border|text)-(neon-blue|neon-cyan|neon-purple|neon-green|neon-red|neon-yellow)\/\d+/ },
  ],
}
