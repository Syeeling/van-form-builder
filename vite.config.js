import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import vueSetupExtend from 'unplugin-vue-setup-extend-plus/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from '@vant/auto-import-resolver'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueSetupExtend(),
    AutoImport({
      imports: ['vue'],
      resolvers: [VantResolver()],
      dts: 'types/auto-imports.d.ts' // 生成的类型文件
    }),
    Components({
      resolvers: [VantResolver()],
      dts: 'types/components.d.ts' // 指定生成的 .d.ts 文件
    })
  ],
  resolve: {
    alias: {
      // 设置路径
      '~': path.resolve(__dirname, './'),
      // 设置别名
      '@': path.resolve(__dirname, './src')
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
  }
})
