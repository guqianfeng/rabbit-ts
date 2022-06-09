import { useIntersectionObserver } from "@vueuse/core";
import { ref } from "vue";

export function useLazyData(cb: () => void) {
  const target = ref(null);
  const { stop } = useIntersectionObserver(target, ([{ isIntersecting }]) => {
    if (isIntersecting) {
      stop();
      cb();
    }
  });
  return target;
}
