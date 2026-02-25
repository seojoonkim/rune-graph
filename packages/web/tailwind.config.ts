import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        obsidian: '#0A0A0F',
        slate: '#13131A',
        ash: '#2A2A35',
        moonlight: '#E2E2E8',
        purple: {
          DEFAULT: '#8B5CF6',
          dim: '#6D28D9',
          glow: '#A78BFA',
        },
        gold: '#F59E0B',
        verdant: '#10B981',
        frost: '#3B82F6',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Menlo', 'monospace'],
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'flow': 'flow 2s linear infinite',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 8px rgba(139,92,246,0.4)' },
          '50%': { boxShadow: '0 0 20px rgba(139,92,246,0.8)' },
        },
        'flow': {
          '0%': { strokeDashoffset: '24' },
          '100%': { strokeDashoffset: '0' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
export default config
