import { Router } from "express";
import jetValidator, { TAll, TValidatorFn } from "jet-validator";

import authMw from "./shared/authMw";
import User, { UserPermissions } from "@src/models/User";
import authRoutes from "./auth-routes";
import userRoutes from "./user-routes";
import roleRoutes from "./role-routes";
import permMw from "./shared/permMw";
import { RolePermissions } from "@src/models/Role";

// **** Init **** //

const apiRouter = Router(),
  validate = jetValidator();

// **** Setup auth routes **** //

const authRouter = Router();

// Login user
authRouter.post(
  authRoutes.paths.login,
  validate("email", "password"),
  authRoutes.login,
);

// Logout user
authRouter.get(authRoutes.paths.logout, authRoutes.logout);

// Add authRouter
apiRouter.use(authRoutes.paths.basePath, authRouter);

// **** Setup user routes **** //

const userRouter = Router();

// Get profile
userRouter.get(userRoutes.paths.profile, userRoutes.getProfile);

// Get all users
userRouter.get(
  userRoutes.paths.get,
  permMw([UserPermissions.View]),
  userRoutes.getAll,
);

const validPassword: TValidatorFn = (password: TAll) =>
  typeof password === "string" && !!password?.trim();
// Add one user
userRouter.post(
  userRoutes.paths.add,
  permMw([UserPermissions.Create]),
  validate(["user", User.instanceOf], ["password", validPassword]),
  userRoutes.add,
);

// Update one user
userRouter.put(
  userRoutes.paths.update,
  permMw([UserPermissions.Update]),
  validate(["user", User.instanceOf]),
  userRoutes.update,
);

// Delete one user
userRouter.delete(
  userRoutes.paths.delete,
  permMw([UserPermissions.Delete]),
  validate(["id", "string", "params"]),
  userRoutes.delete,
);

// Add userRouter
apiRouter.use(userRoutes.paths.basePath, authMw, userRouter);

const roleRouter = Router();

roleRouter.get(
  roleRoutes.paths.get,
  permMw([RolePermissions.View]),
  roleRoutes.getAll,
);

roleRouter.post(
  roleRoutes.paths.add,
  permMw([RolePermissions.Create]),
  roleRoutes.add,
);

roleRouter.put(
  roleRoutes.paths.update,
  permMw([RolePermissions.Update]),
  roleRoutes.update,
);

apiRouter.use(roleRoutes.paths.basePath, authMw, roleRouter);

// **** Export default **** //

export default apiRouter;
