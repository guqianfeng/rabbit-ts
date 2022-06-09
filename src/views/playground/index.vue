<template>
  <div class="box">playground</div>
  <img src="" alt="" ref="target" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useIntersectionObserver } from "@vueuse/core";
// http://yjy-xiaotuxian-dev.oss-cn-beijing.aliyuncs.com/picture/2021-04-15/4a79180a-1a5a-4042-8a77-4db0b9c800a8.jpg
const target = ref<null | HTMLImageElement>(null);
const visible = ref(false);
const { stop } = useIntersectionObserver(
  target,
  ([{ isIntersecting }], observeElement) => {
    console.log({ isIntersecting, observeElement });
    if (isIntersecting) {
      visible.value = isIntersecting;
      target.value!.src =
        " http://yjy-xiaotuxian-dev.oss-cn-beijing.aliyuncs.com/picture/2021-04-15/4a79180a-1a5a-4042-8a77-4db0b9c800a8.jpg";
      stop();
    }
  }
);
</script>

<style scoped lang="less">
.box {
  height: 2000px;
  background-color: red;
}
</style>
