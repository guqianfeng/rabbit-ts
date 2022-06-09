<script lang="ts" setup name="XtxCarousel">
import { BannerItem } from "@/types/data";
import { onMounted, onUnmounted, ref } from "vue";

//
const {
  slides,
  autoplay = false,
  duration = 3000,
} = defineProps<{
  slides: BannerItem[];
  autoplay?: boolean;
  duration?: number;
}>();

const activeIndex = ref(0);

const onPrevClick = () => {
  activeIndex.value--;
  if (activeIndex.value < 0) {
    activeIndex.value = slides.length - 1;
  }
};

const onNextClick = () => {
  activeIndex.value++;
  // if (activeIndex.value > slides.length - 1) {
  //   activeIndex.value = 0
  // }
  activeIndex.value %= slides.length;
  // console.log(activeIndex.value)
};

let timer: number = 0;

const play = () => {
  if (!autoplay) return;
  timer && clearInterval(timer);
  timer = window.setInterval(() => {
    onNextClick();
  }, duration);
};

const stop = () => {
  clearInterval(timer);
};

onMounted(() => {
  play();
});
onUnmounted(() => {
  stop();
});
</script>

<template>
  <div class="xtx-carousel" @mouseenter="stop" @mouseleave="play">
    <ul class="carousel-body">
      <li
        :class="{ fade: activeIndex === index }"
        class="carousel-item"
        v-for="(item, index) in slides"
        :key="item.id"
      >
        <RouterLink :to="item.hrefUrl">
          <img :src="item.imgUrl" alt="" />
        </RouterLink>
      </li>
    </ul>
    <a href="javascript:;" class="carousel-btn prev" @click="onPrevClick"
      ><i class="iconfont icon-angle-left"></i
    ></a>
    <a href="javascript:;" class="carousel-btn next" @click="onNextClick"
      ><i class="iconfont icon-angle-right"></i
    ></a>
    <div class="carousel-indicator">
      <span
        :class="{ active: activeIndex === index }"
        v-for="(item, index) in slides"
        :key="item.id"
        @mouseenter="activeIndex = index"
      ></span>
    </div>
  </div>
</template>

<style scoped lang="less">
.xtx-carousel {
  width: 100%;
  height: 100%;
  min-width: 300px;
  min-height: 150px;
  position: relative;
  .carousel {
    &-body {
      width: 100%;
      height: 100%;
    }
    &-item {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      transition: opacity 0.5s linear;
      &.fade {
        opacity: 1;
        z-index: 1;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    &-indicator {
      position: absolute;
      left: 0;
      bottom: 20px;
      z-index: 2;
      width: 100%;
      text-align: center;
      span {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 50%;
        cursor: pointer;
        ~ span {
          margin-left: 12px;
        }
        &.active {
          background: #fff;
        }
      }
    }
    &-btn {
      width: 44px;
      height: 44px;
      background: rgba(0, 0, 0, 0.2);
      color: #fff;
      border-radius: 50%;
      position: absolute;
      top: 228px;
      z-index: 2;
      text-align: center;
      line-height: 44px;
      opacity: 0;
      transition: all 0.5s;
      &.prev {
        left: 20px;
      }
      &.next {
        right: 20px;
      }
    }
  }
  &:hover {
    .carousel-btn {
      opacity: 1;
    }
  }
}
</style>
