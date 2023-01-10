import Vue from "vue";
import * as Sentry from "@sentry/vue";
import { BrowserTracing } from "@sentry/tracing";
import info from "../docker.json";

export function initSentry(router) {
  Sentry.init({
    Vue,
    dsn: "https://a3540506352d4f339a844c2d7b8280d7@o4504474273841152.ingest.sentry.io/4504474276986882",
    integrations: [
      new BrowserTracing({
        routingInstrumentation: Sentry.vueRouterInstrumentation(router),
        tracePropagationTargets: ["localhost", "my-site-url.com", /^\//],
      }),
    ],
    release: `${info.name}@${info.version}`,
    environment: process.env.NODE_ENV,
    attachStacktrace: true,
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });
}
