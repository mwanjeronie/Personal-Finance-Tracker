import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
// module.exports = {
//   devServer: {
//     port: 3000 
//   }
// }