import { TAll } from "jet-validator";
import { ObjectId } from "mongodb";
import { IRole } from "./Role";

// **** Variables **** //

export enum UserPermissions {
  View = "users.view",
  Update = "users.update",
  Create = "users.create",
  Delete = "users.delete",
}

export enum UserRoles {
  Standard,
  Admin,
}

// **** Types **** //

export interface IUser {
  _id?: ObjectId;
  id: string;
  name: string;
  email: string;
  pwdHash?: string;
  role?: ObjectId | IRole[];
}

// **** Functions **** //

/**
 * Get a new User object.
 */
function _new(
  name: string,
  email: string,
  role?: UserRoles,
  pwdHash?: string,
): IUser {
  return {
    id: "",
    email,
    name,
    pwdHash: pwdHash ?? "",
  };
}

/**
 * Copy a user object.
 */
function copy(user: IUser): IUser {
  return {
    _id: user._id,
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    pwdHash: user.pwdHash,
  };
}

/**
 * See if an object is an instance of User.
 */
function instanceOf(arg: TAll): boolean {
  return (
    !!arg &&
    typeof arg === "object" &&
    "id" in arg &&
    "email" in arg &&
    "name" in arg &&
    "role" in arg
  );
}

// **** Export default **** //

export default {
  new: _new,
  copy,
  instanceOf,
} as const;
