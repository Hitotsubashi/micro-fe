import Layout from "@/layout";
import MicroAppLayout from "@/layout/MicroAppLayout";
import Vue from "vue";
import { loader, shared } from "@/qiankun";

const microAppRoutes = [
  {
    path: "/app-react",
    component: Layout,
    children: [
      {
        path: "index*",
        name: "app-react",
        component: Vue.extend({ ...MicroAppLayout, name: "AppReact" }),
        props: { id: "app-react" },
        meta: {
          title: "ReactTSApp",
          microApp: {
            name: "react app", // app name registered
            entry: "//localhost:3001",
            container: "#app-react",
            loader,
            activeRule: "/app-react/index",
            props: { shared },
          },
          noCache: true,
          menuPath: "index",
          icon: "el-icon-coin",
        },
      },
    ],
  },
  {
    path: "/app-vue",
    component: Layout,
    children: [
      {
        path: "index*",
        name: "app-vue",
        component: Vue.extend({ ...MicroAppLayout, name: "AppVue" }),
        props: { id: "app-vue" },
        meta: {
          title: "VueApp",
          microApp: {
            name: "vue app", // app name registered
            entry: "//localhost:3002",
            container: "#app-vue",
            loader,
            activeRule: "/app-vue/index",
            props: { shared },
          },
          noCache: true,
          menuPath: "index",
          icon: "el-icon-coin",
        },
      },
    ],
  },
  {
    path: "/app-purehtml",
    component: Layout,
    children: [
      {
        path: "index",
        name: "app-purehtml",
        component: Vue.extend({ ...MicroAppLayout, name: "AppPurehtml" }),
        props: { id: "app-purehtml" },
        meta: {
          title: "PureHTMLApp",
          microApp: {
            name: "purehtml app", // app name registered
            entry: "//localhost:3003",
            container: "#app-purehtml",
            loader,
            activeRule: "/app-purehtml/index",
            props: { shared },
          },
          icon: "el-icon-coin",
        },
      },
    ],
  },
];

export default microAppRoutes;
