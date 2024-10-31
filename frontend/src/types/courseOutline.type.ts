export type ICourseOutline = {
  id: string;
  description: string;
  course: ICourseForOutline;
  modules: IModuleOutline[];
  createdAt: Date;
  updatedAt: Date;
};

export type ICourseForOutline = {
  id: string;
  title: string;
  image: string;
  price: {
    original: number;
    discount: number;
    salePrice: number;
  };
};

export type IModuleOutline = {
  id: string;
  name: string;
};
