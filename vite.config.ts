import { defineConfig } from 'vite'
import { getDirname } from '@adonisjs/core/helpers'
import inertia from '@adonisjs/inertia/client'
import react from '@vitejs/plugin-react'
import adonisjs from '@adonisjs/vite/client'
import tailwind from '@tailwindcss/vite'
import flowbiteReact from 'flowbite-react/plugin/vite'

export default defineConfig({
  server: {
    hmr: {
      port: 3001,
    },
  },
  plugins: [
    inertia({
      ssr: {
        enabled: true,
        entrypoint: 'inertia/app/ssr.tsx',
      },
    }),
    react(),
    tailwind(),
    adonisjs({
      entrypoints: ['inertia/app/app.tsx'],
      reload: ['resources/views/**/*.edge'],
    }),
    flowbiteReact(),
  ],

  /**
   * Define aliases for importing modules from
   * your frontend code
   */
  resolve: {
    alias: {
      '~/': `${getDirname(import.meta.url)}/inertia/`,
    },
  },
})
