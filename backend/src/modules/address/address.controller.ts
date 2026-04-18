import RootController from "@/shared/rootController";
import { Request, Response } from "express";
import { AddressService } from "./address.service";
import { Types } from "mongoose";
import {
  addressFilterableFields,
  IAddress,
  IAddressFilters,
} from "./address.interface";
import { HttpStatusCode } from "@/lib/httpStatus";
import pickQueries from "@/utils/pickQueries";
import { paginationFields } from "@/constants/paginationFields";

class Controller extends RootController {
  create = this.catchAsync(async (req: Request, res: Response) => {
    const payload = {
      ...req.body,
      user: Types.ObjectId.createFromHexString(req?.user?.id || req?.id),
    };
    const result = await AddressService.create(payload);
    this.apiResponse<IAddress>(req, res, {
      statusCode: HttpStatusCode.CREATED,
      success: true,
      message: "Address has been created successfully!",
      data: result,
    });
  });

  getAll = this.catchAsync(async (req: Request, res: Response) => {
    const options = pickQueries(req.query, paginationFields);
    const filters = pickQueries(
      req.query,
      addressFilterableFields,
    ) as unknown as IAddressFilters;
    const search_query = req.query.search_query as string;
    const data = await AddressService.getAll(options, filters, search_query);
    this.apiResponse(req, res, {
      statusCode: HttpStatusCode.OK,
      success: true,
      message: "Addresses retrieved successfully",
      data,
    });
  });

  getById = this.catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id as unknown as Types.ObjectId;
    const result = await AddressService.getById(id);
    this.apiResponse<IAddress>(req, res, {
      statusCode: HttpStatusCode.OK,
      success: true,
      message: "Address retrieved successfully!",
      data: result,
    });
  });

  getByUser = this.catchAsync(async (req: Request, res: Response) => {
    const userId = (req.user.id || req.id) as unknown as Types.ObjectId;
    const result = await AddressService.getByUser(userId);
    this.apiResponse<IAddress>(req, res, {
      statusCode: HttpStatusCode.OK,
      success: true,
      message: "Address retrieved successfully!",
      data: result,
    });
  });

  update = this.catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id as unknown as Types.ObjectId;
    const result = await AddressService.update(
      id,
      req?.user?.id || req?.id,
      req.user?.role || req?.role,
      req.body,
    );
    this.apiResponse<IAddress>(req, res, {
      statusCode: HttpStatusCode.OK,
      success: true,
      message: "Address updated successfully!",
      data: result,
    });
  });

  deleteByAdmin = this.catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id as unknown as Types.ObjectId;
    const result = await AddressService.deleteByAdmin(id);
    this.apiResponse(req, res, {
      statusCode: HttpStatusCode.OK,
      success: true,
      message: "Address deleted successfully!",
      data: result,
    });
  });
}

export const AddressController = new Controller();
