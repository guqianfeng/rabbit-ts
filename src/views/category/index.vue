<template>
  <div class="category">分类组件 - {{route.params}}</div>
</template>

<script lang="ts" name="TopCategory" setup>
import { useRoute } from 'vue-router';

const route = useRoute()

console.log('category index')
</script>

<style></style>