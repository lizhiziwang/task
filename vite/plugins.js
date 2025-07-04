import vue from '@vitejs/plugin-vue'
// import svgLoader from 'vite-svg-loader'

export default function createVitePlugins(env) {
    const isProduction = env.NODE_ENV === 'production'

    // 基础插件
    const plugins = [vue()]

    // 生产环境插件
    if (isProduction) {
        plugins.push(/* 生产环境插件 */)
    }

    // SVG加载器
    // plugins.push(svgLoader())

    return plugins
}