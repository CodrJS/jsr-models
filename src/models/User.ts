import { Base, type IBase } from "./Base.ts";
import type { AtLeast, UserTypeCode } from "../types/mod.ts";
import type { ObjectId } from "bson";

/**
 * User entity parameters for creating a {@link User} entity.
 */
export interface IUser extends IBase<"User"> {
  /** Identifier from identitity provider. */
  identityId: string;
  /** The organization id the user belongs to. */
  organizationId: ObjectId;
  /** Type of user from {@link UserTypeCode} */
  type: UserTypeCode;
  /** Email address used to signin, used for notification purposes only.*/
  email: string;
  /** User flags */
  flags: {
    /** Is the user anonymous (primarily used for annotator accounts) */
    isAnonymous: boolean;
    /** Is the user soft deleted */
    isDeleted: boolean;
    /** Is the user account active or disabled */
    isActive: boolean;
  };
}

/**
 * User entity class for representing a user account.
 */
export class User extends Base<"User"> {
  identityId: IUser["identityId"];
  organizationId: IUser["organizationId"];
  type: IUser["type"];
  email: IUser["email"];
  flags: IUser["flags"];

  constructor({
    identityId,
    organizationId,
    type,
    email,
    flags = { isActive: false, isAnonymous: false, isDeleted: false },
    _id,
    _version,
    createdAt,
    updatedAt,
    createdBy,
    updatedBy,
  }: AtLeast<
    IUser,
    "createdBy" | "type" | "email" | "flags" | "organizationId" | "identityId"
  >) {
    super({ _id, _version, createdAt, updatedAt, createdBy, updatedBy });
    this.type = type;
    this.email = email;
    this.flags = flags;
    this.organizationId = organizationId;
    this.identityId = identityId;
  }

  /**
   * Transforms the user class object into a json object. Useful for saving the entity to the database.
   * @returns a json representation of the user account.
   */
  toJSON(): Omit<IUser, "kind"> {
    const json = super.toJSON();
    return {
      identityId: this.identityId,
      organizationId: this.organizationId,
      type: this.type,
      email: this.email,
      flags: this.flags,
      ...json,
    };
  }
}
