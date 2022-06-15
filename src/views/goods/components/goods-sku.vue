<script setup lang="ts" name="GoodsSku">
// 1369155859933827074; 1379052170040578049
import { GoodsInfo, Spec, SpecValue } from "@/types/data";
import bwPowerSet from "@/utils/power-set";

const props = defineProps<{
  goods: GoodsInfo;
  skuId?: string;
}>();

const emit = defineEmits<{
  (e: "changeSku", skuId: string): void;
}>();

const changeSelected = (spec: Spec, specValue: SpecValue) => {
  if (specValue.disabled) return;
  if (specValue.selected) {
    specValue.selected = false;
  } else {
    spec.values.forEach((item) => (item.selected = false));
    specValue.selected = true;
  }
  // const arr = getSelectedSpec()
  // console.log(arr)
  getDisabledStatus();

  const resultArr = getSelectedSpec().filter((item) => item);
  // console.log(resultArr, resultArr.length)
  if (resultArr.length === props.goods.specs.length) {
    // console.log('选完了')
    const key = resultArr.join("+");
    const result = pathMap[key];
    // console.log(result[0])
    emit("changeSku", result[0]);
  } else {
    emit('changeSku', '')
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
  const selectedArr = getSelectedSpec();
  props.goods.specs.forEach((spec, index) => {
    // console.log(spec)
    spec.values.forEach((specValue) => {
      const temp = [...selectedArr];
      temp[index] = specValue.name;
      // console.log(temp)
      const key = temp.filter((item) => item).join("+");
      specValue.disabled = !(key in pathMap);
    });
  });
};

const getSelectedSpec = () => {
  const arr: string[] = [];
  props.goods.specs.forEach((spec, index) => {
    // console.log(spec)
    const selected = spec.values.find((item) => item.selected);
    arr[index] = selected ? selected.name : "";
  });
  return arr;
};

const initSelected = () => {
  const skuId = props.skuId;
  if (!skuId) return;
  // console.log(skuId)
  const sku = props.goods.skus.find((item) => (item.id = skuId));
  if (!sku) return;
  // console.log(sku)
  props.goods.specs.forEach((spec, index) => {
    // console.log(spec, index, sku.specs[index].valueName)
    const btn = spec.values.find(
      (specValue) => specValue.name === sku.specs[index].valueName
    );
    btn!.selected = true;
  });
};

const pathMap = getPathMap();
// console.log(pathMap)
initSelected();
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
