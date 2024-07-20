import type { ObjectId } from "npm:mongodb";
import type { AtLeast, MessageType } from "../types/mod.ts";
import { Base, type IBase } from "./Base.ts";

export interface IMessage extends IBase<"Message"> {
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
    __v,
    createdAt,
    updatedAt,
    createdBy,
    updatedBy,
  }: AtLeast<IMessage, "createdBy" | "body" | "subject" | "to" | "type">) {
    super({ _id, __v, createdAt, updatedAt, createdBy, updatedBy });
    this.body = body;
    this.subject = subject;
    this.to = to;
    this.type = type;
  }

  toJSON(): Omit<IMessage, "kind"> {
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
