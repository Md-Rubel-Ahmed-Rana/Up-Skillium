import { ILesson } from "./lesson.type";

export type IModule = {
  id: string;
  title: string;
  lessons: ILesson[];
};
