import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { imagetools } from 'vite-imagetools'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    tailwindcss(),
    imagetools(),
    mode === 'analyze' &&
      visualizer({ filename: 'stats.html', gzipSize: true, brotliSize: true, template: 'treemap' }),
  ],
  build: {
    target: 'es2022',
    modulePreload: { polyfill: false },
  },
}))
