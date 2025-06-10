export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff8f1',
          100: '#ffecd9',
          200: '#ffd4ad',
          300: '#ffb677',
          400: '#ff9741',
          500: '#ff7e1d',
          600: '#f96200',
          700: '#cc4d00',
          800: '#a23d00',
          900: '#853400',
        },
        secondary: {
          50: '#edfcfc',
          100: '#d2f7f8',
          200: '#aaeef1',
          300: '#70e1e6',
          400: '#39ccd4',
          500: '#0ab3b8',
          600: '#0a8f94',
          700: '#0e7277',
          800: '#115c60',
          900: '#134c4f',
        },
        accent: {
          50: '#f5f2ff',
          100: '#ece5ff',
          200: '#dacefd',
          300: '#c1adfc',
          400: '#a884f9',
          500: '#8a4fff',
          600: '#7c32f5',
          700: '#6823db',
          800: '#561eb2',
          900: '#481c91',
        },
        success: {
          500: '#22C55E',
        },
        warning: {
          500: '#F59E0B',
        },
        error: {
          500: '#EF4444',
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      spacing: {
        '0.5': '4px',
        '1': '8px',
        '1.5': '12px',
        '2': '16px',
        '2.5': '20px',
        '3': '24px',
        '4': '32px',
        '5': '40px',
        '6': '48px',
        '7': '56px',
        '8': '64px',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
        'fade-in': 'fadeIn 0.5s ease-in',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}