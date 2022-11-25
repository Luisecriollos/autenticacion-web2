import HttpStatusCodes from "@src/declarations/major/HttpStatusCodes";

import rolesService from "@src/services/role-service";
import { IReq, IRes } from "./shared/types";
import { IRole } from "@src/models/Role";

// **** Variables **** //

// Paths
const paths = {
  basePath: "/roles",
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
  const users = await rolesService.getAll();
  return res.status(HttpStatusCodes.OK).json(users);
}

/**
 * Add one user.
 */
async function add(req: IReq<{ role: IRole }>, res: IRes) {
  const { role } = req.body;
  const created = await rolesService.addOne(role);
  return res.status(HttpStatusCodes.CREATED).json(created);
}

/**
 * Update one user.
 */
// async function update(req: IReq<{ role: IRole }>, res: IRes) {
//   const { role } = req.body;
//   const updated = await rolesService.updateOne(role);
//   return res.status(HttpStatusCodes.OK).json(updated);
// }

/**
 * Delete one user.
 */
// async function _delete(req: IReq, res: IRes) {
//   const id = req.params.id;
//   await userService.delete(id);
//   return res.status(HttpStatusCodes.OK).end();
// }

// **** Export default **** //

export default {
  paths,
  //   getOne,
  getAll,
  add,
} as const;
