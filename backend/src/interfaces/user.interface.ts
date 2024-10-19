import { Document } from "mongoose";

export type PostUser = {
  name: string;
  email: string;
  role: string;
  password: string;
};

export type UpdateUser = {
  name: string;
  email: string;
  role: string;
};

export type GetUser = {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
};

export const UserProjection = {
  name: 1,
  email: 1,
  role: 1,
  createdAt: 1,
  updatedAt: 1,
};

export type LoginUser = {
  email: string;
  password: string;
};

export interface IUser extends Document {
  name: string;
  email: string;
  role: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
