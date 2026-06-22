/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // ────────────────────────────────────────────────────────────
        // 🎨 SPORTING UNITED ACADEMY — central theme palette
        // To re-skin the entire app, change ONLY the hex values below.
        // The semantic keys (primary / accent / etc.) are used everywhere.
        // ────────────────────────────────────────────────────────────
        brand: {
          // ── Primary (shield slate-blue from crest) ─
          primary:        '#41507a',
          'primary-dark': '#2d3857',
          'primary-light':'#5a6b95',

          // ── Accent (powder blue — stripes & banner on crest) ─
          accent:         '#9bb2ec',
          'accent-light': '#b5c9f3',

          // ── Gold trim (border & lettering on crest) ─
          gold:        '#ecd7a0',
          'gold-light':'#f5e6c0',

          // ── Surfaces ─
          cream: '#fbfbf7',           // near-white from crest inner circle
          ink:   '#1a2035',           // body text / dark surfaces

          // ── Legacy aliases (so existing components still resolve) ─
          green:        '#41507a',
          'green-dark': '#2d3857',
          'green-light':'#5a6b95',
        },
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'Impact', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        crest: '0 10px 30px -10px rgba(14,27,58,0.45)',
      },
    },
  },
  plugins: [],
}
