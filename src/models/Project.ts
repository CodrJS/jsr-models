import type { ObjectId } from "bson";
import type { AtLeast, Flags, TaskType } from "../types/mod.ts";
import { Base, type BaseParameters } from "./Base.ts";

export interface ProjectParameters extends BaseParameters<"Project"> {
  name: string;
  type: TaskType;
  slug: string;
  guidelines?: string;
  bgColorClass: string;
  config: ObjectId;
  flags: Flags & {
    isAnonymized: boolean;
  };
}

export class Project extends Base<"Project"> {
  name: string;
  slug: string;
  type: TaskType;
  guidelines?: string;
  bgColorClass: string;
  config: ObjectId;
  flags: Flags & {
    isAnonymized: boolean;
  };

  constructor({
    bgColorClass,
    config,
    flags,
    guidelines,
    slug,
    name,
    type,
    _id,
    _version,
    createdAt,
    updatedAt,
    createdBy,
    updatedBy,
  }: AtLeast<
    ProjectParameters,
    "createdBy" | "bgColorClass" | "config" | "flags" | "slug" | "name" | "type"
  >) {
    super({ _id, _version, createdAt, updatedAt, createdBy, updatedBy });

    this.bgColorClass = bgColorClass;
    this.config = config;
    this.flags = flags;
    this.guidelines = guidelines;
    this.slug = slug;
    this.name = name;
    this.type = type;
  }

  toJSON(): Omit<ProjectParameters, "kind"> {
    const json = super.toJSON();
    return {
      ...json,
      bgColorClass: this.bgColorClass,
      config: this.config,
      flags: this.flags,
      guidelines: this.guidelines,
      slug: this.slug,
      name: this.name,
      type: this.type,
      createdBy: this.createdBy,
    };
  }
}
