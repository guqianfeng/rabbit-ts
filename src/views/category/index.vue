<template>
  <div class="category">分类组件 - {{ route.params }}</div>
  <XtxBread>
    <XtxBreadItem>1</XtxBreadItem>
    <XtxBreadItem>2</XtxBreadItem>
    <XtxBreadItem>3</XtxBreadItem>
    <XtxBreadItem>4</XtxBreadItem>
  </XtxBread>
</template>

<script lang="ts" name="TopCategory" setup>
import { useRoute } from "vue-router";

const route = useRoute();

console.log("category index");
</script>

<style></style>
