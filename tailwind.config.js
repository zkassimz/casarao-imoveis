/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#333333', // Cinza escuro em vez de amber
          light: '#4A4A4A',   // Cinza escuro mais claro
          dark: '#1A1A1A',    // Quase preto
        },
        secondary: {
          DEFAULT: '#E0E0E0',  // Cinza claro
          light: '#F5F5F5',    // Quase branco
          dark: '#BDBDBD',     // Cinza médio
        },
        background: {
          light: '#F8F8F8',    // Fundo claro
          DEFAULT: '#EFEFEF',  // Fundo padrão (cinza muito claro)
          dark: '#202020',     // Fundo escuro (quase preto)
        },
        accent: {
          DEFAULT: '#FFFFFF',  // Branco para acentos
          dark: '#000000',     // Preto para acentos
        },
      },
    },
  },
  plugins: [],
}; 