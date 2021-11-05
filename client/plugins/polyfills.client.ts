import 'element-matches-polyfill'
import 'intersection-observer'
import raf from 'raf'

// @ts-ignore
window.requestIdleCallback = window.requestIdleCallback || ((callback, _options) => {
  return setTimeout(callback, 1)
})

// @ts-ignore
window.cancelIdleCallback = window.cancelIdleCallback || ((handle) => {
  return clearTimeout(handle)
})

raf.polyfill()
