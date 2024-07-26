import type { ObjectId } from "bson";
import type { AtLeast } from "../types/mod.ts";
import { Base, type BaseParameters } from "./Base.ts";

/**
 * Parameters for creating a {@link Dataset} entity.
 */
export interface DatasetParameters extends BaseParameters<"Dataset"> {
  /** The project id that this dataset is for. */
  projectId: ObjectId;
  /** The task id(s) that this dataset is for. */
  taskId: ObjectId[];
  /**
   * The sub-dataset id(s) that for this dataset. This is for dividing out
   * samples for annotation.
   */
  subDatasetId: ObjectId[];
  /** The title/name of the dataset */
  title: string;
  /** The dataset flags. */
  flags: {
    /** Is the dataset active/archived? */
    isActive: boolean;
    /** Is the dateset soft deleted? */
    isDeleted: boolean;
  };
}

/**
 * Dataset entity class for representing a set of samples for a project and task.
 */
export class Dataset extends Base<"Dataset"> {
  projectId: DatasetParameters["projectId"];
  taskId: DatasetParameters["taskId"];
  subDatasetId: DatasetParameters["subDatasetId"];
  title: DatasetParameters["title"];
  flags: DatasetParameters["flags"];

  constructor({
    projectId,
    taskId,
    subDatasetId,
    title,
    flags,
    _id,
    _version,
    createdAt,
    updatedAt,
    createdBy,
    updatedBy,
  }: AtLeast<
    DatasetParameters,
    "createdBy" | "title" | "flags" | "projectId" | "taskId" | "subDatasetId"
  >) {
    super({
      _id,
      _version,
      createdAt,
      updatedAt,
      createdBy,
      updatedBy,
    });
    this.projectId = projectId;
    this.taskId = taskId;
    this.subDatasetId = subDatasetId;
    this.title = title;
    this.flags = flags;
  }

  /**
   * Transforms the {@link Dataset} class object into a {@link DatasetParameters}-like
   * json object. Useful for saving the entity to the database.
   * @returns a json representation of the dataset entity.
   */
  toJSON(): Omit<DatasetParameters, "kind"> {
    const json = super.toJSON();
    return {
      ...json,
      projectId: this.projectId,
      taskId: this.taskId,
      subDatasetId: this.subDatasetId,
      title: this.title,
      flags: this.flags,
    };
  }
}
