export type ICourseOutline = {
  id: string;
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

export type ICourseOutlineModuleSerialUpdate = {
  sourceObject: {
    serialNumber: number;
    moduleId: string;
  };
  destinationObject: {
    serialNumber: number;
    moduleId: string;
  };
};
