import { Types } from "mongoose";

export type ICart = {
  user: Types.ObjectId;
  course: Types.ObjectId;
};
