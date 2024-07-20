import type { ObjectId } from "bson";
import { Base, type IBase } from "./Base.ts";
import type { User } from "./User.ts";
import type { AtLeast } from "../types/mod.ts";

export interface IProfile extends IBase<"Profile"> {
  name: {
    first: string;
    last: string;
    preferred?: string;
  };
  phone?: string;
  avatarUrl?: string;
  username: string;
  userId: ObjectId;
}

export class Profile extends Base<"Profile"> {
  name: {
    first: string;
    last: string;
    preferred?: string;
  };
  phone?: string;
  avatarUrl?: string;
  username: string;
  userId: ObjectId;
  user?: User;

  constructor({
    name,
    avatarUrl,
    username,
    userId,
    phone,
    _id,
    __v,
    user,
    createdAt,
    updatedAt,
    createdBy,
    updatedBy,
  }: AtLeast<
    IProfile & { user: User },
    "createdBy" | "name" | "userId" | "username"
  >) {
    super({ _id, __v, createdAt, updatedAt, createdBy, updatedBy });
    this.name = name;
    this.avatarUrl = avatarUrl;
    this.userId = userId;
    this.phone = phone;
    this.username = username;
    this.user = user;
  }

  toJSON(): Omit<IProfile, "kind"> {
    const json = super.toJSON();
    return {
      name: this.name,
      avatarUrl: this.avatarUrl,
      userId: this.userId,
      phone: this.phone,
      username: this.username,
      ...json,
    };
  }
}
