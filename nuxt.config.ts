import * as path from 'path'

import { NuxtOptions } from '@nuxt/types'

require('dotenv').config({
  path: path.resolve(__dirname, 'config', '.env')
})

const isProduction = process.env.NODE_ENV === 'production'

const config: NuxtOptions = {
  telemetry: false,

  ssr: true,

  server: {
    port: process.env.PORT
    // timing: true
  },

  env: {
    RPC_URL: process.env.RPC_URL,
    CALENDAR_TIME_STEP: process.env.CALENDAR_TIME_STEP
  },

  publicRuntimeConfig: {
    BASE_HOST: process.env.BASE_HOST,
    SENTRY_ENV: process.env.SENTRY_ENV,
    SENTRY_DSN: process.env.SENTRY_DSN,
    // SENTRY_RELEASE: process.env.SENTRY_RELEASE,
    RPC_URL: process.env.RPC_URL,
    RPC_UPLOAD_URL: process.env.RPC_UPLOAD_URL,
    RPC_USER: process.env.RPC_USER,
    RPC_PASSWORD: process.env.RPC_PASSWORD,
    // COOKIE_DOMAIN: process.env.COOKIE_DOMAIN
    RPC_BALANCE_CHECKOUT: process.env.RPC_BALANCE_CHECKOUT,

    MINIMUM_DEPOSIT_AMOUNT: process.env.MINIMUM_DEPOSIT_AMOUNT,
    MAXIMUM_DEPOSIT_AMOUNT: process.env.MAXIMUM_DEPOSIT_AMOUNT
  },

  components: [
    { path: '~/ui/', prefix: 'ui', global: 'dev' }
  ],

  router: {
    base: '/app/',

    middleware: [
      'redirects/pwa',
      'auth',
      'company',
      'bootstrap',
      'role-redirect',
      'redirects/slash',
      'location',
      'site-loaded'
      // 'analytics-params.server',
      // 'bootstrap.server',
      // 'experiment',
      // 'webp-support.server'
    ]
  },

  render: {
    bundleRenderer: {
      shouldPreload: (_file, type) => {
        return ['script', 'style'].includes(type)
      }
    },

    compressor: false
  },

  head: {
    htmlAttrs: {
      lang: 'uk'
    },
    title: 'Облік клієнтів та онлайн запис - pullcrm',
    meta: [
      { charset: 'utf-8' },
      { hid: 'viewport', name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover' },
      { name: 'mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'application-name', content: 'Pullcrm' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'white' },
      { name: 'apple-mobile-web-app-title', content: 'Pullcrm' },
      { name: 'msapplication-TileColor', content: '#333' },
      { name: 'theme-color', content: '#333' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
      { hid: 'description', name: 'description', content: 'Pullcrm - зручний інструмент автоматизації запису для вашої компанії. Онлайн запис для: ✅Барбершопу ✅Салону краси ✅Тату салону ✅Медичного центру ✅Стоматології.' },
      // { name: 'facebook-domain-verification', content: 'sh91u782fzoza8xz3iclnolr65ad0a' },
      // @ts-ignore
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge,chrome=1' }
    ],
    link: [
      { rel: 'canonical', href: 'https://pullcrm.com/' },
      { rel: 'icon', type: 'image/x-icon', href: '/app/static/logo-rounded.svg' },

      { rel: 'preload', crossorigin: 'anonymous', as: 'font', href: '/app/static/fonts/Inter-Regular.woff2', type: 'font/woff2' },
      { rel: 'preload', crossorigin: 'anonymous', as: 'font', href: '/app/static/fonts/Inter-Medium.woff2', type: 'font/woff2' },
      { rel: 'preload', crossorigin: 'anonymous', as: 'font', href: '/app/static/fonts/Inter-SemiBold.woff2', type: 'font/woff2' }
    ],
    __dangerouslyDisableSanitizers: ['script']
  },

  srcDir: 'client',

  rootDir: path.resolve(__dirname),

  buildModules: [
    ['@nuxt/typescript-build', {
      typeCheck: isProduction
    }]
  ],

  modules: [
    ['@nuxtjs/router', { fileName: 'router.ts' }],
    '~/modules/sentry.ts',
    'portal-vue/nuxt'
    // '~/modules/consola.ts',
    // ['~/modules/prometheus.ts', { prefix: 'desktop_' }]
  ],

  loading: {
    color: '#3c8aff',
    height: '4px'
  },

  plugins: [
    { src: '~/plugins/cookies' },
    { src: '~/plugins/typed-store' },
    { src: '~/plugins/runtime-config' },
    { src: '~/plugins/storage' },
    { src: '~/plugins/api' },
    { src: '~/plugins/auth' },
    { src: '~/plugins/errors' },
    // { src: '~/plugins/auth' },
    { src: '~/plugins/vue-filters' },
    // { src: '~/plugins/vue-ignore-elements' },
    { src: '~/plugins/sentry.client' },
    { src: '~/plugins/polyfills.client' },
    // { src: '~/plugins/chat.client' },
    { src: '~/plugins/analytics.client' },
    // { src: '~/plugins/experiment.client' },
    { src: '~/plugins/click-outside.client' },
    { src: '~/plugins/observe-visibility.client' },
    { src: '~/plugins/wait-idle.client' }
  ],

  css: [
    '~/scss/theme.scss'
  ],

  devtools: false,

  /**
   * Build configuration
   */
  build: {
    loaders: {
      vue: {
        prettify: false,
        compilerOptions: {
          whitespace: 'condense'
        }
      },

      scss: {
        // @ts-ignore
        additionalData: `
          @import '~/ui/_variables.scss';
          @import '~/ui/_mixins.scss';
          @import '~/scss/_mixins.scss';
        `
      }
    },

    postcss: {
      plugins: {
        autoprefixer: {
          grid: true
        }
      }
    },

    extractCSS: true,

    optimization: {
      splitChunks: {
        minSize: 200 * 1000,
        maxSize: 700 * 1000,
        cacheGroups: {
          commons: false,
          vendor1: {
            test: /node_modules/,
            name: 'vendor-1',
            chunks: 'initial',
            enforce: true,
            minSize: 150 * 1000,
            maxSize: 420 * 1000,
            priority: 50
          },
          vendor2: {
            test: /@sentry|lodash|core-js|vue-the-mask/,
            name: 'vendor-2',
            chunks: 'all',
            enforce: true,
            minSize: 150 * 1000,
            maxSize: 420 * 1000,
            priority: 100
          },
          uikit: {
            name: 'uikit',
            chunks: 'all',
            test: /client\/ui\/.+\.(scss|css|vue)$/,
            enforce: true,
            priority: 200,
            minSize: 75 * 1000,
            maxSize: 180 * 1000
          }
        }
      }
    },

    cssSourceMap: false,

    babel: {
      presets ({ isServer }) {
        return [
          ['@nuxt/babel-preset-app', {
            targets: isServer ? { node: 'current' } : { ie: 11, safari: 8 },
            loose: true,
            corejs: 3,
            polyfills: [
              'es.symbol',
              'es.array.from',
              'es.array.iterator',
              'es.object.assign',
              'es.promise',
              'es.promise.finally'
            ]
          }]
        ]
      },

      plugins: [
        ['@babel/plugin-syntax-dynamic-import'],
        ['@babel/plugin-transform-spread', { loose: false }]
      ]
    },

    extend (config, { isClient }) {
      // Remove the nuxt image loader
      config.module.rules = config.module.rules.filter((rule) => {
        return `${rule.test}` !== '/\\.(png|jpe?g|gif|svg|webp|avif)$/i'
      })

      // Setup the image loaders by own
      config.module.rules.push(
        {
          test: /\.(png|jpe?g|gif|webp|avif)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                esModule: false
              }
            }
          ]
        },
        {
          test: /\.svg$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                esModule: false
              }
            },
            {
              loader: 'svgo-loader',
              options: {
                plugins: [
                  { cleanupIDs: false },
                  { inlineStyles: false },
                  { minifyStyles: false },
                  { convertPathData: false },
                  { convertStyleToAttrs: false }
                ]
              }
            }
          ]
        }
      )

      config.resolve.alias['/scss'] = path.resolve(__dirname, 'client', 'scss')

      // Enable source maps in the production mode
      if (isClient && isProduction) {
        config.devtool = 'source-map'
      }
    }
  }
}

export default config
