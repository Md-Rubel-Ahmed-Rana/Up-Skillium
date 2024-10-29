import { model, Schema } from "mongoose";
import schemaOption from "../../utils/schemaOption";
import { IUser } from "./interface";

const addressSchema = new Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
});

const emergencyContactSchema = new Schema({
  name: { type: String, required: true },
  relationship: { type: String, required: true },
  phone: { type: String, required: true },
});

export const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    role: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Role",
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
    },
    dateOfBirth: {
      type: Date,
    },
    gender: {
      type: String,
    },
    address: {
      type: addressSchema,
    },
    emergencyContact: {
      type: emergencyContactSchema,
    },
  },
  schemaOption
);

export const User = model("User", userSchema);
