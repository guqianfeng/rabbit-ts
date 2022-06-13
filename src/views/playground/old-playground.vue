<template>
  <XtxMessage type="success">success info</XtxMessage>
  <h1>我是父组件 - {{money}} - {{score}}</h1>
  <hr>
  <Son v-model:money="money" v-model="score"/>
  <br><br><br><br><br><br><br><br><br><br>
  <button @click="flag = !flag">切换</button>
  <Transition name="bounce">
    <div class="play-box" v-if="flag"></div>
  </Transition>
  <div class="box">playground</div>
  <img src="" alt="" ref="target" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useIntersectionObserver } from "@vueuse/core";
import Son from "./components/son.vue";
const flag = ref(true);
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
const money = ref(100)
const changeHandle = (value: number) => {
  if (value < 90) {
    alert('别花了')
  } else {
    money.value = value
  }
}
const score = ref(0)
</script>

<style scoped lang="less">
.play-box {
  width: 500px;
  height: 500px;
  background: pink;
}
.box {
  height: 2000px;
  background-color: red;
}
.v-enter-from {
  opacity: 0;
  width: 30px;
  height: 30px;
}
.v-enter-active,
.v-leave-active {
  transition: 1s;
}
.v-enter-to {
  opacity: 1;
  width: 500px;
  height: 500px;
}

.v-leave-from {
  opacity: 1;
  transform: translateX(0);
}

.v-leave-to {
  opacity: 0;
  transform: translateX(500px);
}

@keyframes bounce {
  0% {
    transform: scale(0);
  }
  25% {
    transform: scale(1.2);
  }
  50% {
    transform: scale(0.5);
  }
  75% {
    transform: scale(2);
  }
  100% {
    transform: scale(1);
  }
}

.bounce-enter-active {
  animation: bounce 2s linear;
}
.bounce-leave-active {
  animation: bounce 2s linear reverse;
}
</style>
