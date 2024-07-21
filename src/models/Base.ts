import { ObjectId } from "bson";
import type { AtLeast } from "../types/mod.ts";

/**
 * Base entity parameters for all database entities.
 */
export interface IBase<Kind extends string> {
  /** Typescript annotation for permissioning/authorization purposes. */
  readonly kind: Kind;
  /** Entity version stored in the database. */
  _version?: number;
  /** Entity identifier stored in the database. */
  _id: ObjectId;
  /** Entity created date. */
  createdAt: Date;
  /** Entity unpdated date. */
  updatedAt: Date;
  /** Entity created by {@link User} id. */
  createdBy: ObjectId;
  /** Entity updated by {@link User} id. */
  updatedBy: ObjectId;
}

export class Base<K extends string> {
  readonly _version: IBase<K>["_version"];
  readonly _id: IBase<K>["_id"];
  readonly createdAt: IBase<K>["createdAt"];
  readonly updatedAt: IBase<K>["updatedAt"];
  readonly createdBy: IBase<K>["createdBy"];
  readonly updatedBy: IBase<K>["updatedBy"];

  constructor({
    createdAt,
    updatedAt,
    createdBy,
    updatedBy,
    _id,
    _version = 0,
  }: AtLeast<IBase<K>, "createdBy">) {
    this._version = _version;
    this._id = _id || new ObjectId();

    const now = new Date();
    this.createdAt = createdAt || now;
    this.updatedAt = updatedAt || now;

    this.createdBy = createdBy;
    this.updatedBy = updatedBy || createdBy;
  }

  /**
   * Transforms the base class object into a json object. Useful for saving the entity to the database.
   * @returns a json representation of the base entity.
   */
  toJSON(): Omit<IBase<K>, "kind"> {
    return {
      _version: this._version,
      _id: this._id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      createdBy: this.createdBy,
      updatedBy: this.updatedBy,
    };
  }
}
