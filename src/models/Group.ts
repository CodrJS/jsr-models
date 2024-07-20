import type { ObjectId } from "bson";
import { Base, type IBase } from "./Base.ts";
import type { AtLeast, Flags } from "../types/mod.ts";

export interface IGroup<
  Kind extends string = "Group",
  F extends object = Flags,
> extends IBase<Kind> {
  members: IGroupMember[];
  name: string;
  flags: F;
}

export interface IGroupMember {
  type: GroupMemberEnum;
  _id: ObjectId;
}

export enum GroupMemberEnum {
  "USER" = "USER",
  "TEAM" = "TEAM",
}

export class Group<
  K extends string = "Group",
  F extends object = Flags,
> extends Base<K> {
  members: IGroupMember[];
  name: string;
  flags: F;

  constructor({
    name,
    members,
    flags,
    _id,
    __v,
    createdAt,
    updatedAt,
    createdBy,
    updatedBy,
  }: AtLeast<IGroup<K, F>, "createdBy" | "name" | "members" | "flags">) {
    super({ _id, __v, createdAt, updatedAt, createdBy, updatedBy });
    this.name = name;
    this.members = members;
    this.flags = flags;
  }

  toJSON(): Omit<IGroup<K, F>, "kind"> {
    const json = super.toJSON();
    return {
      ...json,
      members: this.members,
      name: this.name,
      flags: this.flags,
    };
  }
}
