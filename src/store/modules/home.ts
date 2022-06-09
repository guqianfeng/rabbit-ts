import { HotGoodsItem } from "./../../types/data.d";
import { ApiRes, BannerItem, NewGoodsItem } from "@/types/data";
import request from "@/utils/request";
import { defineStore } from "pinia";
export default defineStore("home", {
  state() {
    return {
      bannerList: [] as BannerItem[],
      newGoodsList: [] as NewGoodsItem[],
      hotGoodsList: [] as HotGoodsItem[],
    };
  },
  actions: {
    async getBannerList() {
      const res = await request.get<ApiRes<BannerItem[]>>("/home/banner");
      // console.log(res);
      this.bannerList = res.data.result;
    },
    async getNewGoodsList() {
      const res = await request.get<ApiRes<NewGoodsItem[]>>("/home/new");
      // console.log(res)
      this.newGoodsList = res.data.result;
    },
    async getHotGoodsList() {
      const res = await request.get<ApiRes<HotGoodsItem[]>>("/home/hot");
      // console.log(res)
      this.hotGoodsList = res.data.result;
    },
  },
});
