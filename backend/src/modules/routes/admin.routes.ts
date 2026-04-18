import { Router } from "express";
import { AddressRoutes } from "../address/address.routes";

const router = Router();

const routes: Array<{ path: string; route: Router }> = [
  {
    path: "/addresses",
    route: AddressRoutes,
  },
];

routes.forEach((route: { path: string; route: Router }) =>
  router.use(route.path, route.route),
);

export const AdminRoutes = router;
