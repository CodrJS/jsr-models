import type { ObjectId } from "bson";
import type { AtLeast, MessageType } from "../types/mod.ts";
import { Base, type BaseParameters } from "./Base.ts";

export interface MessageParameters extends BaseParameters<"Message"> {
  type: MessageType;
  subject: string;
  body: string;
  to: ObjectId[];
}

export class Message extends Base<"Message"> {
  type: MessageType;
  subject: string;
  body: string;
  to: ObjectId[];

  constructor({
    type,
    subject,
    body,
    to,
    _id,
    _version,
    createdAt,
    updatedAt,
    createdBy,
    updatedBy,
  }: AtLeast<
    MessageParameters,
    "createdBy" | "body" | "subject" | "to" | "type"
  >) {
    super({ _id, _version, createdAt, updatedAt, createdBy, updatedBy });
    this.body = body;
    this.subject = subject;
    this.to = to;
    this.type = type;
  }

  toJSON(): Omit<MessageParameters, "kind"> {
    const json = super.toJSON();
    return {
      ...json,
      body: this.body,
      subject: this.subject,
      to: this.to,
      type: this.type,
    };
  }
}
