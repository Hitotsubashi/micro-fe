import * as Sentry from "@sentry/vue";
import { BrowserTracing } from "@sentry/tracing";
import { Vue } from "@sentry/vue/types/types";
import info from "../package.json";

export function initSentry(app: Vue) {
  Sentry.init({
    app,
    dsn: "https://58e800f3bb5e49a3bf99515b8d51c5e3@o4504474273841152.ingest.sentry.io/4504478931877888",
    integrations: [
      new BrowserTracing({
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
