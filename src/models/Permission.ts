import { Base, type BaseParameters } from "./Base.ts";
import type { User } from "./User.ts";
import type { AtLeast } from "../types/mod.ts";

/**
 * Parameters for creating a {@link Permission} entity.
 */
export interface PermissionParameters extends BaseParameters<"Permission"> {
  /** The title/name of the role. */
  title: string;
  /**
   * Permission code.
   * @example `CREATE:USER`
   */
  code: string;
  /** Description/purpose of the role. */
  description: string;
  /** Role flags */
  flags: {
    /**
     * Whether or not to enable the permission.
     * @default true
     */
    isActive: boolean;
    /**
     * Whether or not the permission is soft deleted.
     * @default false
     */
    isDeleted: boolean;
  };
}

/**
 * Permission entity class for representing a permission authoization.
 */
export class Permission extends Base<"Permission"> {
  title: PermissionParameters["title"];
  code: PermissionParameters["code"];
  description: PermissionParameters["description"];
  flags: PermissionParameters["flags"];

  constructor({
    title,
    code,
    description,
    flags = { isActive: true, isDeleted: false },
    _id,
    _version,
    createdAt,
    updatedAt,
    createdBy,
    updatedBy,
  }: AtLeast<
    PermissionParameters & { user: User },
    "createdBy" | "title" | "code" | "description"
  >) {
    super({ _id, _version, createdAt, updatedAt, createdBy, updatedBy });
    this.title = title;
    this.code = code;
    this.description = description;
    this.flags = flags;
  }

  /**
   * Transforms the {@link Permission} class object into a {@link PermissionParameters}-like
   * json object. Useful for saving the entity to the database.
   * @returns a json representation of the permission authorization entity.
   */
  toJSON(): Omit<PermissionParameters, "kind"> {
    const json = super.toJSON();
    return {
      title: this.title,
      code: this.code,
      description: this.description,
      flags: this.flags,
      ...json,
    };
  }
}
