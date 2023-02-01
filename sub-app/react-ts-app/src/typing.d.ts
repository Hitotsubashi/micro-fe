declare interface Window {
  readonly __POWERED_BY_QIANKUN__?: string;
  $micro_app_release: Record<string, string>;
}

declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_NAME: string;
    REACT_APP_RELEASE: string;
    REACT_APP_VERSION: string;
  }
}
