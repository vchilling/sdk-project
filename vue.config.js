const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/github-api': {
        target: 'https://github.com',
        changeOrigin: true,
        pathRewrite: { '^/github-api': '' },
      },
    },
  },
})
