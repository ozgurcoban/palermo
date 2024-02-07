export interface IMenuItem {
  id: string;
  title: string;
  description: string;
  price: string;
  flag?: string;
}

export interface ISubCategory {
  sub_category_title: string;
  description: string;
  menu_list: IMenuItem[];
}

export declare type IMenuList = IMenuItem | ISubCategory;
