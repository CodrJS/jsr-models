import type { JwtPayload as JsonWebTokenPayload } from "jsonwebtoken";
import type { IUser } from "../models/User.ts";

interface DefinfedJwtPayload extends JsonWebTokenPayload {
  iss: string;
  sub: string;
  jti: string;
}

export type JwtPayload = DefinfedJwtPayload & IUser;
