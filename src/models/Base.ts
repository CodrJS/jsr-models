import { ObjectId } from "bson";
import type { AtLeast } from "../types/mod.ts";

export interface IBase<Kind extends string> {
  readonly kind: Kind;
  __v?: number;
  _id: ObjectId;
  createdAt: Date;
  updatedAt: Date;
  createdBy: ObjectId;
  updatedBy: ObjectId;
}

export class Base<K extends string> {
  readonly __v: IBase<K>["__v"];
  readonly _id: IBase<K>["_id"];
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly createdBy: ObjectId;
  readonly updatedBy: ObjectId;

  constructor({
    createdAt,
    updatedAt,
    createdBy,
    updatedBy,
    _id,
    __v,
  }: AtLeast<IBase<K>, "createdBy">) {
    this.__v = __v;
    this._id = _id || new ObjectId();

    const now = new Date(Date.now());
    this.createdAt = createdAt || now;
    this.updatedAt = updatedAt || now;

    this.createdBy = createdBy;
    this.updatedBy = updatedBy || createdBy;
  }

  toJSON(): Omit<IBase<K>, "kind"> {
    return {
      __v: this.__v,
      _id: this._id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      createdBy: this.createdBy,
      updatedBy: this.updatedBy,
    };
  }
}
