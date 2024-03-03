/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundColor: {
        'gray-slightly': '#f0f0f0',
      },
      boxShadow: {
        'sm-plus': '0 2px 4px rgba(0, 0, 0, 0.1)',
      },
      screens: {
        mobile: '480px',
      },
      keyframes: {
        appearanceFromTop: {
          '0%': { opacity: 0, transform: 'translateY(-10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
