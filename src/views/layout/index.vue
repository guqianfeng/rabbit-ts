<script lang="ts" setup name="Layout">
import AppTopnav from "./components/app-topnav.vue";
import AppHeader from "./components/app-header.vue";
import AppFooter from "./components/app-footer.vue";
// Layout component
</script>
<template>
  <AppTopnav></AppTopnav>
  <AppHeader></AppHeader>
  <main class="app-body">
    <router-view></router-view>
  </main>
  <AppFooter></AppFooter>
</template>

<style lang="less" scoped>
.app-body {
  min-height: 600px;
}
</style>