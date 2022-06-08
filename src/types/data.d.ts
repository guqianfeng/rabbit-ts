export type ApiRes<T> = {
  code: string;
  msg: string;
  result: T
}

export type CategoryItem = {
  id: string,
  name: string,
  picture: string,
  children: CategoryItem[]
}