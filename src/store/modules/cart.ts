import { CartItem } from "@/types/cart";
import { ApiRes } from "@/types/data";
import request from "@/utils/request";
import { defineStore } from "pinia";

const useCartStore = defineStore('cart', {
  // 状态
  state() {
    return {
      list: [] as CartItem[]// 购物车数组
    }
  },
  // 计算
  getters: {
    effectiveList(): CartItem[] {
      return this.list.filter(item => item.isEffective && item.stock > 0)
    },
    effectiveListCount(): number {
      return this.list.reduce((cur, item) => {
        return cur + item.count
      }, 0)
    },
    effectiveListPrice(): string {
      const totalPrice = this.list.reduce((cur, item) => {
        return cur + item.count * Number(item.nowPrice)
      }, 0)
      return totalPrice.toFixed(2)
    }
  },
  // 方法
  actions: {
    async addCart(data: { skuId: string; count: number }) {
      await request.post('/member/cart', data)
      this.getCartList()
    },
    // 获取购物车列表
    async getCartList() {
      const res = await request.get<ApiRes<CartItem[]>>('/member/cart')
      this.list = res.data.result
    },
    // 删除购物车商品
    async deleteCart(skuIds: string[]) {
      await request.delete('/member/cart', {
        data: { ids: skuIds }
      })
      // 重新获取最新购物车列表
      this.getCartList()
    }
  },
});

export default useCartStore;