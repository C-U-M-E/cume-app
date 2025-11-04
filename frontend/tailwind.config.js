/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Cores customizadas do projeto
      colors: {
        amber: {
          50: 'rgba(255, 246, 216, 1)',
          100: 'rgba(255, 236, 179, 1)',
          200: 'rgba(255, 224, 130, 1)',
          300: 'rgba(255, 213, 79, 1)',
          400: 'rgba(255, 202, 40, 1)',
          500: 'rgba(255, 193, 7, 1)',
          600: 'rgba(255, 179, 0, 1)',
          700: 'rgba(255, 160, 0, 1)',
          800: 'rgba(255, 143, 0, 1)',
          900: 'rgba(255, 111, 0, 1)',
        },
        brown: {
          50: 'rgba(239, 235, 233, 1)',
          100: 'rgba(215, 204, 200, 1)',
          200: 'rgba(188, 170, 164, 1)',
          300: 'rgba(161, 136, 127, 1)',
          400: 'rgba(141, 110, 99, 1)',
          500: 'rgba(121, 85, 72, 1)',
          600: 'rgba(109, 76, 65, 1)',
          700: 'rgba(93, 64, 55, 1)',
          800: 'rgba(78, 52, 46, 1)',
          900: 'rgba(62, 39, 35, 1)',
        },
        gray: {
          600: 'rgba(117, 117, 117, 1)',
          700: 'rgba(97, 97, 97, 1)',
        },
        white: 'rgba(255, 253, 245, 1)',
        danger: 'rgba(216, 67, 21, 1)',
      },
      // Fonte padrão
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
      },
      // Espaçamentos customizados
      spacing: {
        '2': '2px',
        '4': '4px',
        '8': '8px',
        '12': '12px',
        '16': '16px',
        '24': '24px',
        '32': '32px',
        '40': '40px',
        '48': '48px',
        '56': '56px',
        '64': '64px',
        '72': '72px',
        '80': '80px',
        '96': '96px',
      },
    },
  },
  plugins: [],
}
