<script setup lang="ts">
import request from './utils/request'
async function test () {
  const res = await request.get('/home/index')
  console.log(res)
}
test()
</script>

<template>
  <div>i am app</div>
</template>

<style>

</style>
