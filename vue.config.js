module.exports = {
  lintOnSave: false,

  devServer: {
    allowedHosts: ['localhost']
  },

  pwa: {
    name: 'Pullcrm',
    themeColor: '#4876f6',
    workboxPluginMode: 'GenerateSW',
    appleMobileWebAppCapable: 'yes',
    assetsVersion: '0.1',
    manifestOptions: {
      name: 'Pullcrm - система управления клиентами',
      short_name: 'Pullcrm',
      display: 'standalone',
      background_color: '#ffffff'
    }
  },

  css: {
    loaderOptions: {
      scss: {
        additionalData: `
          @import "@/scss/_typo.scss";
          @import "@/scss/_variables.scss";
          @import "@/scss/_mixins.scss";
          @import "@/scss/_grid-mixins.scss";
        `
      }
    }
  },

  chainWebpack: config => {
    config.module
      .rule('raw')
      .test(/\.txt$/)
      .use('raw-loader')
      .loader('raw-loader')
      .end()
  },

  configureWebpack: {
    optimization: {
      splitChunks: {
        maxAsyncRequests: 8,
        maxInitialRequests: 8,
        minSize: 100000,
        cacheGroups: {
          uikit: {
            name: 'uikit',
            chunks: 'all',
            test: /src\/(scss|ui)\/(.+)\.(scss|css|vue)$/,
            enforce: true,
            priority: -20
          }
        }
      }
    }
  }
}
