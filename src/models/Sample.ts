import type { ObjectId } from "npm:bson";
import { Base, type IBase } from "./Base.ts";
import type { AtLeast } from "../types/mod.ts";

export interface ISample extends IBase<"Sample"> {
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
    __v,
    createdAt,
    updatedAt,
    createdBy,
    updatedBy,
  }: AtLeast<ISample, "createdBy" | "datasetId" | "projectId" | "payload">) {
    super({ _id, __v, createdAt, updatedAt, createdBy, updatedBy });
    this.projectId = projectId;
    this.datasetId = datasetId;
    this.payload = payload;
  }

  toJSON(): Omit<ISample, "kind"> {
    const json = super.toJSON();
    return {
      ...json,
      projectId: this.projectId,
      datasetId: this.datasetId,
      payload: this.payload,
    };
  }
}
