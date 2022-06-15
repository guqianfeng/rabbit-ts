<script lang="ts" setup name="XtxNumbox">
import { ComponentInternalInstance, getCurrentInstance } from 'vue';

//
const { proxy } = getCurrentInstance() as ComponentInternalInstance
const {modelValue, max = 100, min = 1, step = 1, showLabel = true} = defineProps<{
  modelValue: number,
  min?: number,
  max?: number,
  step?: number
  showLabel?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
}>()

const sub = () => {
  if (modelValue <= min) return;
  emit('update:modelValue', modelValue - step)
}

const add = () => {
  if (modelValue >= max) return;
  emit('update:modelValue', modelValue + step)
}

const handleChange = (e: Event) => {
  const el = e.target as HTMLInputElement
  let value = +el.value
  // console.log({min, value, max})
  if (isNaN(value)) value = 1
  value = Math.min(Math.max(min, value), max)
  // console.log(value)
  emit('update:modelValue', value)
  proxy!.$forceUpdate()
}
</script>
<template>
  <div class="xtx-numbox">
    <div class="label" v-if="showLabel">数量</div>
    <div class="numbox">
      <a href="javascript:;" @click="sub" :class="{not: min === modelValue}">-</a>
      <input type="text" :value="modelValue" @change="handleChange"/>
      <a href="javascript:;" @click="add" :class="{not: max === modelValue}">+</a>
    </div>
  </div>
</template>

<style scoped lang="less">
.xtx-numbox {
  display: flex;
  align-items: center;
  .label {
    width: 60px;
    color: #999;
    padding-left: 10px;
  }
  .numbox {
    width: 120px;
    height: 30px;
    border: 1px solid #e4e4e4;
    display: flex;
    > a {
      width: 29px;
      line-height: 28px;
      text-align: center;
      background: #f8f8f8;
      font-size: 16px;
      color: #666;
      &.not {
        cursor: not-allowed;
      }
      &:first-of-type {
        border-right: 1px solid #e4e4e4;
      }
      &:last-of-type {
        border-left: 1px solid #e4e4e4;
      }
    }
    > input {
      width: 60px;
      padding: 0 5px;
      text-align: center;
      color: #666;
    }
  }
}
</style>