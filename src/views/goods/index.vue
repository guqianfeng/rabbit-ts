<script lang="ts" setup name="Goods">
import useStore from "@/store";
import { storeToRefs } from "pinia";
import { ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
import GoodsImage from "./components/goods-image.vue";
import GoodsSales from "./components/goods-sales.vue";
import GoodsName from "./components/goods-name.vue";
import GoodsSku from "./components/goods-sku.vue";
import GoodsDetail from "./components/goods-detail.vue";
import GoodsHot from "./components/goods-hot.vue";
import Message from "@/components/message";

const { goods, cart } = useStore();
const route = useRoute();

const { info } = storeToRefs(goods);

watchEffect(() => {
  const id = route.params.id as string;
  if (id && route.fullPath === `/goods/${id}`) {
    goods.resetGoodsInfo();
    goods.getGoodsInfo(id);
  }
});

let currentSkuId = ''

const changeSku = (skuId: string) => {
  // console.log(skuId)
  currentSkuId = skuId
  const res = info.value.skus.find((item) => item.id === skuId);
  if (!res) return;
  // console.log(res)
  info.value.oldPrice = res.oldPrice;
  info.value.price = res.price;
  info.value.inventory = res.inventory;
};

const count = ref(5)

const addCart = async () => {
  if (!currentSkuId) {
    Message.warning('请选择好规格')
    return;
  }
  // console.log('add cart')
  await cart.addCart({
    skuId: currentSkuId,
    count: count.value
  })
  Message.success('购物车加入成功')
}
</script>
<template>
  <div class="xtx-goods-page">
    <div class="container">
      <div v-if="info.categories">
        <!-- 面包屑 -->
        <XtxBread>
          <XtxBreadItem to="/">首页</XtxBreadItem>
          <XtxBreadItem :to="`/category/${info.categories[1].id}`">
            {{ info.categories[1].name }}
          </XtxBreadItem>
          <XtxBreadItem :to="`/category/sub/${info.categories[0].id}`">
            {{ info.categories[0].name }}
          </XtxBreadItem>
          <XtxBreadItem>{{ info.name }}</XtxBreadItem>
        </XtxBread>
        <!-- 商品信息 -->
        <!-- 商品信息 -->
        <div class="goods-info">
          <div class="media">
            <GoodsImage :images="info.mainPictures"></GoodsImage>
            <GoodsSales />
          </div>
          <div class="spec">
            <GoodsName :goods="info" />
            <GoodsSku :goods="info" @change-sku="changeSku" />
            <XtxNumbox v-model="count"/>

            <XtxButton type="primary" style="margin-top: 20px;" @click="addCart">加入购物车</XtxButton>
          </div>
        </div>
        <!-- 商品详情 -->
        <div class="goods-footer">
          <div class="goods-article">
            <!-- 商品+评价 -->
            <div class="goods-tabs">
              <GoodsDetail :goods="info"/>
            </div>
          </div>
          <!-- 24热榜+专题推荐 -->
          <div class="goods-aside">
            <GoodsHot :type="1"/>
            <GoodsHot :type="2"/>
            <GoodsHot :type="3"/>
          </div>
        </div>
      </div>
      <!-- 占位的内容，不要复制在这里 -->
      <div v-else>
        <!-- 面包屑 -->
        <XtxBread>
          <XtxBreadItem to="/">首页</XtxBreadItem>
        </XtxBread>
        <!-- 商品信息 -->
        <div class="goods-info"></div>
        <!-- 商品详情 -->
        <div class="goods-footer">
          <div class="goods-article">
            <!-- 商品+评价 -->
            <div class="goods-tabs"></div>
          </div>
          <!-- 24热榜+专题推荐 -->
          <div class="goods-aside"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;
  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }
  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}

.goods-footer {
  display: flex;
  margin-top: 20px;

  .goods-article {
    width: 940px;
    margin-right: 20px;
  }

  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}

.goods-tabs {
  min-height: 600px;
  background: #fff;
}

.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}
</style>
