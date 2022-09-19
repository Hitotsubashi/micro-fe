import { inject, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

export function useMicroApp() {
  const $shared = inject("$shared") as any;

  const route = useRoute();

  const router = useRouter();

  watch(
    route,
    (value) => {
      const matched = value.matched.map((item) => ({
        ...item,
        path: router.options.history.base + item.path,
      }));
      console.log(matched);
      $shared.dispatch({ type: "UPDATE_ROUTES", payload: matched });
    },
    { immediate: true }
  );
}
