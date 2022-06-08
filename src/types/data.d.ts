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

interface BannerItem {
  id: string;
  imgUrl: string;
  hrefUrl: string;
  type: string;
}
