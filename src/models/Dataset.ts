import type { ObjectId } from "bson";
import type { AtLeast, Flags } from "../types/mod.ts";
import { Base, type IBase } from "./Base.ts";

export interface IDataset extends IBase<"Dataset"> {
  projectId: ObjectId;
  flags: Flags;
  name: string;
}

export class Dataset extends Base<"Dataset"> {
  projectId: ObjectId;
  flags: Flags;
  name: string;

  constructor({
    flags,
    projectId,
    _id,
    _version,
    createdAt,
    updatedAt,
    name,
    createdBy,
    updatedBy,
  }: AtLeast<IDataset, "createdBy" | "name" | "flags" | "projectId">) {
    super({
      _id,
      _version,
      createdAt,
      updatedAt,
      createdBy,
      updatedBy,
    });
    this.projectId = projectId;
    this.flags = flags;
    this.name = name;
  }

  toJSON(): Omit<IDataset, "kind"> {
    const json = super.toJSON();
    return {
      ...json,
      projectId: this.projectId,
      name: this.name,
      flags: this.flags,
    };
  }
}
