import z from "zod";

const addressBodySchema = z.object({
  local_address: z
    .string()
    .trim()
    .min(3, "Local address must be at least 3 characters")
    .max(200, "Local address cannot exceed 200 characters"),

  street: z
    .string()
    .trim()
    .min(2, "Street must be at least 2 characters")
    .max(120, "Street cannot exceed 120 characters"),

  zip_code: z
    .string()
    .trim()
    .min(3, "Zip code must be at least 3 characters")
    .max(20, "Zip code cannot exceed 20 characters"),

  city: z
    .string()
    .trim()
    .min(2, "City must be at least 2 characters")
    .max(80, "City cannot exceed 80 characters"),

  state: z
    .string()
    .trim()
    .min(2, "State must be at least 2 characters")
    .max(80, "State cannot exceed 80 characters"),

  country: z
    .string()
    .trim()
    .min(2, "Country must be at least 2 characters")
    .max(80, "Country cannot exceed 80 characters"),

  latitude: z
    .number({
      invalid_type_error: "Latitude must be a number",
    })
    .min(-90, "Latitude must be at least -90")
    .max(90, "Latitude cannot be greater than 90")
    .optional(),

  longitude: z
    .number({
      invalid_type_error: "Longitude must be a number",
    })
    .min(-180, "Longitude must be at least -180")
    .max(180, "Longitude cannot be greater than 180")
    .optional(),
});

const createAddressSchema = z.object({
  body: addressBodySchema.strict(),
});

const updateAddressSchema = z.object({
  body: addressBodySchema
    .strict()
    .partial()
    .refine((data) => Object.keys(data).length > 0, {
      message: "At least one field is required to update address",
    }),
});

export const addressValidation = {
  create: createAddressSchema,
  update: updateAddressSchema,
};
