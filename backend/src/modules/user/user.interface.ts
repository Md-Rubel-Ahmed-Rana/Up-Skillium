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
  role: string;
  dateOfBirth?: Date;
  phoneNumber?: string;
  gender?: string;
  address?: IAddress;
  emergencyContact?: IEmergencyContact;
  permissions: string[];
  password: string;
};

export type IGetUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  dateOfBirth: Date;
  gender: string;
  address: IAddress;
  emergencyContact: IEmergencyContact;
  phoneNumber: string;
  permissions: string[];
  createdAt: Date;
  updatedAt: Date;
};
