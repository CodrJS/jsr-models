import type { Flags } from "../types/mod.ts";
import { Group, type GroupParameters } from "./Group.ts";

interface UserGroupFlags extends Flags {
  // anonymize the data?
  isAnonymous: boolean;
  // others can join?
  isJoinable: boolean;
}
export type UserGroupParameters = GroupParameters<"UserGroup", UserGroupFlags>;

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
  }: UserGroupParameters) {
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

  toJSON(): Omit<UserGroupParameters, "kind"> {
    const json = super.toJSON();
    return {
      ...json,
    };
  }
}
