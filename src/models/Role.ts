import { Base, type BaseParameters } from "./Base.ts";
import type { User } from "./User.ts";
import type { AtLeast } from "../types/mod.ts";
import type { ObjectId } from "bson";

/**
 * Role parameters for creating a {@link Role} entity.
 */
export interface RoleParameters extends BaseParameters<"Role"> {
  title: string;
  /**
   * Role code.
   * @example `CODR:RESEARCHER`
   */
  code: string;
  /** Description/purpose of the role. */
  description: string;
  /** A list of ids that link to {@link Permission} entities. */
  permissions: ObjectId[];
  /** Role flags */
  flags: {
    /**
     * Whether or not to enable the role. Default is false to prevent accidental
     * usage of an unready permission set.
     * @default false
     */
    isActive: boolean;
    /**
     * Whether or not the role is soft deleted.
     * @default false
     */
    isDeleted: boolean;
  };
}

/**
 * Role entity class for representing a role. A role is made of one or more
 * {@link Permission}(s) for authorization.
 */
export class Role extends Base<"Role"> {
  title: RoleParameters["title"];
  code: RoleParameters["code"];
  description: RoleParameters["description"];
  permissions: RoleParameters["permissions"];
  flags: RoleParameters["flags"];

  constructor({
    title,
    code,
    description,
    permissions,
    flags = { isActive: false, isDeleted: false },
    _id,
    _version,
    createdAt,
    updatedAt,
    createdBy,
    updatedBy,
  }: AtLeast<
    RoleParameters & { user: User },
    "createdBy" | "title" | "code" | "description" | "permissions"
  >) {
    super({ _id, _version, createdAt, updatedAt, createdBy, updatedBy });
    this.title = title;
    this.code = code;
    this.description = description;
    this.permissions = permissions;
    this.flags = flags;
  }

  /**
   * Transforms the {@link Role} class object into a {@link RoleParameters}-like json object. Useful for saving the entity to the database.
   * @returns a json representation of the role authorization entity.
   */
  toJSON(): Omit<RoleParameters, "kind"> {
    const json = super.toJSON();
    return {
      title: this.title,
      code: this.code,
      description: this.description,
      permissions: this.permissions,
      flags: this.flags,
      ...json,
    };
  }
}
