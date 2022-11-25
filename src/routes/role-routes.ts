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
 * Get all roles.
 */
const getAll = async (_: IReq, res: IRes) => {
  const roles = await rolesService.getAll();
  return res.status(HttpStatusCodes.OK).json(roles);
};

/**
 * Add one role.
 */
const add = async (req: IReq<{ role: IRole }>, res: IRes) => {
  const { role } = req.body;
  const created = await rolesService.addOne(role);
  return res.status(HttpStatusCodes.CREATED).json(created);
};

/**
 * Update one role.
 */
const update = async (req: IReq<{ role: IRole }>, res: IRes) => {
  const { role } = req.body;
  const updated = await rolesService.updateOne(role);
  return res.status(HttpStatusCodes.OK).json(updated);
};

/**
 * Delete one role.
 */
const _delete = async (req: IReq, res: IRes) => {
  const id = req.params.id;
  await rolesService.delete(id);
  return res.status(HttpStatusCodes.OK).end();
};

// **** Export default **** //

export default {
  paths,
  update,
  getAll,
  add,
  delete: _delete,
} as const;
