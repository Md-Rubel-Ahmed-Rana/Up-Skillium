import { Router } from "express";
import { AddressController } from "./address.controller";
import validateRequest from "@/middlewares/validateRequest";
import { addressValidation } from "./address.validate";
import checkAuthorization from "@/middlewares/authorizeMiddleware";
import { ROLES } from "@/constants/roles";

const router = Router();

router
  .route("/")
  .post(validateRequest(addressValidation.create), AddressController.create)
  .get(AddressController.getAll);

router.route("/me").get(AddressController.getByUser);

router
  .route("/:id")
  .patch(AddressController.update)
  .delete(checkAuthorization(ROLES.ADMIN), AddressController.deleteByAdmin);

export const AddressRoutes = router;
