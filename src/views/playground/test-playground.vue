<template>
  <div class="my-box">
    <h1 id="my-h1" class="my-h1-cls">你好啊</h1>
    <!-- <XtxMessage type="success">成功啦</XtxMessage>
    <XtxMessage type="error">失败啦</XtxMessage> -->
    <button @click="handleShow">show</button>
    <!-- <XtxConfirm title="confirm-title" text="confirm-text"/> -->
    <div class="father">
      <Teleport to="body">
        <XtxDialog title="我是大标题" v-model:visible="dialogVisible">
          <ul>
            <li>123</li>
            <li>4</li>
            <li>5</li>
            <li>6</li>
          </ul>
          <template #footer>
            <XtxButton type="gray" style="margin-right: 20px" @click="dialogVisible = false">否</XtxButton>
            <XtxButton type="primary" @click="dialogVisible = false">是</XtxButton>
          </template>
        </XtxDialog>
      </Teleport>
    </div>

  </div>
</template>

<script setup lang="ts">
import { h, onMounted, ref, render } from 'vue';
import XtxMessage from '@/components/message/index.vue'
import Message from '@/components/message';
import XtxConfirm from '@/components/confirm/confirm.vue'
import Confirm from '@/components/confirm';

const vNode = h('h1', {
  className: 'my-h1-cls'
}, '你好啊')
console.log(vNode)
const vNodeMsg = h(XtxMessage, { type: 'error' }, '你出错了')
onMounted(() => {
  // render(vNode, document.querySelector('.my-box')!)
  // render(vNodeMsg, document.querySelector('.my-box')!)
})

const handleShow = () => {
  console.log('show')
  // Message({
  //   type: 'success',
  //   text: '成功啦'
  // })
  // Message.success('你成功啦')
  // Confirm({
  //   title: '123',
  //   text: '546'
  // }).then(() => {
  //   console.log('点击了确认')
  // }).catch(() => {
  //   console.log('点击了取消')
  // })
  dialogVisible.value = true
}

const dialogVisible = ref(false)
</script>

<style scoped>
:deep(.my-h1-cls) {
  color: red;
}

.father {
  transform: translateX(1px);
}
</style>