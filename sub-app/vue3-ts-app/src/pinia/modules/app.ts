import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
  state: () => {
    return {
      theme: "#1890ff",
    };
  },
  actions: {
    changeTheme(theme: string) {
      this.theme = theme;
    },
  },
});
