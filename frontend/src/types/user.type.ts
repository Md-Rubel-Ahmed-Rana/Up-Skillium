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

export type IRole = {
  id: string;
  role: string;
  permissions: string[];
};

export type IUser = {
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
