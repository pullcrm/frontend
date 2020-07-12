module.exports = {
  lintOnSave: false,

  devServer: {
    allowedHosts: ['localhost']
  },

  css: {
    loaderOptions: {
      scss: {
        prependData: `
          @import "@/scss/_typo.scss";
          @import "@/scss/_variables.scss";
          @import "@/scss/_grid-mixins.scss";
        `
      }
    }
  }
}
