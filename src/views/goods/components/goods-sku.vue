<script setup lang="ts" name="GoodsSku">
// 1369155859933827074; 1379052170040578049
import { GoodsInfo, Spec, SpecValue } from "@/types/data";
import bwPowerSet from "@/utils/power-set";

const props = defineProps<{
  goods: GoodsInfo;
}>();

const changeSelected = (spec: Spec, specValue: SpecValue) => {
  if (specValue.disabled) return;
  if (specValue.selected) {
    specValue.selected = false;
  } else {
    spec.values.forEach((item) => (item.selected = false));
    specValue.selected = true;
  }
};

// console.log(bwPowerSet(['红色', '128G', '港版']));
const getPathMap = () => {
  const pathMap: { [key: string]: string[] } = {};
  // 1. 先过滤有效的sku
  const skus = props.goods.skus.filter((sku) => sku.inventory);
  // console.log(skus)
  // 2. 遍历拿到对应的属性
  skus.forEach((sku) => {
    const attributes = sku.specs.map((item) => item.valueName);
    // console.log(attributes)
    // 获取子集
    const powerSet = bwPowerSet(attributes);
    // console.log(powerSet)
    powerSet.forEach((set) => {
      // console.log(set)
      const key = set.join("+");
      // console.log(key)
      if (key in pathMap) {
        pathMap[key].push(sku.id);
      } else {
        pathMap[key] = [sku.id];
      }
    });
  });
  return pathMap;
};

const getDisabledStatus = () => {
  props.goods.specs.forEach((spec) => {
    // console.log(spec)
    spec.values.forEach((specValue) => {
      specValue.disabled = !(specValue.name in pathMap);
    });
  });
};

const pathMap = getPathMap();
// console.log(pathMap)
getDisabledStatus();
</script>
<template>
  <div class="goods-sku">
    <dl v-for="item in goods.specs" :key="item.name">
      <dt>{{ item.name }}</dt>
      <dd>
        <template v-for="sub in item.values" :key="sub.name">
          <img
            v-if="sub.picture"
            :class="{ selected: sub.selected, disabled: sub.disabled }"
            :src="sub.picture"
            alt=""
            @click="changeSelected(item, sub)"
          />
          <span
            v-else
            :class="{ selected: sub.selected, disabled: sub.disabled }"
            @click="changeSelected(item, sub)"
            >{{ sub.name }}</span
          >
        </template>
      </dd>
    </dl>
  </div>
</template>

<style scoped lang="less">
.sku-state-mixin () {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;

  &.selected {
    border-color: @xtxColor;
  }

  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}

.goods-sku {
  padding-left: 10px;
  padding-top: 20px;

  dl {
    display: flex;
    padding-bottom: 20px;
    align-items: center;

    dt {
      width: 50px;
      color: #999;
    }

    dd {
      flex: 1;
      color: #666;

      > img {
        width: 50px;
        height: 50px;
        margin-top: 5px;
        .sku-state-mixin ();
      }

      > span {
        display: inline-block;
        height: 30px;
        line-height: 30px;
        padding: 0 20px;
        margin-top: 5px;
        .sku-state-mixin ();
      }
    }
  }
}
</style>
