import type { ObjectId } from "bson";
import { Base, type BaseParameters } from "./Base.ts";
import type { AtLeast } from "../types/mod.ts";

export interface SampleParameters extends BaseParameters<"Sample"> {
  projectId: ObjectId;
  datasetId: ObjectId;
  payload: object;
}

export class Sample extends Base<"Smaple"> {
  projectId: ObjectId;
  datasetId: ObjectId;
  payload: object;

  constructor({
    projectId,
    datasetId,
    payload,
    _id,
    _version,
    createdAt,
    updatedAt,
    createdBy,
    updatedBy,
  }: AtLeast<
    SampleParameters,
    "createdBy" | "datasetId" | "projectId" | "payload"
  >) {
    super({ _id, _version, createdAt, updatedAt, createdBy, updatedBy });
    this.projectId = projectId;
    this.datasetId = datasetId;
    this.payload = payload;
  }

  toJSON(): Omit<SampleParameters, "kind"> {
    const json = super.toJSON();
    return {
      ...json,
      projectId: this.projectId,
      datasetId: this.datasetId,
      payload: this.payload,
    };
  }
}
