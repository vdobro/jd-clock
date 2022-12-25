import { defineConfig } from 'vite'

import react from '@vitejs/plugin-react'
import * as path from 'path'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), cssInjectedByJsPlugin()],
  base: './',
  resolve: {
    alias: {
      '@' : path.resolve(__dirname, './src/'),
    },
  },
})
