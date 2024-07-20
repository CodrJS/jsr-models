import { Base, type IBase } from "./Base.ts";
import type { AtLeast, UserEnum } from "../types/mod.ts";
import type { ObjectId } from "npm:bson";

export interface IUser extends IBase<"User"> {
  organizationId: ObjectId;
  type: UserEnum;
  email: string;
  flags: {
    isAnonymous: boolean;
    isDeleted: boolean;
    isDisabled: boolean;
  };
}

export class User extends Base<"User"> {
  organizationId: ObjectId;
  type: UserEnum;
  email: string;
  flags: {
    isAnonymous: boolean;
    isDeleted: boolean;
    isDisabled: boolean;
  };

  constructor({
    organizationId,
    type,
    email,
    flags = { isDisabled: false, isAnonymous: false, isDeleted: false },
    _id,
    __v,
    createdAt,
    updatedAt,
    createdBy,
    updatedBy,
  }: AtLeast<
    IUser,
    "createdBy" | "type" | "email" | "flags" | "organizationId"
  >) {
    super({ _id, __v, createdAt, updatedAt, createdBy, updatedBy });
    this.type = type;
    this.email = email;
    this.flags = flags;
    this.organizationId = organizationId;
  }

  toJSON(): Omit<IUser, "kind"> {
    const json = super.toJSON();
    return {
      organizationId: this.organizationId,
      type: this.type,
      email: this.email,
      flags: this.flags,
      ...json,
    };
  }
}
