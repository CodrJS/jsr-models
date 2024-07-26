import type { ObjectId } from "bson";
import { Base, type BaseParameters } from "./Base.ts";
import type { AtLeast } from "../types/mod.ts";

export interface SampleParameters extends BaseParameters<"Sample"> {
  /** Dataset this sample is a part of */
  datasetId: ObjectId;
  /** What sub-dataset/partition this sample belongs to. */
  subDatasetId: ObjectId;
  /** The payload of the sample. */
  payload: object;
}

/**
 * Parameters for creating a {@link Sample} entity.
 */
export class Sample extends Base<"Smaple"> {
  datasetId: SampleParameters["datasetId"];
  subDatasetId: SampleParameters["subDatasetId"];
  payload: SampleParameters["payload"];

  constructor({
    subDatasetId,
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
    "createdBy" | "datasetId" | "subDatasetId" | "payload"
  >) {
    super({ _id, _version, createdAt, updatedAt, createdBy, updatedBy });
    this.datasetId = datasetId;
    this.subDatasetId = subDatasetId;
    this.payload = payload;
  }

  /**
   * Transforms the {@link Sample} class object into a {@link SampleParameters}-like
   * json object. Useful for saving the entity to the database.
   * @returns a json representation of a dataset sample entity.
   */
  toJSON(): Omit<SampleParameters, "kind"> {
    const json = super.toJSON();
    return {
      ...json,
      datasetId: this.datasetId,
      subDatasetId: this.subDatasetId,
      payload: this.payload,
    };
  }
}
