import roleRepo from "@src/repos/role-repo";
import { IRole } from "@src/models/Role";

// **** Variables **** //

export const userNotFoundErr = "User not found";

// **** Functions **** //

/**
 * Get all roles.
 */
function getAll(): Promise<IRole[]> {
  return roleRepo.getAll();
}

/**
 * Add one role.
 */
function addOne(role: IRole): Promise<IRole | null> {
  return roleRepo.add(role);
}

/**
 * Update one role.
 */
// async function updateOne(role: IRole): Promise<IRole | null> {
//   if (!role._id) {
//     throw new RouteError(HttpStatusCodes.BAD_REQUEST, "Missing role id");
//   }
//   const persists = await roleRepo.persists(role._id.toString());
//   if (!persists) {
//     throw new RouteError(HttpStatusCodes.NOT_FOUND, userNotFoundErr);
//   }
//   // Return user
//   return roleRepo.update(role);
// }

/**
 * Delete a user by their id.
 */
// async function _delete(id: string): Promise<void> {
//   const persists = await roleRepo.persists(id);
//   if (!persists) {
//     throw new RouteError(HttpStatusCodes.NOT_FOUND, userNotFoundErr);
//   }
//   // Delete user
//   return roleRepo.delete(id);
// }

// **** Export default **** //

export default {
  getAll,
  addOne,
  //   updateOne,
  //   delete: _delete,
} as const;
