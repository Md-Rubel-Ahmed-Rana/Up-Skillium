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
  image?: string;
  name: string;
  email: string;
  role: Types.ObjectId;
  dateOfBirth?: Date;
  phoneNumber?: string;
  gender?: string;
  address?: IAddress;
  emergencyContact?: IEmergencyContact;
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