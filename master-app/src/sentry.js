import Vue from 'vue'
import * as Sentry from '@sentry/vue'
import { BrowserTracing } from '@sentry/tracing'
import info from '../docker.json'
import { makeFetchTransport } from '@sentry/browser'

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

const CustomeTransport = (options) => {
  const fetchImpl = (url, options) => {
    const [newUrl, newOptions] = sentryFilter(url, options)
    return window.fetch(newUrl, newOptions)
  }
  return makeFetchTransport(options, fetchImpl)
}

const releaseMap = {
  'master-app': `${info.name}@${info.version}`,
  'vue-app': undefined,
  'react-ts-app': 'react-ts-app@0.1.18',
  'vue3-ts-app': undefined
}

function sentryFilter(url, options) {
  console.log(url, options)
  let app
  console.log('includes:',options.body.includes('"type":"Error"'))
  if (options.body.includes('"type":"Error"')) {
    const [, filename] = options.body.match(/"filename":"([^"]*)"/)
    if (filename) {
      if (isProd) {
        if (filename.includes('app-react')) {
          app = 'react-ts-app'
        } else if (filename.includes('app-vue')) {
          app = 'vue-app'
        } else if (filename.includes('app-vue3')) {
          app = 'vue3-ts-app'
        } else {
          app = 'master-app'
        }
      } else {
        if (filename.includes('localhost:3001')) {
          app = 'react-ts-app'
        } else if (filename.includes('localhost:3002')) {
          app = 'vue-app'
        } else if (filename.includes('localhost:3004')) {
          app = 'vue3-ts-app'
        } else {
          app = 'master-app'
        }
      }
    }
    console.log('app', app)
    if (releaseMap[app]) {
      const release = releaseMap[app]
      options.body = options.body.replace(/"release":"([^"]*)"/,`"release":"${release}"`)
      return [url, options]
    } else {
      return [url, options]
    }
  } else {
    return [url, options]
  }
}


export function initSentry(router) {
  Sentry.init({
    Vue,
    dsn: 'https://00be4200d6324e4b9ac81b465b120d81@o4504474273841152.ingest.sentry.io/4504478936006656',
    // https://o4504474273841152.ingest.sentry.io/api/4504478936006656/envelope/?sentry_key=00be4200d6324e4b9ac81b465b120d81&sentry_version=7&sentry_client=sentry.javascript.vue%2F7.29.0
    integrations: [
      new BrowserTracing({
        routingInstrumentation: Sentry.vueRouterInstrumentation(router),
        tracePropagationTargets: ['localhost', 'my-site-url.com', /^\//]
      })
    ],
    release: `${info.name}@${info.version}`,
    environment: process.env.NODE_ENV,
    attachStacktrace: true,
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
    transport: CustomeTransport,
  })
}
