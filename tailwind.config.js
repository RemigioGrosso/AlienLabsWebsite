/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        retro: {
          primary: '#00ff88',     // Vibrant green
          secondary: '#004e89',   // Deep blue
          accent: '#ffd23f',      // Bright yellow
          dark: '#1a1a2e',        // Dark purple-blue
          light: '#f7f7f7',       // Off-white
        },
        win95: {
          gray: '#c0c0c0',        // Classic Windows gray
          darkgray: '#808080',    // Dark gray for shadows
          lightgray: '#dfdfdf',   // Light gray for highlights
          blue: '#000080',        // Windows blue
          desktop: '#1E201E',     // Dark charcoal desktop
          black: '#1E201E',       // Dark charcoal
          white: '#ECDFCC',       // Warm cream
          green: '#697565',       // Sage green accent
          darkgreen: '#3C3D37',   // Dark olive
          lightgreen: '#ECDFCC',  // Light cream
        },
        earthy: {
          darkest: '#1E201E',     // Dark charcoal
          dark: '#3C3D37',        // Dark olive
          medium: '#000000',      // Black (was sage green)
          light: '#ECDFCC',       // Warm cream
        },
      },
      backgroundImage: {
        'retro-gradient': 'linear-gradient(135deg, #00ff88, #ffd23f)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'win95-button': 'linear-gradient(135deg, #dfdfdf 0%, #c0c0c0 45%, #808080 100%)',
        'win95-inset': 'linear-gradient(135deg, #808080 0%, #c0c0c0 45%, #dfdfdf 100%)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'green-glow': 'radial-gradient(circle, rgba(0, 255, 0, 0.3) 0%, transparent 70%)',
      },
      fontFamily: {
        'retro-display': ['var(--font-space-mono)', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
        'retro-body': ['var(--font-inter)', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif'],
        'win95': ['MS Sans Serif', 'sans-serif'],
        'win95-mono': ['MS Gothic', 'Courier New', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
      },
      boxShadow: {
        'retro': '0 0 20px rgba(0, 255, 136, 0.3)',
        'retro-accent': '0 0 20px rgba(255, 210, 63, 0.3)',
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          /* IE and Edge */
          '-ms-overflow-style': 'none',
          /* Firefox */
          'scrollbar-width': 'none',
          /* Safari and Chrome */
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        }
      })
    }
  ],
}