<script name="XtxPayPage" setup lang="ts">
import { ApiRes, OrderPayInfo } from '@/types/data';
import { useCountdown } from '@/utils/hooks';
import request, { baseURL } from '@/utils/request';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import dayjs from 'dayjs'
import router from '@/router';
import Message from '@/components/message';

const route = useRoute()

const id = route.query.id;

// console.log(id)

const orderPayInfo = ref<OrderPayInfo>({} as OrderPayInfo)
const showTime = ref(0)

async function getOrderPayInfo () { 
    const res = await request.get<ApiRes<OrderPayInfo>>(`/member/order/${id}`)
    // console.log(res.data.result)
    orderPayInfo.value = res.data.result

    const {time, start} = useCountdown(res.data.result.countdown)
    start()

    watch(time, (value) => {
        // console.log(value)
        showTime.value = value
        if (value <= 0) {
            router.replace('/cart')
            Message.warning('支付超时')
        }
    }, {
        immediate: true
    })
}
getOrderPayInfo()

function formatTime (time: number) {
    return dayjs.unix(time).format('mm:ss')
}

// https://www.baidu.com/
// const redirectUrl = encodeURIComponent('https://www.baidu.com/')
const redirectUrl = encodeURIComponent('http://www.corho.com:8080/#/pay/callback')
const payUrl = `${baseURL}pay/aliPay?orderId=${route.query.id}&redirect=${redirectUrl}`
</script>
<template>
  <div class="xtx-pay-page">
    <div class="container">
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem to="/cart">购物车</XtxBreadItem>
        <XtxBreadItem>支付订单</XtxBreadItem>
      </XtxBread>
      <!-- 付款信息 -->
      <div class="pay-info">
        <span class="icon iconfont icon-queren2"></span>
        <div class="tip">
          <p>订单提交成功！请尽快完成支付。</p>
          <p>支付还剩 <span>{{formatTime(showTime)}}</span>, 超时后将取消订单</p>
        </div>
        <div class="amount">
          <span>应付总额：</span>
          <span>¥{{orderPayInfo.totalMoney}}</span>
        </div>
      </div>
      <!-- 付款方式 -->
      <div class="pay-type">
        <p class="head">选择以下支付方式付款</p>
        <div class="item">
          <p>支付平台</p>
          <a class="btn wx" href="javascript:;"></a>
          <a class="btn alipay" :href="payUrl"></a>
        </div>
        <div class="item">
          <p>支付方式</p>
          <a class="btn" href="javascript:;">招商银行</a>
          <a class="btn" href="javascript:;">工商银行</a>
          <a class="btn" href="javascript:;">建设银行</a>
          <a class="btn" href="javascript:;">农业银行</a>
          <a class="btn" href="javascript:;">交通银行</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.pay-info {
  background: #fff;
  display: flex;
  align-items: center;
  height: 240px;
  padding: 0 80px;
  .icon {
    font-size: 80px;
    color: #1dc779;
  }
  .tip {
    padding-left: 10px;
    flex: 1;
    p {
      &:first-child {
        font-size: 20px;
        margin-bottom: 5px;
      }
      &:last-child {
        color: #999;
        font-size: 16px;
      }
    }
  }
  .amount {
    span {
      &:first-child {
        font-size: 16px;
        color: #999;
      }
      &:last-child {
        color: @priceColor;
        font-size: 20px;
      }
    }
  }
}
.pay-type {
  margin-top: 20px;
  background-color: #fff;
  padding-bottom: 70px;
  p {
    line-height: 70px;
    height: 70px;
    padding-left: 30px;
    font-size: 16px;
    &.head {
      border-bottom: 1px solid #f5f5f5;
    }
  }
  .btn {
    width: 150px;
    height: 50px;
    border: 1px solid #e4e4e4;
    text-align: center;
    line-height: 48px;
    margin-left: 30px;
    color: #666666;
    display: inline-block;
    &.active,
    &:hover {
      border-color: @xtxColor;
    }
    &.alipay {
      background: url(https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/7b6b02396368c9314528c0bbd85a2e06.png)
        no-repeat center / contain;
    }
    &.wx {
      background: url(https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/c66f98cff8649bd5ba722c2e8067c6ca.jpg)
        no-repeat center / contain;
    }
  }
}
</style>