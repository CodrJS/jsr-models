import type { ObjectId } from "bson";
import type { AtLeast } from "../types/mod.ts";
import { Base, type BaseParameters } from "./Base.ts";

export enum TaskType {
  Classification = "CLASSIFICATION",
  Tagging = "TAGGING",
  CodeTaging = "CODE_TAGGING",
  Translation = "TRANSLATION",
}

/**
 * Parameters for creating a {@link Task} entity.
 */
export interface TaskParameters extends BaseParameters<"Task"> {
  /** The project id that this task is for. */
  readonly projectId: ObjectId;
  /** The title/name of the task. */
  title: string;
  /** The task type */
  type: TaskType;
  /** A markdown parsable string describing how to complete the task. */
  guidelines?: string;
  /** The task configuration id */
  config?: ObjectId;
  /** Task flags. */
  flags: {
    /** Is the task active/archived? */
    isActive: boolean;
    /** Is the task output going to be anonymized? */
    isAnonymized: boolean;
    /** Is the task soft deleted? */
    isDeleted: boolean;
  };
}

/**
 * Task entity class for representing a project task.
 */
export class Task extends Base<"Task"> {
  readonly projectId: TaskParameters["projectId"];
  title: TaskParameters["title"];
  type: TaskParameters["type"];
  guidelines: TaskParameters["guidelines"];
  config?: TaskParameters["config"];
  flags: TaskParameters["flags"];

  constructor({
    projectId,
    config,
    flags,
    guidelines,
    title,
    type,
    _id,
    _version,
    createdAt,
    updatedAt,
    createdBy,
    updatedBy,
  }: AtLeast<
    TaskParameters,
    "createdBy" | "flags" | "title" | "type" | "projectId"
  >) {
    super({ _id, _version, createdAt, updatedAt, createdBy, updatedBy });

    this.config = config;
    this.flags = flags;
    this.guidelines = guidelines;
    this.title = title;
    this.type = type;
    this.projectId = projectId;
  }

  /**
   * Transforms the {@link Task} class object into a {@link TaskParameters}-like
   * json object. Useful for saving the entity to the database.
   * @returns a json representation of the task entity.
   */
  toJSON(): Omit<TaskParameters, "kind"> {
    const json = super.toJSON();
    return {
      ...json,
      config: this.config,
      flags: this.flags,
      guidelines: this.guidelines,
      title: this.title,
      type: this.type,
      createdBy: this.createdBy,
      projectId: this.projectId,
    };
  }
}
