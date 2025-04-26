import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/Personal-Finance-Tracker/",
})
// module.exports = {
//   devServer: {
//     port: 3000
//   }
// }
