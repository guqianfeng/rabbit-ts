import { useIntersectionObserver, useIntervalFn } from "@vueuse/core";
import { ref } from "vue";

export function useLazyData(cb: () => void) {
  const target = ref(null);
  const { stop } = useIntersectionObserver(
    target,
    ([{ isIntersecting }]) => {
      if (isIntersecting) {
        stop();
        cb();
      }
    },
    {
      threshold: 0,
    }
  );
  return target;
}

export function useCountdown(count: number = 60) {
  const { pause, resume } = useIntervalFn(() => {
    time.value--;
    if (time.value <= 0) {
      pause()
    }
  }, 1000, {
    immediate: false
  })

  const start = () => {
    time.value = count
    resume()
  }

  const time = ref(0)

  return {
    time,
    start
  }
}
