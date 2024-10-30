import { Types } from "mongoose";

type IAddress = {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

type IEmergencyContact = {
  name: string;
  relationship: string;
  phone: string;
};

export type ICreateUser = {
  name: string;
  email: string;
  role: string | Types.ObjectId;
  password: string;
};

export type IGetUser = {
  id: string;
  name: string;
  image: string;
  email: string;
  role: Types.ObjectId;
  dateOfBirth: Date;
  gender: string;
  address: IAddress;
  emergencyContact: IEmergencyContact;
  phoneNumber: string;
};
export type IUser = {
  name: string;
  image: string;
  email: string;
  role: Types.ObjectId;
  dateOfBirth: Date;
  password: string;
  gender: string;
  address: IAddress;
  emergencyContact: IEmergencyContact;
  phoneNumber: string;
};

export type IUserBasicInfo = {
  email: string;
  phoneNumber: string;
  dateOfBirth: Date;
  gender: string;
};
