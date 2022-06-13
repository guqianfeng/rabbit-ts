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

// 顶级分类类型
export type TopCategory = {
  id: string;
  name: string;
  picture: string;
  children: CategoryItem[];
};

export type SaleProperty = {
  id: string;
  name: string;
  properties: {
    id: string;
    name: string;
  }[];
};

export type SubCategory = {
  id: string;
  name: string;
  picture?: any;
  parentId: string;
  parentName: string;
  brands: {
    id: string;
    name: string;
    nameEn: string;
    logo: string;
    picture: string;
    type?: any;
    desc: string;
    place: string;
  }[];
  saleProperties: SaleProperty[];
  goods: GoodsItem[];
};

// 商品模块的类型声明
export type GoodsInfo = {
  id: string;
  name: string;
  spuCode: string;
  desc: string;
  price: string;
  oldPrice: string;
  discount: number;
  inventory: number;
  salesCount: number;
  commentCount: number;
  collectCount: number;
  mainVideos: any[];
  videoScale: number;
  mainPictures: string[];
  isPreSale: boolean;
  isCollect?: any;
  recommends?: any;
  userAddresses?: any;
  evaluationInfo?: any;
  categories: {
    id: string;
    name: string;
  }[];
  specs: Spec[];
  skus: Sku[];
  details: GoodsDetail
};

// 商品的规格类型
export type Spec = {
  name: string;
  values: SpecValue[];
};

export type SpecValue = {
  desc: string;
  name: string;
  picture: string;
  selected: boolean;
  disabled: boolean;
};

export type Sku = {
  id: string;
  inventory: number;
  oldPrice: string;
  price: string;
  skuCode: string;
  specs: {
    name: string;
    valueName: string;
  }[];
};

type GoodsDetail = {
  pictures: string[]
  properties: {
    name: string
    value: string
  }[]
}