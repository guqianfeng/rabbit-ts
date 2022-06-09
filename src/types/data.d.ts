export type ApiRes<T> = {
  code: string;
  msg: string;
  result: T;
};

export type CategoryItem = {
  id: string;
  name: string;
  picture: string;
  children: CategoryItem[];
  open: boolean;
  goods: GoodsItem[];
};

export type GoodsItem = {
  desc: string;
  discount: null;
  id: string;
  name: string;
  orderNum: null;
  picture: string;
  price: string;
};

export interface BannerItem {
  id: string;
  imgUrl: string;
  hrefUrl: string;
  type: string;
}

export interface NewGoodsItem {
  id: string;
  name: string;
  desc: string;
  price: string;
  picture: string;
  discount?: any;
  orderNum: number;
}

export type HotGoodsItem = {
  id: string;
  picture: string;
  title: string;
  alt: string;
};

export type Brand = {
  id: string;
  name: string;
  nameEn: string;
  logo: string;
  picture: string;
  type?: any;
  desc: string;
  place: string;
};

// 首页商品推荐
export type HomeProduct = {
  id: string;
  name: string;
  picture: string;
  saleInfo: string;
  children: {
    id: string;
    name: string;
  }[];
  goods: {
    id: string;
    name: string;
    desc: string;
    price: string;
    picture: string;
    discount?: any;
    orderNum: number;
  }[];
};

export type Special = {
  creator: string;
  isDelete: number;
  createTime: string;
  updateTime: string;
  id: string;
  classificationId: string;
  title: string;
  summary: string;
  lowestPrice: number;
  cover: string;
  detailsUrl: string;
  collectNum: number;
  viewNum: number;
  replyNum: number;
};
