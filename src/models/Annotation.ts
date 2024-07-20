import type { ObjectId } from "npm:mongodb";
import { Base, type IBase } from "./Base.ts";
import type { AtLeast } from "../types/mod.ts";

export interface IAnnotation extends IBase<"Annotation"> {
  projectId: ObjectId;
  datasetId: ObjectId;
  sampleId: ObjectId;
  annotatedBy: ObjectId;
  value: object;
}

export class Annotation extends Base<"Annotation"> {
  projectId: ObjectId;
  datasetId: ObjectId;
  sampleId: ObjectId;
  annotatedBy: ObjectId;
  value: object;

  constructor({
    projectId,
    datasetId,
    sampleId,
    value,
    annotatedBy,
    _id,
    __v,
    createdAt,
    updatedAt,
    createdBy,
    updatedBy,
  }: AtLeast<
    IAnnotation,
    | "createdBy"
    | "projectId"
    | "datasetId"
    | "annotatedBy"
    | "sampleId"
    | "value"
  >) {
    super({ _id, __v, createdAt, updatedAt, createdBy, updatedBy });
    this.projectId = projectId;
    this.datasetId = datasetId;
    this.value = value;
    this.sampleId = sampleId;
    this.annotatedBy = annotatedBy;
  }

  toJSON(): Omit<IAnnotation, "kind"> {
    const json = super.toJSON();
    return {
      ...json,
      projectId: this.projectId,
      annotatedBy: this.annotatedBy,
      sampleId: this.sampleId,
      datasetId: this.datasetId,
      value: this.value,
    };
  }
}
