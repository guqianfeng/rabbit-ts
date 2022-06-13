<template>
    <div>
        <h1>我是子组件 - {{money}} - {{modelValue}}</h1>
        <button @click="changeMoney">花钱</button>
        <button @click="changeScore">加分</button>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    money: {
        type: Number,
        default: 0,
    },
    modelValue: {
        type: Number,
        default: 0,
    }
})

const emit = defineEmits<{
    (e: 'update:money', money: number): void
    (e: 'update:modelValue', score: number): void
}>()

const changeMoney = () => {
    // console.log('changeMoney')
    emit('update:money', props.money - 2)
}

const changeScore = () => {
    emit('update:modelValue', props.modelValue + 1)
}

</script>

<style scoped>

</style>