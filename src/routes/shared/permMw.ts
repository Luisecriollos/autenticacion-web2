/* eslint-disable indent */
/**
 * Middleware to verify user logged in and is an an admin.
 */

import { Request, Response, NextFunction } from "express";

import { IUser } from "@src/models/User";
import { IRole, Permissions } from "@src/models/Role";
import HttpStatusCodes from "@src/declarations/major/HttpStatusCodes";

const userUnauthErr = "User not authorized to perform this action";

// **** Functions **** //

/**
 * See note at beginning of file.
 */
const permMw =
  (permissions: Permissions[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    // Extract the token
    const userData = res.locals.sessionUser as IUser;
    if (
      permissions.some((perm) =>
        (userData.role as IRole[])[0]?.permissions.includes(perm),
      )
    ) {
      return next();
    } else {
      return res
        .status(HttpStatusCodes.UNAUTHORIZED)
        .json({ error: userUnauthErr });
    }
  };

// **** Export Default **** //

export default permMw;
