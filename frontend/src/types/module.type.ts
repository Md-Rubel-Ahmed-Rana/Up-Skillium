import { ILesson } from "./lesson.type";

export type IModule = {
  id: string;
  title: string;
  lessons: ILesson[];
};

export type IGetModule = {
  id: string;
  title: string;
  serial: number;
  createdAt: Date;
  updatedAt: Date;
  course: {
    id: string;
    title: string;
    image: string;
  };
  lessons: string[];
};
