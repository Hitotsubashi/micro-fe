import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import info from './docker.json';

export function initSentry() {
  Sentry.init({
    dsn: 'https://84316ff2c0984ecfb1c20f93a4bb488d@o4504474273841152.ingest.sentry.io/4504474276986880',
    integrations: [new BrowserTracing()],
    release: `${info.name}@${info.version}`,
    environment: process.env.NODE_ENV,
    attachStacktrace: true,
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });
}
