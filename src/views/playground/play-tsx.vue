<template>
  <div>
    <MyBox />
  </div>
</template>

<script setup lang="tsx">
import { ref } from 'vue';
import Son from './components/son.vue'

const arr = [0, 1, 2, 3]
const money = ref(0)
const MyBox = function () {
  return (
    (
      <div>
        <Son></Son>
        <h1>box - {money.value}</h1>
        {money.value < 5 ? (
          <button onClick={() => {
            money.value++
          }}>加钱</button>
        ) : (
          <ul>
          {arr.map(item => (
            <li>{item}</li>
          ))}
        </ul>
        )}
        
        
      </div>
    )
  )
}
</script>

<style scoped>
</style>