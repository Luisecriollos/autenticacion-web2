import { TAll } from "jet-validator";
import { ObjectId } from "mongodb";
import { UserPermissions } from "./User";

// **** Variables **** //

export enum RolePermissions {
  View = "roles.view",
  Create = "roles.create",
  Delete = "roles.delete",
  Update = "roles.update",
}

export type Permissions = UserPermissions | RolePermissions;

// **** Types **** //

export interface IRole {
  _id?: ObjectId;
  name: string;
  permissions: Permissions[];
}

// **** Functions **** //

/**
 * Get a new Role object.
 */
function _new(name: string, permissions: Permissions[] = []): IRole {
  return {
    name,
    permissions,
  };
}

/**
 * Copy a user object.
 */
function copy(role: IRole): IRole {
  return {
    _id: role._id,
    name: role.name,
    permissions: role.permissions,
  };
}

/**
 * See if an object is an instance of User.
 */
function instanceOf(arg: TAll): boolean {
  return (
    !!arg && typeof arg === "object" && "name" in arg && "permissions" in arg
  );
}

// **** Export default **** //

export default {
  new: _new,
  copy,
  instanceOf,
} as const;
