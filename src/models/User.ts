import { Base, type BaseParameters } from "./Base.ts";
import type { AtLeast } from "../types/mod.ts";
import type { ObjectId } from "bson";

/** Tpye of User */
export enum UserType {
  /** Anonymous users should only be used for external Annotators. */
  Anonymous = "ANONYMOUS",
  /** Internal members to the organization. */
  Member = "MEMBER",
  /** External collaborators invited to the organization. */
  Partner = "PARTNER",
  /** Codr System users. */
  System = "SYSTEM",
}

/**
 * Parameters for creating a {@link User} entity.
 */
export interface UserParameters extends BaseParameters<"User"> {
  /** Identifier from identitity provider. */
  readonly identityId: string;
  /** The organization id the user belongs to. */
  readonly organizationId: ObjectId;
  /** Type of user from {@link UserType} */
  type: UserType;
  /** Email address used for signin and notification purposes only. */
  email: string;
  /** Optional phone number. */
  phone?: string;
  /** A list of {@link Role}s the user is assigned. */
  roles: ObjectId[];
  /** User flags */
  flags: {
    /** Is the user account active or disabled */
    isActive: boolean;
    /** Is the user anonymous (primarily used for annotator accounts) */
    isAnonymous: boolean;
    /** Is the user soft deleted */
    isDeleted: boolean;
  };
}

/**
 * User entity class for representing a user account.
 */
export class User extends Base<"User"> {
  readonly identityId: UserParameters["identityId"];
  readonly organizationId: UserParameters["organizationId"];
  type: UserParameters["type"];
  email: UserParameters["email"];
  flags: UserParameters["flags"];
  roles: UserParameters["roles"];

  constructor({
    identityId,
    organizationId,
    type,
    email,
    flags = { isActive: false, isAnonymous: false, isDeleted: false },
    roles,
    _id,
    _version,
    createdAt,
    updatedAt,
    createdBy,
    updatedBy,
  }: AtLeast<
    UserParameters,
    | "createdBy"
    | "type"
    | "email"
    | "flags"
    | "organizationId"
    | "identityId"
    | "roles"
  >) {
    super({ _id, _version, createdAt, updatedAt, createdBy, updatedBy });
    this.type = type;
    this.email = email;
    this.flags = flags;
    this.organizationId = organizationId;
    this.identityId = identityId;
    this.roles = roles;
  }

  /**
   * Transforms the {@link User} class object into a {@link UserParameters}-like
   * json object. Useful for saving the entity to the database.
   * @returns a json representation of the user entity.
   */
  toJSON(): Omit<UserParameters, "kind"> {
    const json = super.toJSON();
    return {
      identityId: this.identityId,
      organizationId: this.organizationId,
      type: this.type,
      roles: this.roles,
      email: this.email,
      flags: this.flags,
      ...json,
    };
  }
}
