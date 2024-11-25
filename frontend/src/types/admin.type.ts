import { IUser } from "./user.type";

export type IAdmin = {
  id: string;
  adminId: string;
  createdAt: Date;
  updatedAt: Date;
  user: IUser;
};
