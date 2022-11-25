/**
 * Middleware to verify user logged in and is an an admin.
 */

import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";

import HttpStatusCodes from "@src/declarations/major/HttpStatusCodes";
import EnvVars from "@src/declarations/major/EnvVars";
import jwtUtil from "@src/util/jwt-util";
import { IUser } from "@src/models/User";

// **** Variables **** //

const jwtNotPresentErr = "JWT not present in signed cookie.",
  userUnauthErr = "User not authorized to perform this action";
// **** Types **** //

export interface ISessionUser extends JwtPayload {
  id: string;
  email: string;
  name: string;
  role: IUser['role'];
}

// **** Functions **** //

/**
 * See note at beginning of file.
 */
async function adminMw(req: Request, res: Response, next: NextFunction) {
  // Extract the token
  const cookieName = EnvVars.cookieProps.key,
    jwt = req.signedCookies[cookieName];
  if (!jwt) {
    return res
      .status(HttpStatusCodes.UNAUTHORIZED)
      .json({ error: jwtNotPresentErr });
  }
  // Make sure user role is an admin
  const clientData = await jwtUtil.decode<ISessionUser>(jwt);
  if (typeof clientData === "object") {
    res.locals.sessionUser = clientData;
    return next();
  } else {
    return res
      .status(HttpStatusCodes.UNAUTHORIZED)
      .json({ error: userUnauthErr });
  }
}

// **** Export Default **** //

export default adminMw;
