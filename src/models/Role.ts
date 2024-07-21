import { Base, type IBase } from "./Base.ts";
import type { User } from "./User.ts";
import type { AtLeast, JwtPayload } from "../types/mod.ts";
import type { ActionCode, ResourceCode } from "../types/mod.ts";

export interface IGrant<R = object> {
  resource: ResourceCode;
  actions: ActionCode[];
  conditions: {
    operator: "eq" | "within";
    subjectField: keyof JwtPayload;
    resourceField: keyof R;
    actions?: ActionCode[];
  }[];
}

export interface IRole extends IBase<"Role"> {
  name: string;
  code: string;
  description: string;
  grants: IGrant[];
}

export class Role extends Base<"Role"> {
  name: string;
  code: string;
  description: string;
  grants: IGrant[];

  constructor({
    name,
    code,
    description,
    grants,
    _id,
    _version,
    createdAt,
    updatedAt,
    createdBy,
    updatedBy,
  }: AtLeast<
    IRole & { user: User },
    "createdBy" | "name" | "code" | "description" | "grants"
  >) {
    super({ _id, _version, createdAt, updatedAt, createdBy, updatedBy });
    this.name = name;
    this.code = code;
    this.description = description;
    this.grants = grants;
  }

  toJSON(): Omit<IRole, "kind"> {
    const json = super.toJSON();
    return {
      name: this.name,
      code: this.code,
      description: this.description,
      grants: this.grants,
      ...json,
    };
  }
}
