import type { ObjectId } from "bson";
import { Base, type BaseParameters } from "./Base.ts";
import type { AtLeast } from "../types/mod.ts";

/**
 * Parameters for creating an {@link Annotation} entity.
 */
export interface AnnotationParameters extends BaseParameters<"Annotation"> {
  /** The dataset this annotation comes from. */
  datasetId: ObjectId;
  /** The sample this annotation is for. */
  sampleId: ObjectId;
  /** What user annotated the annotation. */
  annotatedBy: ObjectId;
  /** The annotated value/output */
  value: object;
}

/**
 * Annotation entity class for representing a dataset sample annotation.
 */
export class Annotation extends Base<"Annotation"> {
  datasetId: ObjectId;
  sampleId: ObjectId;
  annotatedBy: ObjectId;
  value: object;

  constructor({
    datasetId,
    sampleId,
    value,
    annotatedBy,
    _id,
    _version,
    createdAt,
    updatedAt,
    createdBy,
    updatedBy,
  }: AtLeast<
    AnnotationParameters,
    "createdBy" | "datasetId" | "annotatedBy" | "sampleId" | "value"
  >) {
    super({ _id, _version, createdAt, updatedAt, createdBy, updatedBy });
    this.datasetId = datasetId;
    this.sampleId = sampleId;
    this.annotatedBy = annotatedBy;
    this.value = value;
  }

  /**
   * Transforms the {@link Annotation} class object into a {@link AnnotationParameters}-like
   * json object. Useful for saving the entity to the database.
   * @returns a json representation of the annotation entity.
   */
  toJSON(): Omit<AnnotationParameters, "kind"> {
    const json = super.toJSON();
    return {
      ...json,
      datasetId: this.datasetId,
      sampleId: this.sampleId,
      annotatedBy: this.annotatedBy,
      value: this.value,
    };
  }
}
