import { Types } from "mongoose";

export type IAddress = {
  user: Types.ObjectId; // backend will add this from auth req user
  local_address: string;
  street: string;
  zip_code: string;
  city: string;
  state: string;
  country: string;
  latitude?: number;
  longitude?: number;
};

export type IAddressFilters = {
  country: string;
  zip_code: string;
  city: string;
};

export const addressSearchableFields = [
  "country",
  "city",
  "local_address",
  "street",
  "state",
  "zip_code",
];
export const addressFilterableFields = ["country", "city", "zip_code"];
