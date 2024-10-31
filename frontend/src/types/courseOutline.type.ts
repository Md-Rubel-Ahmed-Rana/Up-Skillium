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
};

export type IModuleOutline = {
  id: string;
  name: string;
};
