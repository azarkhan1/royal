/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          green: '#22C55E',
          blue: '#3B82F6',
        },
        background: {
          light: '#F9FAFB',
          white: '#FFFFFF',
        },
        text: {
          dark: '#111827',
          gray: '#4B5563',
        },
        accent: {
          light: '#F3F4F6',
          medium: '#E5E7EB',
        },
        dark: {
          bg: '#111827',
          card: '#1F2937',
          border: '#374151',
          text: '#F9FAFB',
          textSecondary: '#D1D5DB',
        }
      },
      fontFamily: {
        sans: ['IRANSans', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '4': '4px',
        '8': '8px',
        '16': '16px',
        '24': '24px',
        '32': '32px',
        '48': '48px',
        '64': '64px',
      },
      screens: {
        'mobile': '320px',
        'tablet': '768px',
        'desktop': '1024px',
      },
    },
  },
  plugins: [],
}

