import type { ObjectId } from "npm:mongodb";
import type { IBase } from "./Base.ts";
import type { ActionCode, ResourceCode } from "../types/mod.ts";

export interface IAudit<T> extends Omit<IBase<"Audit">, "createdBy"> {
  type: ResourceCode; // Where: what system processed this event.
  action: ActionCode; // How:   what action was taken.
  userId: ObjectId; // Who:   which user made the change.
  payload: Partial<T>; // What:  what data got modified (should be a diff of before/after. New entities should be complete)
  processedAt: Date; // When:  what date/time did this occur.
}
