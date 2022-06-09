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
