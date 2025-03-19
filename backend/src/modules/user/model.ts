import { model, Schema } from "mongoose";
import schemaOption from "../../utils/schemaOption";
import { IUser } from "./interface";

const addressSchema = new Schema({
  street: { type: String },
  city: { type: String },
  state: { type: String },
  country: { type: String },
});

const emergencyContactSchema = new Schema({
  name: { type: String },
  relationship: { type: String },
  phone: { type: String },
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
    image: {
      type: String,
    },
    role: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Role",
    },
    roleName: {
      type: String,
      required: true,
    },
    userRoleId: {
      type: String,
      required: true,
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
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
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
