/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        lightGreen: '#8DB73F',
        darkGreen: '#425239',
        darkestGreen: 'rgb(37, 44, 31)',
        golden: '#E7BB00',
        lavendar: '#A39DAE',
        clay: '#7C3D24',
      }
    },
  },
  plugins: [],
}
