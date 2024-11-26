import { IRole } from "./role.type";

type IAddress = {
  street: string;
  city: string;
  state: string;
  country: string;
};

type IEmergencyContact = {
  name: string;
  relationship: string;
  phone: string;
};

export type IUser = {
  _id: string;
  id: string;
  name: string;
  image: string;
  email: string;
  role: IRole;
  dateOfBirth: Date;
  gender: string;
  address: IAddress;
  emergencyContact: IEmergencyContact;
  phoneNumber: string;
};
