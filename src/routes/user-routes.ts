import HttpStatusCodes from "@src/declarations/major/HttpStatusCodes";

import userService from "@src/services/user-service";
import { ObjectId } from "mongodb";
import { IUser } from "@src/models/User";
import { IReq, IRes } from "./shared/types";
import pwdUtil from "@src/util/pwd-util";

// **** Variables **** //

// Paths
const paths = {
  basePath: "/users",
  profile: "/me",
  get: "/all",
  add: "/add",
  update: "/update",
  delete: "/delete/:id",
} as const;

// **** Functions **** //

/**
 * Get all users.
 */
async function getAll(_: IReq, res: IRes) {
  const users = await userService.getAll();
  return res.status(HttpStatusCodes.OK).json(users);
}

/**
 * Get profile.
 */
const getProfile = (_: IReq, res: IRes) => {
  return res.status(HttpStatusCodes.OK).json(res.locals.sessionUser);
};

/**
 * Add one user.
 */
async function add(req: IReq<{ password: string; user: IUser }>, res: IRes) {
  const { password, user } = req.body;
  user.pwdHash = await pwdUtil.getHash(password);
  user.role = user.role ? new ObjectId(user.role as ObjectId) : undefined;
  const created = await userService.addOne(user);
  return res.status(HttpStatusCodes.CREATED).json(created);
}

/**
 * Update one user.
 */
async function update(req: IReq<{ user: IUser }>, res: IRes) {
  const { user } = req.body;
  delete user.pwdHash;
  user.role = user.role ? new ObjectId(user.role as ObjectId) : undefined;

  const updated = await userService.updateOne(user);
  return res.status(HttpStatusCodes.OK).json(updated);
}

/**
 * Delete one user.
 */
async function _delete(req: IReq, res: IRes) {
  const id = req.params.id;
  await userService.delete(id);
  return res.status(HttpStatusCodes.OK).end();
}

// **** Export default **** //

export default {
  paths,
  getProfile,
  getAll,
  add,
  update,
  delete: _delete,
} as const;
