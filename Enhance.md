改善点：

- 小

  1. VueAppInit 方法整合以及名字修改
  2. VueAppInit 方法从 props 传入
  3. tag 打标恢复

     github action 常量：https://docs.github.com/en/actions/learn-github-actions/variables#default-environment-variables

     action-gh-release 插件：https://github.com/softprops/action-gh-release#-customizing

  4. VueAppInit 加上 router
  5. 加上 trackComponents

     教程：https://docs.sentry.io/platforms/javascript/guides/vue/#vue-3---manual-initialization

  6. 测试多个类型的错误：计时器，Promise

- 中

  1. 尝试把错误上报到不同应用里
  2. 把 transaction 上报到不同 release 或应用里
  3. 探索 BrowserClient

     来源：https://github.com/umijs/qiankun/issues/1088

     教程：https://docs.sentry.io/platforms/javascript/guides/vue/troubleshooting/#using-a-client-directly

- 大
  1. 探索优化记录用户行为记录的面包屑
