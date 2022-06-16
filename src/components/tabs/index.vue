<script setup lang="tsx" name="XtxTabs">
import { provide, toRefs, useSlots } from 'vue';

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', newValue: string): void
}>()

const {modelValue} = toRefs(props)
provide('activeNameValue', modelValue)

const slots = useSlots()
const VNode = () => {
  // console.log(props.modelValue)
  const defaultArr = slots.default?.()
  // console.log(panes)
  const panes: any = []
  defaultArr?.forEach((item: any) => {
    // console.log(item.type.name)
    if (item.type.name === 'XtxTabsPane') {
      panes.push(item)
    } else {
      // console.log(item.children)
      item.children.forEach((child: any) => {
        // console.log(child)
        panes.push(child)
      })
    }
  })
  const navs = (
    <nav>
      {panes?.map((item: any, index: number) => {
        // console.log(item)
        return (
          <a 
            class={{active: props.modelValue === item.props?.name}} 
            href="javascript:;"
            key={index}
            onClick={() => {
              emit('update:modelValue', item.props?.name)
            }}
          >{item.props?.label}</a>
        )
      })}

    </nav>
  )
  return (
    <div class="xtx-tabs">
      {[navs, panes]}
    </div>
  )
}
</script>

<template>
  <VNode />
</template>

<style lang="less">
.xtx-tabs {
  background: #fff;

  >nav {
    height: 60px;
    line-height: 60px;
    display: flex;
    border-bottom: 1px solid #f5f5f5;

    >a {
      width: 110px;
      border-right: 1px solid #f5f5f5;
      text-align: center;
      font-size: 16px;

      &.active {
        border-top: 2px solid @xtxColor;
        height: 60px;
        background: #fff;
        line-height: 56px;
      }
    }
  }
}
</style>