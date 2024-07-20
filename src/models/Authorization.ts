import type { ObjectId } from "bson";
import { Base, type IBase } from "./Base.ts";
import type { ActionCode, AtLeast, ResourceCode } from "../types/mod.ts";

export interface IAuthorization extends IBase<"Authorization"> {
  userId: ObjectId;
  roleId: ObjectId[];
}

export interface IAuthorizationResponse {
  userId: ObjectId;
  roleCodes: string[];
  grants: Partial<Record<ResourceCode, Partial<Record<ActionCode, boolean>>>>;
}

export class Authorization extends Base<"Authorization"> {
  userId: ObjectId;
  roleId: ObjectId[];

  constructor({
    userId,
    roleId = [],
    _id,
    __v,
    createdAt,
    updatedAt,
    createdBy,
    updatedBy,
  }: AtLeast<IAuthorization, "createdBy" | "userId">) {
    super({ _id, __v, createdAt, updatedAt, createdBy, updatedBy });
    this.userId = userId;
    this.roleId = roleId;
  }

  toJSON(): Omit<IAuthorization, "kind"> {
    const json = super.toJSON();
    return {
      userId: this.userId,
      roleId: this.roleId,
      ...json,
    };
  }
}
