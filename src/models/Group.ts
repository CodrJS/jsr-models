import type { ObjectId } from "bson";
import { Base, type BaseParameters } from "./Base.ts";
import type { AtLeast, Flags } from "../types/mod.ts";

/**
 * Parameters for creating a {@link Group} entity.
 */
export interface GroupParameters<
  Kind extends string = "Group",
  F extends object = Flags,
> extends BaseParameters<Kind> {
  name: string;
  members: GroupMemberParameters[];
  flags: F;
}

/**
 * Parameters for adding Group members to the {@link GroupParameters}.
 */
export interface GroupMemberParameters {
  type: GroupMemberType;
  _id: ObjectId;
}

/**
 * Type codes for the {@link GroupMemberParameters} object.
 */
export enum GroupMemberType {
  "User" = "USER",
  "Group" = "GROUP",
}

export class Group<
  K extends string = "Group",
  F extends object = Flags,
> extends Base<K> {
  members: GroupMemberParameters[];
  name: string;
  flags: F;

  constructor({
    name,
    members,
    flags,
    _id,
    _version,
    createdAt,
    updatedAt,
    createdBy,
    updatedBy,
  }: AtLeast<
    GroupParameters<K, F>,
    "createdBy" | "name" | "members" | "flags"
  >) {
    super({ _id, _version, createdAt, updatedAt, createdBy, updatedBy });
    this.name = name;
    this.members = members;
    this.flags = flags;
  }

  addUser(id: ObjectId): GroupMemberParameters {
    const member = {
      type: GroupMemberType.User,
      _id: id,
    };
    this.members.push(member);
    return member;
  }

  addGroup(id: ObjectId): GroupMemberParameters {
    const member = {
      type: GroupMemberType.Group,
      _id: id,
    };
    this.members.push(member);
    return member;
  }

  toJSON(): Omit<GroupParameters<K, F>, "kind"> {
    const json = super.toJSON();
    return {
      ...json,
      members: this.members,
      name: this.name,
      flags: this.flags,
    };
  }
}
