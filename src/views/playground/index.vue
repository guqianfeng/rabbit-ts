<template>
  <div>
    <XtxTabs v-model="activeName" @tab-click="handleTabClick">
      <XtxTabsPane label="全部订单" name="all">全部订单</XtxTabsPane>
      <XtxTabsPane 
        v-for="item in orderStatus" 
        :key="item.name" 
        :label="item.label" 
        :name="item.name"
      >{{item.label}}</XtxTabsPane>
    </XtxTabs>
  </div>
</template>

<script setup lang="ts">

import { ref } from 'vue';
const activeName = ref('all')

const orderStatus = [
  { name: 'unpay', label: '待付款' },
  { name: 'deliver', label: '待发货' },
  { name: 'receive', label: '待收货' },
  { name: 'comment', label: '待评价' },
  { name: 'complete', label: '已完成' },
  { name: 'cancel', label: '已取消' }
]

const handleTabClick = (obj: any) => {
  console.log(obj)
}
</script>

<style scoped>

</style>