改善点：

- 小

  1. VueAppInit 方法整合以及名字修改 ✅
  2. VueAppInit 方法从 props 传入 ✅
  3. tag 打标恢复 ✅

     github action 常量：https://docs.github.com/en/actions/learn-github-actions/variables#default-environment-variables

     action-gh-release 插件：https://github.com/softprops/action-gh-release#-customizing

  4. VueAppInit 加上 router 🎈（等待是否可以分应用上传错误）
  5. 加上 trackComponents 🎈

     教程：https://docs.sentry.io/platforms/javascript/guides/vue/#vue-3---manual-initialization

  6. 测试多个类型的错误：计时器，Promise ✅
     -> **发现 PromiseError 没有错误栈，因此无法判断错误所在的应用和所在的代码行**
  7. 每个子应用的 version 以全局变量的形式注入
  8. 是否需要 ReactAppInit 方法 ✅
     -> 结论：不需要

- 中

  1. 尝试把错误上报到不同应用里
  2. 把 transaction 上报到不同 release 或应用里
  3. 探索 BrowserClient+Hub ✅

     来源：https://github.com/umijs/qiankun/issues/1088

     教程：https://docs.sentry.io/platforms/javascript/guides/vue/troubleshooting/#using-a-client-directly

     -> 作为另一种方式

- 大
  1. 探索优化记录用户行为记录的面包屑
