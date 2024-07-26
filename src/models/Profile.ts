import type { ObjectId } from "bson";
import { Base, type BaseParameters } from "./Base.ts";
import type { User } from "./User.ts";
import type { AtLeast } from "../types/mod.ts";

export interface ProfileParameters extends BaseParameters<"Profile"> {
  /** Name of the user. */
  name: {
    /** First, or preferred name. */
    first: string;
    /** Last name. */
    last: string;
  };
  /** Optional avatar. */
  avatarUrl?: string;
  /** Username, unique within an organization. */
  username: string;
  /** Id of the user. */
  userId: ObjectId;
}

export class Profile extends Base<"Profile"> {
  name: ProfileParameters["name"];
  avatarUrl?: ProfileParameters["avatarUrl"];
  username: ProfileParameters["username"];
  userId: ProfileParameters["userId"];
  /** User entity linked to the profile. */
  user?: User;

  constructor({
    name,
    avatarUrl,
    username,
    userId,
    _id,
    _version,
    user,
    createdAt,
    updatedAt,
    createdBy,
    updatedBy,
  }: AtLeast<
    ProfileParameters & { user: User },
    "createdBy" | "name" | "userId" | "username"
  >) {
    super({ _id, _version, createdAt, updatedAt, createdBy, updatedBy });
    this.name = name;
    this.avatarUrl = avatarUrl;
    this.userId = userId;
    this.username = username;
    this.user = user;
  }

  /**
   * Profile entity class for representing a user profile.
   */
  toJSON(): Omit<ProfileParameters, "kind"> {
    const json = super.toJSON();
    return {
      name: this.name,
      avatarUrl: this.avatarUrl,
      userId: this.userId,
      username: this.username,
      ...json,
    };
  }
}
