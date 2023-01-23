import Vue from 'vue'
import * as Sentry from '@sentry/vue'
import { BrowserTracing } from '@sentry/tracing'
import { attachErrorHandler, createTracingMixins } from '@sentry/vue'

// import { makeFetchTransport } from '@sentry/browser'

const isProd = process.env.NODE_ENV === 'production'

// const dnsMap = {
//   'master-app': { client: 'vue', dns: 'https://00be4200d6324e4b9ac81b465b120d81@o4504474273841152.ingest.sentry.io/4504478936006656' },
//   'vue-app': { client: 'vue', dns: 'https://a3540506352d4f339a844c2d7b8280d7@o4504474273841152.ingest.sentry.io/4504474276986882' },
//   'react-ts-app': { client: 'react', dns: 'https://84316ff2c0984ecfb1c20f93a4bb488d@o4504474273841152.ingest.sentry.io/4504474276986880' },
//   'vue3-ts-app': { client: 'vue', dns: 'https://58e800f3bb5e49a3bf99515b8d51c5e3@o4504474273841152.ingest.sentry.io/4504478931877888' }
// }

// function sentryFilter(url, options) {
//   console.log(url, options)
//   let app
//   console.log(options.body.includes('"type":"Error"'))
//   if (options.body.includes('"type":"Error"')) {
//     const [, filename] = options.body.match(/"filename":"([^"]*)"/)
//     if (filename) {
//       if (isProd) {
//         if (filename.includes('app-react')) {
//           app = 'react-ts-app'
//         } else if (filename.includes('app-vue')) {
//           app = 'vue-app'
//         } else if (filename.includes('app-vue3')) {
//           app = 'vue3-ts-app'
//         } else {
//           app = 'master-app'
//         }
//       } else {
//         if (filename.includes('localhost:3001')) {
//           app = 'react-ts-app'
//         } else if (filename.includes('localhost:3002')) {
//           app = 'vue-app'
//         } else if (filename.includes('localhost:3004')) {
//           app = 'vue3-ts-app'
//         } else {
//           app = 'master-app'
//         }
//       }
//     }
//     console.log('app', app)
//     if (dnsMap[app]) {
//       const { dns, client } = dnsMap[app]
//       const { username, host, pathname } = new URL(dns)
//       const newUrl = `https://${host}/api/${pathname.slice(1)}/store/?sentry_key=${username}&sentry_version=7&sentry_client=sentry.javascript.${client}/7.29.0`
//       return [newUrl, options]
//     } else {
//       return [url, options]
//     }
//   } else {
//     return [url, options]
//   }
// }

// const CustomeTransport = (options) => {
//   const fetchImpl = (url, options) => {
//     const [newUrl, newOptions] = sentryFilter(url, options)
//     return window.fetch(newUrl, newOptions)
//   }
//   return makeFetchTransport(options, fetchImpl)
// }

// function sentryFilter(url, options) {
//   let app
//   if (options.body.includes('"type":"Error"')) {
//     const [, filename] = options.body.match(/"filename":"([^"]*)"/)
//     if (filename) {
//       if (isProd) {
//         if (filename.includes('react-app')) {
//           app = 'react-ts-app'
//         } else if (filename.includes('vue-app')) {
//           app = 'vue-app'
//         } else if (filename.includes('vue3-app')) {
//           app = 'vue3-ts-app'
//         } else {
//           app = 'master-app'
//         }
//       } else {
//         if (filename.includes('localhost:3001')) {
//           app = 'react-ts-app'
//         } else if (filename.includes('localhost:3002')) {
//           app = 'vue-app'
//         } else if (filename.includes('localhost:3004')) {
//           app = 'vue3-ts-app'
//         } else {
//           app = 'master-app'
//         }
//       }
//     }
//     if (window[`$${app}`]) {
//       const release = window[`$${app}`]
//       options.body = options.body.replace(/"release":"([^"]*)"/, `"release":"${release}"`)
//       return [url, options]
//     } else {
//       return [url, options]
//     }
//   } else {
//     return [url, options]
//   }
// }

const sentryOptions = {
  dsn: 'https://00be4200d6324e4b9ac81b465b120d81@o4504474273841152.ingest.sentry.io/4504478936006656',
  // https://o4504474273841152.ingest.sentry.io/api/4504478936006656/envelope/?sentry_key=00be4200d6324e4b9ac81b465b120d81&sentry_version=7&sentry_client=sentry.javascript.vue%2F7.29.0
  release: process.env.VUE_APP_RELEASE,
  environment: process.env.NODE_ENV,
  attachStacktrace: true,
  beforeSend(event, hint) {
    console.log('hint', hint)
    if (event.extra?.release) {
      event.release = event.extra.release
    } else {
      const { originalException } = hint
      const stacks = originalException.stack?.split('\n')
      let app
      if (stacks?.[1]) {
        if (isProd) {
          if (stacks[1].includes('react-app')) {
            app = 'react-ts-app'
          } else if (stacks[1].includes('vue-app')) {
            app = 'vue-app'
            event.exception.values = event.exception.values.map(item => {
              const { stacktrace: { frames }, ...rest } = item
              // FIXME: 主应用加载时，qiankun 加载当前js资源会在首行添加 window.__TEMP_EVAL_FUNC__ = function(){;(function(window, self, globalThis){with(window){;
              // https://github.com/kuitos/import-html-entry/blob/master/src/index.js#L62
              frames[frames.length - 1].colno -= 'window.__TEMP_EVAL_FUNC__ = function(){;(function(window, self, globalThis){with(window){;'.length
              return {
                ...rest,
                stacktrace: {
                  frames
                }
              }
            })
          } else if (stacks[1].includes('vue3-app')) {
            app = 'vue3-ts-app'
            event.exception.values = event.exception.values.map(item => {
              const { stacktrace: { frames }, ...rest } = item
              // FIXME: 主应用加载时，qiankun 加载当前js资源会在首行添加 window.__TEMP_EVAL_FUNC__ = function(){;(function(window, self, globalThis){with(window){;
              // https://github.com/kuitos/import-html-entry/blob/master/src/index.js#L62
              frames[frames.length - 1].colno -= 'window.__TEMP_EVAL_FUNC__ = function(){;(function(window, self, globalThis){with(window){;'.length
              return {
                ...rest,
                stacktrace: {
                  frames
                }
              }
            })
          } else {
            app = 'master-app'
          }
        } else {
          if (stacks[1].includes('localhost:3001')) {
            app = 'react-ts-app'
          } else if (stacks[1].includes('localhost:3002')) {
            app = 'vue-app'
          } else if (stacks[1].includes('localhost:3004')) {
            app = 'vue3-ts-app'
          } else {
            app = 'master-app'
          }
        }
      }
      if (window[`$${app}`]) {
        event.release = window[`$${app}`]
      }
    }
    console.log(event)
    return event
  },
  tracesSampleRate: 1.0
  // transport: CustomeTransport
}

export function sentryInitForVueSubApp(app, options) {
  attachErrorHandler(app, options)
  if ('tracesSampleRate' in options || 'tracesSampler' in options) {
    app.mixin(
      createTracingMixins({
        ...options,
        ...options.tracingOptions
      })
    )
  }
}

export function initSentry(router) {
  Sentry.init({
    Vue,
    logErrors: true,
    attachProps: true,
    ...sentryOptions,
    integrations: [
      new BrowserTracing({
        routingInstrumentation: Sentry.vueRouterInstrumentation(router),
        tracePropagationTargets: ['localhost', 'my-site-url.com', /^\//]
      })
    ]
  })
}
