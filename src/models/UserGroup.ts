import type { Flags } from "../types/mod.ts";
import { Group, type IGroup } from "./Group.ts";

interface UserGroupFlags extends Flags {
  // anonymize the data?
  isAnonymous: boolean;
  // others can join?
  isJoinable: boolean;
}
export type IUserGroup = IGroup<"UserGroup", UserGroupFlags>;

export class UserGroup extends Group<"UserGroup", UserGroupFlags> {
  constructor({
    flags = {
      isAnonymous: false,
      isDeleted: false,
      isJoinable: false,
      isPrivate: false,
    },
    _id,
    _version,
    createdAt,
    updatedAt,
    createdBy,
    updatedBy,
    name,
    members,
  }: IUserGroup) {
    super({
      _id,
      _version,
      createdAt,
      updatedAt,
      createdBy,
      updatedBy,
      name,
      members,
      flags,
    });
  }

  toJSON(): Omit<IUserGroup, "kind"> {
    const json = super.toJSON();
    return {
      ...json,
    };
  }
}
