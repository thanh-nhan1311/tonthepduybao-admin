import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import { viteCommonjs } from '@originjs/vite-plugin-commonjs'

import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    viteCommonjs(),
    Components({
      resolvers: [AntDesignVueResolver()]
    })
  ],
  server: {
    // Proxy API calls during development to the backend server
    proxy: {
      '/ttdb/api': {
        target: 'http://localhost:7700',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '~': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
