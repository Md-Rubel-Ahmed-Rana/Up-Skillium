import ApiError from "@/shared/apiError";
import {
  addressSearchableFields,
  IAddress,
  IAddressFilters,
} from "./address.interface";
import { AddressModel } from "./address.model";
import { HttpStatusCode } from "@/lib/httpStatus";
import { Types } from "mongoose";
import { IPaginationOptions } from "@/interfaces/common";
import { calculatePagination } from "@/utils/pagination";
import { IRoles, ROLES } from "@/constants/roles";

class Service {
  private addressNotFound =
    "Address not found or you are not authorized to update it";
  async create(data: IAddress) {
    const isExist = await AddressModel.findOne({ user: data.user });
    if (isExist) {
      throw new ApiError(
        HttpStatusCode.CONFLICT,
        "You have already added your address. You can't add more than one. Please update it if needed.",
      );
    }
    const address = await AddressModel.create(data);
    return address;
  }

  async getAll(
    options: IPaginationOptions,
    filters: IAddressFilters,
    search_query: string,
  ) {
    const {
      page = 1,
      sortBy = "createdAt",
      sortOrder = "desc",
      limit,
      skip,
    } = calculatePagination(options, 50);

    const andConditions: any = [];

    // search
    if (search_query) {
      andConditions.push({
        $or: addressSearchableFields.map((field: string) => {
          return {
            [field]: {
              $regex: search_query,
              $options: "i",
            },
          };
        }),
      });
    }

    // filters
    const { city, zip_code, country } = filters;
    if (zip_code) {
      andConditions.push({
        zip_code,
      });
    }
    if (city) {
      andConditions.push({
        city,
      });
    }

    if (country) {
      andConditions.push({
        country,
      });
    }

    const whereConditions =
      andConditions.length > 0 ? { $and: andConditions } : {};

    const result = await AddressModel.find(whereConditions)
      .sort({ [sortBy]: sortOrder === "desc" ? -1 : 1 })
      .skip(skip)
      .limit(limit)
      .populate("user", "name profile_picture image");

    const total = await AddressModel.countDocuments(whereConditions);

    return {
      meta: {
        page,
        limit: limit,
        max_limit: 50,
        total,
      },
      data: result,
    };
  }

  async getById(id: Types.ObjectId) {
    const address = await AddressModel.findById(id);

    if (!address) {
      throw new ApiError(HttpStatusCode.NOT_FOUND, this.addressNotFound);
    }

    return address;
  }

  async getByUser(user: Types.ObjectId) {
    const address = await AddressModel.findOne({ user });
    if (!address) {
      throw new ApiError(HttpStatusCode.NOT_FOUND, this.addressNotFound);
    }
    return address;
  }

  async updateByUser(
    id: Types.ObjectId,
    userId: Types.ObjectId,
    payload: Partial<IAddress>,
  ) {
    const { user, ...updateData } = payload;

    const address = await AddressModel.findOneAndUpdate(
      { _id: id, user: userId },
      updateData,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!address) {
      throw new ApiError(HttpStatusCode.NOT_FOUND, this.addressNotFound);
    }

    return address;
  }

  async updateByAdmin(id: Types.ObjectId, payload: Partial<IAddress>) {
    const { user, ...updateData } = payload;

    const address = await AddressModel.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!address) {
      throw new ApiError(HttpStatusCode.NOT_FOUND, this.addressNotFound);
    }

    return address;
  }

  async update(
    id: Types.ObjectId,
    userId: Types.ObjectId,
    role: IRoles,
    payload: Partial<IAddress>,
  ) {
    if (role === ROLES.ADMIN) {
      return await this.updateByAdmin(id, payload);
    }
    return this.updateByUser(id, userId, payload);
  }

  async deleteByAdmin(id: Types.ObjectId) {
    const result = await AddressModel.findByIdAndDelete(id);
    if (!result) {
      throw new ApiError(HttpStatusCode.NOT_FOUND, this.addressNotFound);
    }
  }
}

export const AddressService = new Service();
