import { watch } from "vue";
import { useRoute, useRouter } from "vue-router";

export function useMicroApp() {
  const route = useRoute();

  const router = useRouter();

  watch(
    route,
    (value) => {
      const matched = value.matched.map((item) => ({
        ...item,
        path: router.options.history.base + item.path,
      }));
      window.dispatchEvent(
        new CustomEvent("micro-app-dispatch", {
          detail: { type: "UPDATE_ROUTES", payload: matched },
        })
      );
    },
    { immediate: true }
  );
}
