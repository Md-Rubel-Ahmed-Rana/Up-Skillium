import { IUser } from "./user.type";

export type IEducation = {
  id: string;
  institute: string;
  degree: string;
  status: "studying" | "passed";
  user: IUser;
  start: Date;
  end: Date;
  createdAt: Date;
  updatedAt: Date;
};
