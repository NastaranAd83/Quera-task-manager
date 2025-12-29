/** @type {import('tailwindcss').Config} */
export default {
  // darkMode: 'class',
  content: [
    "./src/**/*.{html,js}",
  ],
  theme: {
    extend: {
      fontFamily: {
        yekan: ['"Yekan Bakh"', 'sans-serif'],
      },
     
    },
      
  },
  //   plugins: [
  //   function ({ addVariant }) {
  //     addVariant('dark', '&:where(.dark, .dark *)')
  //   }
  // ],
}

// /** @type {import('tailwindcss').Config} */
// export default {
//   darkMode: 'class',
//   content: [
//     "./**/*.html",
//     "./scripts/**/*.js",
//   ],
//   theme: {
//     extend: {
//       fontFamily: {
//         yekan: ['"Yekan Bakh"', 'sans-serif'],
//       },
//     },
//   },
//   plugins: [],
// }
// export default {
//   darkMode: 'class',
//   content: [
//     "./src/**/*.html",
//     "./src/**/*.js",
//     "./src/scripts/**/*.js",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }
