import { BrowserTracing } from '@sentry/tracing'
import { attachErrorHandler, createTracingMixins, vueRouterInstrumentation } from '@sentry/vue'
import { makeFetchTransport, makeMain, defaultStackParser, defaultIntegrations, Hub, BrowserClient } from '@sentry/browser'
// import { reactRouterV6Instrumentation } from '@sentry/react'

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
  if (router) {
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
