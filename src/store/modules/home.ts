import {
  Brand,
  HomeProduct,
  HotGoodsItem,
  Special,
} from "./../../types/data.d";
import { ApiRes, BannerItem, NewGoodsItem } from "@/types/data";
import request from "@/utils/request";
import { defineStore } from "pinia";
export default defineStore("home", {
  state() {
    return {
      bannerList: [] as BannerItem[],
      newGoodsList: [] as NewGoodsItem[],
      hotGoodsList: [] as HotGoodsItem[],
      brandList: [] as Brand[],
      productList: [] as HomeProduct[],
      specialList: [] as Special[],
    };
  },
  actions: {
    async getBannerList() {
      const res = await request.get<ApiRes<BannerItem[]>>("/home/banner");
      // console.log(res);
      this.bannerList = res.data.result;
    },
    async getNewGoodsList() {
      setTimeout(async () => {
        const res = await request.get<ApiRes<NewGoodsItem[]>>("/home/new");
        // console.log(res)
        this.newGoodsList = res.data.result;
      }, 200);
    },
    async getHotGoodsList() {
      setTimeout(async () => {
        const res = await request.get<ApiRes<HotGoodsItem[]>>("/home/hot");
        // console.log(res)
        this.hotGoodsList = res.data.result;
      }, 200);
    },
    async getBrandList() {
      setTimeout(async () => {
        const res = await request.get<ApiRes<Brand[]>>("/home/brand");
        // console.log(res)
        this.brandList = [
          ...res.data.result,
          ...res.data.result,
          ...res.data.result,
          ...res.data.result,
        ];
      }, 200);
    },
    async getProductList() {
      const res = await request.get<ApiRes<HomeProduct[]>>("/home/goods");
      this.productList = res.data.result;
    },
    async getSpecialList() {
      const res = await request.get<ApiRes<Special[]>>("/home/special");
      this.specialList = res.data.result;
    },
  },
});
