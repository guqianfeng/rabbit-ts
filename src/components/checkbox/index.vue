<script lang="ts" setup name="XtxCheckbox">
//
const props = defineProps<{
    modelValue: boolean
}>()
const emit = defineEmits<{
    (e: 'update:modelValue', flag: boolean): void
    (e: 'change', flag: boolean): void
}>()
const changeChecked = () => {
    emit('update:modelValue', !props.modelValue)
    emit('change', !props.modelValue)
}
</script>

<template>
  <div class="xtx-checkbox" @click="changeChecked">
    <i v-if="modelValue" class="iconfont icon-checked"></i>
    <i v-else class="iconfont icon-unchecked"></i>
    <slot></slot>
  </div>
</template>

<style scoped lang="less">
.xtx-checkbox {
  display: inline-block;
  margin-right: 2px;
  .icon-checked {
    color: @xtxColor;
    ~ span {
      color: @xtxColor;
    }
  }
  i {
    position: relative;
    top: 1px;
  }
  span {
    margin-left: 2px;
  }
}
</style>

