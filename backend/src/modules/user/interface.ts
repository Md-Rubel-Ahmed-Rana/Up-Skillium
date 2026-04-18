import { Types } from "mongoose";

export type IEmergencyContact = {
  name: string;
  relationship: string;
  phone: string;
};

export type ICreateUser = {
  name: string;
  email: string;
  role: string | Types.ObjectId;
  userRoleId?: string;
  roleName?: string;
  password: string;
};

export type IGetUser = {
  id: string;
  name: string;
  image: string;
  email: string;
  designation: string;
  role: Types.ObjectId;
  userRoleId: string;
  roleName: string;
  dateOfBirth: Date;
  gender: string;
  address: Types.ObjectId;
  emergencyContact: IEmergencyContact;
  phoneNumber: string;
};
export type IUser = {
  name: string;
  image: string;
  email: string;
  designation: string;
  role: Types.ObjectId;
  userRoleId: string;
  roleName: string;
  dateOfBirth: Date;
  password: string;
  gender: string;
  status: "active" | "inactive";
  address?: Types.ObjectId;
  emergencyContact: IEmergencyContact;
  phoneNumber: string;
};

export type IUserBasicInfo = {
  email: string;
  phoneNumber: string;
  dateOfBirth: Date;
  gender: string;
};

export type UserAnalyticsParams = {
  startDate?: string;
  endDate?: string;
};
