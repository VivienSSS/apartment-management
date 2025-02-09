const { fontFamily } = require("tailwindcss/defaultTheme")
const { addDynamicIconSelectors } = require("@iconify/tailwind")


/** @type {import('tailwindcss').Config} */
export default {
  content: ["./node_modules/flyonui/dist/js/*.js", "./web/**/*.go"], // Require only if you want to use FlyonUI JS component
  flyonui: {
    themes: [
      {
        flyonui: {
          themes: ["soft"]
          /*mytheme: {
            primary: "#ff00b3",
            secondary: "#00e9ff",
            accent: "#00b5ff",
            neutral: "#12080a",
            "base-100": "#e7e5e4"*/
          //palitan mo lang hex code to ur desired color
          //}
          //}
          //]
        }
      }
    ]
  },

  plugins: [
    require("flyonui"),
    require("flyonui/plugin"), // Require only if you want to use FlyonUI JS component
    addDynamicIconSelectors()
  ]
}
