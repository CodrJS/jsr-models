import type { JwtPayload as JsonWebTokenPayload } from "jsonwebtoken";
import type { PermissionParameters, UserParameters } from "../mod.ts";

export interface JwtParameters {
  /** Type of user from {@link UserTypeCode}. */
  type: UserParameters["type"];
  /** A consolidated set of permission codes the user has accross all roles. */
  permissions: PermissionParameters["code"][];
}

export interface JwtPayload extends JsonWebTokenPayload, JwtParameters {
  /**
   * The issuer of the token.
   * @default `https://api.codrcloud.com`
   */
  iss: string;
  /**
   * The user's stringified object id.
   * @example ```User._id.toString();```
   */
  sub: string;
  /**
   * JWT identifier, this should be a stringified ObjectId.
   * @example ```new ObjectId().toString();```
   */
  jti: string;
  /**
   * JWT Audience(s). This limits what domains the JWT can be used for.
   * @example ```
   * [ "https://api.codrcloud.com/user", "https://api.codrcloud.com/project" ]
   * ```
   */
  aud: string[];
}
