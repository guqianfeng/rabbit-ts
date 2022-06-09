<script lang="ts" setup>
import HomeBanner from "./components/home-banner.vue";
import HomeCategory from "./components/home-category.vue";
import HomeNew from "./components/home-new.vue";
import HomeHot from "./components/home-hot.vue";
import HomeBrand from "./components/home-brand.vue";
import HomeProduct from "./components/home-product.vue";
import HomeSpecial from "./components/home-special.vue";
</script>

<template>
  <div class="page-home">
    <!-- 首页轮播 -->
    <div class="home-entry">
      <div class="container">
        <!-- 左侧分类 -->
        <HomeCategory />
        <!-- banner轮播图 -->
        <HomeBanner />
      </div>
    </div>
    <!-- 新鲜好物 -->
    <HomeNew />
    <!-- 人气推荐 -->
    <HomeHot />
    <!-- 热门品牌 -->
    <HomeBrand />
    <!-- 生鮮产品 -->
    <HomeProduct />
    <!-- 最新专题 -->
    <HomeSpecial />
  </div>
</template>

<style lang="less" scoped></style>
