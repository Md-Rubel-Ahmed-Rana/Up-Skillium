export type ICourseOutline = {
  id: string;
  course: ICourseForOutline;
  modules: IModuleOutline[];
  createdAt: Date | null;
  updatedAt: Date | null;
};

export type ICourseForOutline = {
  id: string;
  title: string;
  image: string;
  price?: {
    original: number;
    discount: number;
    salePrice: number;
  };
};

export type IModuleOutline = {
  id: string;
  name: string;
  serial: number;
  createdAt: Date;
  updatedAt: Date;
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

export type ICreateModuleOutline = {
  name: string;
  serial: number;
};

export type ICreateOutline = {
  course: string;
  modules: ICreateModuleOutline[];
};
