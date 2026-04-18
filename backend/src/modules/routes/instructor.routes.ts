import { Router } from "express";
import { AddressRoutes } from "../address/address.routes";

const router = Router();

const routes: Array<{ path: string; route: Router }> = [
  {
    path: "/address",
    route: AddressRoutes,
  },
];

routes.forEach((route: { path: string; route: Router }) =>
  router.use(route.path, route.route),
);

export const InstructorRoutes = router;
