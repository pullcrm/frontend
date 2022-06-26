/* eslint-env node */

/*
 * This file runs in a Node context (it's NOT transpiled by Babel), so use only
 * the ES6 features that are supported by your Node version. https://node.green/
 */

// Configuration for your app
// https://v2.quasar.dev/quasar-cli-vite/quasar-config-js

// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { configure } = require('quasar/wrappers')

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({
  path: path.resolve(__dirname, 'config', '.env'),
})

// const isProduction = process.env.NODE_ENV === 'production'

module.exports = configure((/* ctx */) => {
  return {
    supportTS: true,

    eslint: {
      // fix: true,
      // include = [],
      // exclude = [],
      // rawOptions = {},
      warnings: true,
      errors: true,
    },

    // https://v2.quasar.dev/quasar-cli-vite/prefetch-feature
    preFetch: true,

    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    // https://v2.quasar.dev/quasar-cli-vite/boot-files
    boot: [
      'api',
      'portal', // TODO: Remove/refactor this boot
      'progress',
      'cookies',
      'ui-kit',
      // plugins
      'auth',
      'errors',
      // 'sentry',
      // 'polyfills',
      // 'analytics',
      // 'wait-idle',
    ],

    // https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#css
    css: [
      'app.scss',
    ],

    // https://github.com/quasarframework/quasar/tree/dev/extras
    extras: [],

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#build
    build: {
      env: {
        RPC_URL: process.env.RPC_URL,
        CALENDAR_TIME_STEP: process.env.CALENDAR_TIME_STEP,

        BASE_HOST: process.env.BASE_HOST,
        SENTRY_ENV: process.env.SENTRY_ENV,
        SENTRY_DSN: process.env.SENTRY_DSN,
        // SENTRY_RELEASE: process.env.SENTRY_RELEASE,
        RPC_UPLOAD_URL: process.env.RPC_UPLOAD_URL,
        RPC_USER: process.env.RPC_USER,
        RPC_PASSWORD: process.env.RPC_PASSWORD,
        // COOKIE_DOMAIN: process.env.COOKIE_DOMAIN

        MINIMUM_DEPOSIT_AMOUNT: process.env.MINIMUM_DEPOSIT_AMOUNT,
        MAXIMUM_DEPOSIT_AMOUNT: process.env.MAXIMUM_DEPOSIT_AMOUNT,
      },

      target: {
        browser: ['es2019', 'edge88', 'firefox78', 'chrome87', 'safari13.1'],
        node: 'node16',
      },

      vueRouterMode: 'history', // available values: 'hash', 'history'
      // vueRouterBase,
      // vueDevtools,
      // vueOptionsAPI: false,

      // rebuildCache: true, // rebuilds Vite/linter/etc cache on startup

      publicPath: '/',
      // analyze: true,
      // env: {},
      // rawDefine: {}
      // ignorePublicFolder: true,
      // minify: false,
      // polyfillModulePreload: true,
      // distDir

      // extendViteConf (viteConf) {},
      // viteVuePluginOptions: {},

      alias: {
        '~': path.join(__dirname, './src'),
        'ui': path.join(__dirname, './src/ui'),
        'utils': path.join(__dirname, './src/utils'),
        'constants': path.join(__dirname, './src/constants'),
        'validation': path.join(__dirname, './src/validation'),
        'composables': path.join(__dirname, './src/composables'),
      },

      vitePlugins: [
        ['unplugin-auto-import/vite', {
          imports: [
            'vue',
            'quasar',
            'vue-router',
            // '@vueuse/head',
            '@vueuse/core',
            { '~/stores/analytics': ['useAnalyticsStore'] },
            { '~/stores/appointments': ['useAppointmentsStore'] },
            { '~/stores/auth': ['useAuthStore'] },
            { '~/stores/base': ['useBaseStore'] },
            { '~/stores/popup': ['usePopupStore'] },
            { '~/stores/position': ['usePositionStore'] },
            { '~/stores/procedures': ['useProceduresStore'] },
            { '~/stores/schedule': ['useScheduleStore'] },
            { '~/stores/sms': ['useSmsStore'] },
            { '~/stores/specialist': ['useSpecialistStore'] },
            { '~/stores/specialists': ['useSpecialistsStore'] },
            { '~/stores/timetable': ['useTimetableStore'] },
            { '~/stores/toasts': ['useToastsStore'] },
            { '~/stores/widget': ['useWidgetStore'] },
          ],
          dts: 'src/auto-imports.d.ts',
        }],

        ['unplugin-vue-components/vite', {
          dts: 'src/vue-components.d.ts',
        }],
      ],
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#devServer
    devServer: {
      port: process.env.PORT,
      // https: true
      open: false, // opens browser window automatically
    },

    // https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#framework
    framework: {
      // iconSet: 'material-icons', // Quasar icon set
      // lang: 'en-US', // Quasar language pack

      // For special cases outside of where the auto-import strategy can have an impact
      // (like functional components as one of the examples),
      // you can manually specify Quasar components/directives to be available everywhere:
      //
      // components: [],
      // directives: [],

      // Quasar plugins
      plugins: [
        'LocalStorage',
        'LoadingBar',
        'Cookies',
        'Meta',
      ],

      config: {
        loadingBar: {
          position: 'top',
          size: '4px',
          color: 'primary',
        },
      },
    },

    // animations: 'all', // --- includes all animations
    // https://v2.quasar.dev/options/animations
    animations: [],

    // https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#sourcefiles
    // sourceFiles: {
    //   rootComponent: 'src/App.vue',
    //   router: 'src/router/index',
    //   store: 'src/store/index',
    //   registerServiceWorker: 'src-pwa/register-service-worker',
    //   serviceWorker: 'src-pwa/custom-service-worker',
    //   pwaManifestFile: 'src-pwa/manifest.json',
    //   electronMain: 'src-electron/electron-main',
    //   electronPreload: 'src-electron/electron-preload'
    // },

    // https://v2.quasar.dev/quasar-cli-vite/developing-ssr/configuring-ssr
    ssr: {
      ssrPwaHtmlFilename: 'offline.html', // do NOT use index.html as name!
      // will mess up SSR

      // extendSSRWebserverConf (esbuildConf) {},
      // extendPackageJson (json) {},

      // pwa: isProduction,
      pwa: false,

      // manualStoreHydration: true,
      // manualPostHydrationTrigger: true,

      prodPort: process.env.PORT, // The default port that the production server should use
      // (gets superseded if process.env.PORT is specified at runtime)

      middlewares: [
        // 'log',
        'render', // keep this as last one
      ],
    },

    // https://v2.quasar.dev/quasar-cli-vite/developing-pwa/configuring-pwa
    pwa: {
      workboxMode: 'generateSW', // or 'injectManifest'
      injectPwaMetaTags: true,
      swFilename: 'sw.js',
      manifestFilename: 'manifest.json',
      useCredentialsForManifestTag: false,
      // extendGenerateSWOptions (cfg) {}
      // extendInjectManifestOptions (cfg) {},
      // extendManifestJson (json) {}
      // extendPWACustomSWConf (esbuildConf) {}
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/developing-cordova-apps/configuring-cordova
    cordova: {
      // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/developing-capacitor-apps/configuring-capacitor
    capacitor: {
      hideSplashscreen: true,
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/developing-electron-apps/configuring-electron
    electron: {
      // extendElectronMainConf (esbuildConf)
      // extendElectronPreloadConf (esbuildConf)

      inspectPort: 5858,

      bundler: 'packager', // 'packager' or 'builder'

      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Windows only
        // win32metadata: { ... }
      },

      builder: {
        // https://www.electron.build/configuration/configuration

        appId: 'quasar-project',
      },
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/developing-browser-extensions/configuring-bex
    bex: {
      contentScripts: [
        'my-content-script',
      ],

      // extendBexScriptsConf (esbuildConf) {}
      // extendBexManifestJson (json) {}
    },
  }
})
