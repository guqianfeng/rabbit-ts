<template>
  <div class="top-category">
    <div class="container">
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem>{{ category.topCategory.name }}</XtxBreadItem>
      </XtxBread>

      <XtxCarousel
        :slides="home.bannerList"
        style="height: 500px"
        autoplay
      ></XtxCarousel>

      <!-- 所有二级分类 -->
      <div class="sub-list">
        <h3>全部分类</h3>
        <ul>
          <li v-for="item in topCategory.children" :key="item.id">
            <RouterLink :to="`/category/sub/${item.id}`">
              <img v-lazy="item.picture" />
              <p>{{ item.name }}</p>
            </RouterLink>
          </li>
        </ul>
      </div>

      <!-- 分类关联商品 -->
      <div
        class="ref-goods"
        v-for="item in topCategory.children"
        :key="item.id"
      >
        <div class="head">
          <h3>- {{ item.name }} -</h3>
          <p class="tag">{{ item.name }}</p>
          <XtxMore />
        </div>
        <div class="body">
          <GoodsItem
            :goods="goodsItem"
            v-for="goodsItem in item.goods"
            :key="goodsItem.id"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" name="TopCategory" setup>
import useStore from "@/store";
import { storeToRefs } from "pinia";
import { watch, watchEffect } from "vue";
import { useRoute } from "vue-router";
import GoodsItem from "./components/goods-item.vue";

const route = useRoute();

// console.log("category index");
const { category, home } = useStore();

const { topCategory } = storeToRefs(category);

// watch(() => route.params.id, (newId) => {
//   if (!newId) return;
//   category.getTopCategory(route.params.id as string)
// }, {
//   immediate: true
// })

watchEffect(() => {
  if (!route.params.id) return;
  console.log(route.fullPath);
  if (route.fullPath !== `/category/${route.params.id}`) return;
  category.getTopCategory(route.params.id as string);
  // 没有分类接口，临时使用
  home.getBannerList();
});
</script>

<style lang="less">
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }

  .sub-list {
    margin-top: 20px;
    background-color: #fff;

    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;

      li {
        width: 168px;
        height: 160px;

        a {
          text-align: center;
          display: block;
          font-size: 16px;

          img {
            width: 100px;
            height: 100px;
          }

          p {
            line-height: 40px;
          }

          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
  }
}

.ref-goods {
  background-color: #fff;
  margin-top: 20px;
  position: relative;

  .head {
    .xtx-more {
      position: absolute;
      top: 20px;
      right: 20px;
    }

    .tag {
      text-align: center;
      color: #999;
      font-size: 20px;
      position: relative;
      top: -20px;
    }
  }

  .body {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0 65px 30px;
  }
}
</style>
