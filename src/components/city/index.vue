<script lang="ts" setup name="XtxCity">
import axios from "axios";
import { ref, watch } from "vue";
import { onClickOutside } from "@vueuse/core";
export type CityResult = {
  provinceCode: string;
  provinceName: string;
  cityCode: string;
  cityName: string;
  countyCode: string;
  countyName: string;
};
// 城市列表类型
export type AreaList = {
  code: string;
  level: number;
  name: string;
  areaList: AreaList[];
};
const active = ref(false);
const toggle = () => {
  active.value = !active.value;
};
const cityList = ref<AreaList[]>([]);
const cacheCityList = ref<AreaList[]>([]);
const getCityList = async () => {
  const res = await axios.get<AreaList[]>(
    "https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json"
  );
  cityList.value = res.data;
  cacheCityList.value = res.data;
};

getCityList();

// 选择城市
const changeResult = ref<CityResult>({
  provinceCode: "",
  provinceName: "",
  cityCode: "",
  cityName: "",
  countyCode: "",
  countyName: "",
});

const handleClick = (item: AreaList) => {
  if (item.level === 0) {
    changeResult.value.provinceCode = item.code;
    changeResult.value.provinceName = item.name;
    cityList.value = item.areaList;
  }
  if (item.level === 1) {
    changeResult.value.cityCode = item.code;
    changeResult.value.cityName = item.name;
    cityList.value = item.areaList;
  }
  if (item.level === 2) {
    changeResult.value.countyCode = item.code;
    changeResult.value.countyName = item.name;
    active.value = false;
    emit("changeCity", changeResult.value);
  }
};

watch(active, (value) => {
  if (!value) {
    cityList.value = cacheCityList.value;
  }
});

const target = ref(null);
onClickOutside(target, (e) => {
  active.value = false;
});

defineProps<{
  useAddress?: string;
}>();

const emit = defineEmits<{
  (e: "changeCity", value: CityResult): void;
}>();
</script>
<template>
  <div class="xtx-city" ref="target">
    <div class="select" :class="{ active }" @click="toggle">
      <span class="value" v-if="useAddress">{{ useAddress }}</span>
      <span class="placeholder" v-else>请选择配送地址</span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="option" v-show="active">
      <span
        @click="handleClick(item)"
        class="ellipsis"
        v-for="item in cityList"
        :key="item.code"
        >{{ item.name }}</span
      >
    </div>
  </div>
</template>

<style scoped lang="less">
.xtx-city {
  display: inline-block;
  position: relative;
  z-index: 400;

  .select {
    border: 1px solid #e4e4e4;
    height: 30px;
    padding: 0 5px;
    line-height: 28px;
    cursor: pointer;

    &.active {
      background: #fff;
    }

    .placeholder {
      color: #999;
    }

    .value {
      color: #666;
      font-size: 12px;
    }

    i {
      font-size: 12px;
      margin-left: 5px;
    }
  }

  .option {
    width: 542px;
    border: 1px solid #e4e4e4;
    position: absolute;
    left: 0;
    top: 29px;
    background: #fff;
    min-height: 30px;
    line-height: 30px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;

    > span {
      width: 130px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
      padding: 0 3px;

      &:hover {
        background: #f5f5f5;
      }
    }
  }
}
</style>
