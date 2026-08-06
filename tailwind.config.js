export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#020817',
        secondary: '#050f27',
        accent: '#2563eb',
        'accent-alt': '#1d4ed8',
        'accent-bright': '#3b82f6',
        surface: '#0d1a3a',
      },
      fontFamily: {
        heading: ['Outfit', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
