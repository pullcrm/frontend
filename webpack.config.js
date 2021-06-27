/* Need only for WebStorm path resolve and autocompletions */

module.exports = {
  resolve: {
    extensions: ['.ts', '.vue', '.js', '.css', '.scss'],
    alias: {
      '~': require('path').resolve(__dirname, 'client'),
      '~widgets': require('path').resolve(__dirname, 'widgets')
    }
  }
}
