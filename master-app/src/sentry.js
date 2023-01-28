import Vue from 'vue'
import * as Sentry from '@sentry/vue'
import { BrowserTracing } from '@sentry/tracing'
import { attachErrorHandler, createTracingMixins, vueRouterInstrumentation } from '@sentry/vue'
import { makeFetchTransport, makeMain, defaultStackParser, defaultIntegrations, Hub, BrowserClient } from '@sentry/browser'
// import { reactRouterV6Instrumentation } from '@sentry/react'

const isProd = process.env.NODE_ENV === 'production'

// const dnsMap = {
//   'master-app': { client: 'vue', dns: 'http://714b194760cb4fb18d73dd1515fc533c@139.9.68.82:9000/3' },
//   'vue-app': { client: 'vue', dns: 'http://efe551031a524c3db8b9a147b9754a22@139.9.68.82:9000/4' },
//   'react-ts-app': { client: 'react', dns: 'https://84316ff2c0984ecfb1c20f93a4bb488d@o4504474273841152.ingest.sentry.io/4504474276986880' },
//   'vue3-ts-app': { client: 'vue', dns: 'https://58e800f3bb5e49a3bf99515b8d51c5e3@o4504474273841152.ingest.sentry.io/4504478931877888' }
// }

// function sentryFilter(url, options) {
//   let app
//   if (options.body.includes('"type":"Error"')) {
//     const [, releaseName] = options.body.match(/"release":"([^"]*)"/)
//     const app = releaseName?.split('@')[0]
//     if (dnsMap[app]) {
//       const { dns, client } = dnsMap[app]
//       const { username, host, pathname } = new URL(dns)
//       const newUrl = `http://${host}/api/${pathname.slice(1)}/store/?sentry_key=${username}&sentry_version=7&sentry_client=sentry.javascript.${client}%2F7.29.0`
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
//     // console.log('CustomeTransport',options)
//     const [newUrl, newOptions] = sentryFilter(url, options)
//     return window.fetch(newUrl, newOptions)
//     // return window.fetch(url, options)
//   }
//   return makeFetchTransport(options, fetchImpl)
// }

const sentryOptions = {
  dsn: 'http://1722442e922e4d61a59fb4897ea6b50f@139.9.68.82:9000/2',
  release: process.env.VUE_APP_RELEASE,
  environment: process.env.NODE_ENV,
  attachStacktrace: true,
  beforeSend(event, hint) {
    // console.log('hint', hint)
    console.log('beforeSend')
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
    // console.log(event)
    return event
  },
  beforeSendTransaction(event) {
    console.log('beforeSendTransaction')
    const releaseMap = {
      AppReact: 'react-ts-app',
      AppVue: 'vue-app',
      AppVue3: 'vue3-ts-app'
    }
    const { transaction } = event
    const app = releaseMap[transaction]
    if (window[`$${app}`]) {
      event.release = window[`$${app}`]
    }
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
        routingInstrumentation: vueRouterInstrumentation(router),
        tracePropagationTargets: ['localhost', 'my-site-url.com', /^\//]
      })
    ]
  })
}

const hubMap = {}

export function usingSentryHub(type, settings) {
  console.log('usingSentryHub', type, settings)
  const { release } = settings.options
  if (!hubMap[release]) {
    switch (type) {
      case 'vue':
        hubMap[release] = initVueSentryHub(settings)
        break
      case 'react':
        hubMap[release] = initReactSentryHub(settings)
        break
      default:
        break
    }
  }
  makeMain(hubMap[release])
}

function initVueSentryHub({ Vue, router, options, VueOptions }) {
  const integrations = [...defaultIntegrations]
  if(router){
    integrations.push(
      new BrowserTracing({
        routingInstrumentation: vueRouterInstrumentation(router),
        tracingOrigins: ['localhost', /^\//]
      })
    )
  }

  const ultimateOptions = {
    environment: process.env.NODE_ENV,
    transport: makeFetchTransport,
    stackParser: defaultStackParser,
    integrations,
    tracesSampleRate: 1.0,
    ...options
  }
  const client = new BrowserClient(ultimateOptions)
  const ultimateVueOptions = {
    attachProps: true,
    logErrors: true,
    tracesSampleRate: 1.0,
    ...VueOptions
  }
  attachErrorHandler(Vue, ultimateVueOptions)
  if ('tracesSampleRate' in ultimateVueOptions || 'tracesSampler' in ultimateVueOptions) {
    Vue.mixin(
      createTracingMixins({
        ...ultimateVueOptions,
        ...ultimateVueOptions.tracingOptions
      })
    )
  }
  return new Hub(client)
}

function initReactSentryHub({ options, reactRouterV6InstrumentationOptions }) {
  const ultimateOptions = {
    environment: process.env.NODE_ENV,
    transport: makeFetchTransport,
    stackParser: defaultStackParser,
    integrations: [
      ...defaultIntegrations
      // new BrowserTracing({
      //   routingInstrumentation: reactRouterV6InstrumentationOptions?reactRouterV6Instrumentation(
      //     reactRouterV6InstrumentationOptions.useEffect,
      //     reactRouterV6InstrumentationOptions.useLocation,
      //     reactRouterV6InstrumentationOptions.useNavigationType,
      //     reactRouterV6InstrumentationOptions.createRoutesFromChildren,
      //     reactRouterV6InstrumentationOptions.matchRoutes,
      //     ):undefined,
      //   tracingOrigins: ['localhost', /^\//],
      // }),
    ],
    tracesSampleRate: 1.0,
    ...options
  }
  const client = new BrowserClient(ultimateOptions)
  return new Hub(client)
}
