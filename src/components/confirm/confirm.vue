<script lang="ts" setup name="XtxConfirm">
import XtxButton from '@/components/button/index.vue'
import { onMounted, ref } from 'vue';
const props = defineProps<{
  title: string,
  text: string,
  cancelCallback: () => void
  confirmCallback: () => void
}>()

const isShow = ref(false)
onMounted(() => {
  setTimeout(() => {
    isShow.value = true
  }, 20)
})
</script>
<template>
  <div class="xtx-confirm" :class="{'fade-in': isShow}">
    <div class="wrapper" :class="{'fade-in': isShow}">
      <div class="header">
        <h3>{{ title }}</h3>
        <a href="JavaScript:;" class="iconfont icon-close-new"></a>
      </div>
      <div class="body">
        <i class="iconfont icon-warning"></i>
        <span>{{ text }}</span>
      </div>
      <div class="footer">
        <XtxButton size="mini" type="gray" @click="cancelCallback">取消</XtxButton>
        <XtxButton size="mini" type="primary" @click="confirmCallback">确认</XtxButton>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.xtx-confirm {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 8888;
  background: rgba(0, 0, 0, 0);
  &.fade-in {
    transition: 0.5s;
    background: rgba(0, 0, 0, 0.5);
  }

  .wrapper {
    width: 400px;
    background: #fff;
    border-radius: 4px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -70%);
    &.fade-in {
      transition: 0.5s;
      transform: translate(-50%, -50%);
    }

    .header,
    .footer {
      height: 50px;
      line-height: 50px;
      padding: 0 20px;
    }

    .body {
      padding: 20px 40px;
      font-size: 16px;

      .icon-warning {
        color: @priceColor;
        margin-right: 3px;
        font-size: 16px;
      }
    }

    .footer {
      text-align: right;

      .xtx-button {
        margin-left: 20px;
      }
    }

    .header {
      position: relative;

      h3 {
        font-weight: normal;
        font-size: 18px;
      }

      a {
        position: absolute;
        right: 15px;
        top: 15px;
        font-size: 20px;
        width: 20px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        color: #999;

        &:hover {
          color: #666;
        }
      }
    }
  }
}

.confirm {
  &-enter {
    &-from {
      opacity: 0;
    }

    &-active {
      transition: all 0.5s;
    }

    &-to {
      opacity: 1;
    }
  }
}
</style>