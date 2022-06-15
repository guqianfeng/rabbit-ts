import { CartItem } from "@/types/cart";
import { ApiRes } from "@/types/data";
import request from "@/utils/request";
import { defineStore } from "pinia";
import useStore from "..";

const useCartStore = defineStore('cart', {
  // 状态
  state() {
    return {
      list: [] as CartItem[]// 购物车数组
    }
  },
  persist: true,
  // 计算
  getters: {
    isLogin(): boolean {
      const { user } = useStore()
      return !!user.profile.token
    },
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
    },
    isAllSelected(): boolean {
      return this.effectiveList.every(item => item.selected) && this.effectiveList.length > 0
    },
    selectedList(): CartItem[] {
      return this.effectiveList.filter(item => item.selected)
    },
    selectedCount(): number {
      return this.selectedList.reduce((cur, item) => cur + item.count, 0)
    },
    selectPrice(): string {
      return this.selectedList.reduce((cur, item) => cur + item.count * +item.nowPrice, 0).toFixed(2)
    }
  },
  // 方法
  actions: {
    async addCart(data: CartItem) {
      if (this.isLogin) {
        await request.post('/member/cart', {
          skuId: data.skuId,
          count: data.count
        })
        this.getCartList()
      } else {
        const good = this.list.find(item => item.skuId === data.skuId)
        if (good) {
          good.count += data.count
        } else {
          this.list.unshift(data)
        }
      }
    },
    // 获取购物车列表
    async getCartList() {
      if (this.isLogin) {
        const res = await request.get<ApiRes<CartItem[]>>('/member/cart')
        this.list = res.data.result
      } else {
        this.list.forEach(async (cartItem) => {
          const { skuId } = cartItem
          // 根据 skuId 获取最新商品信息
          const res = await request.get<ApiRes<CartItem>>(
            `/goods/stock/${skuId}`
          )
          // 保存最新商品信息
          const lastCartInfo = res.data.result
          // 更新商品现价
          cartItem.nowPrice = lastCartInfo.nowPrice
          // 更新商品库存
          cartItem.stock = lastCartInfo.stock
          // 更新商品是否有效
          cartItem.isEffective = lastCartInfo.isEffective
        })
      }
    },
    // 删除购物车商品
    async deleteCart(skuIds: string[]) {
      if (this.isLogin) {
        await request.delete('/member/cart', {
          data: { ids: skuIds }
        })
        // 重新获取最新购物车列表
        this.getCartList()
      } else {
        this.list = this.list.filter(item => !skuIds.includes(item.skuId))
      }
    },
    // 修改购物车商品
    async updateCart(
      skuId: string,
      data: { selected?: boolean; count?: number }
    ) {
      if (this.isLogin) {
        await request.put(`/member/cart/${skuId}`, data)
        // 重新获取最新购物车列表
        this.getCartList()
      } else {
        const good = this.effectiveList.find(item => item.skuId === skuId)
        if (data.selected !== undefined) {
          good!.selected = data.selected
        }
        if (data.count !== undefined) {
          good!.count = data.count
        }
      }

    },
    // 修改全选或者全不选
    async updateCartAllSelected(isSelected: boolean) {
      if (this.isLogin) {
        await request.put('/member/cart/selected', {
          selected: isSelected,
        })
        // 获取购物车列表
        this.getCartList()
      } else {
        this.effectiveList.forEach(item => {
          item.selected = isSelected
        })
      }
    },
    clearCartList() {
      this.list = []
    },
    // 合并购物车
    async mergeLocalCart() {
      const data = this.list.map(({ skuId, selected, count }) => ({
        skuId,
        selected,
        count
      }))
      await request.post('/member/cart/merge', data)
      // 合并成功，重新获取购物车列表
      this.getCartList()
    }
  },
});

export default useCartStore;