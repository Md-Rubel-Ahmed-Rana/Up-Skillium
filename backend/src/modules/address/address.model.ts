import { model, Schema } from "mongoose";
import { IAddress } from "./address.interface";
import schemaOption from "@/utils/schemaOption";

const addressSchema = new Schema<IAddress>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
      ref: "User",
    },

    local_address: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, "Local address must be at least 3 characters"],
      maxlength: [200, "Local address cannot exceed 200 characters"],
    },

    street: {
      type: String,
      required: true,
      trim: true,
      minlength: [2, "Street must be at least 2 characters"],
      maxlength: [120, "Street cannot exceed 120 characters"],
    },

    zip_code: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, "Zip code must be at least 3 characters"],
      maxlength: [20, "Zip code cannot exceed 20 characters"],
    },

    city: {
      type: String,
      required: true,
      trim: true,
      minlength: [2, "City must be at least 2 characters"],
      maxlength: [80, "City cannot exceed 80 characters"],
    },

    state: {
      type: String,
      required: true,
      trim: true,
      minlength: [2, "State must be at least 2 characters"],
      maxlength: [80, "State cannot exceed 80 characters"],
    },

    country: {
      type: String,
      required: true,
      trim: true,
      minlength: [2, "Country must be at least 2 characters"],
      maxlength: [80, "Country cannot exceed 80 characters"],
    },

    latitude: {
      type: Number,
      default: null,
      min: [-90, "Latitude must be at least -90"],
      max: [90, "Latitude cannot be greater than 90"],
    },

    longitude: {
      type: Number,
      default: null,
      min: [-180, "Longitude must be at least -180"],
      max: [180, "Longitude cannot be greater than 180"],
    },
  },
  schemaOption,
);

export const AddressModel = model<IAddress>("Address", addressSchema);
