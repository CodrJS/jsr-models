/**
 * @module
 *
 * This module consists of class entities used to collect, transform, and
 * process data in Codr.
 *
 * @example
 * ```ts
 * import { Organization } from "@codr/models";
 * import { ObjectId } from "bson";
 *
 * const org = new Organization ({
 *   name: "Demo Organization",
 *   domains: ["localhost:3000"],
 *   flags: {
 *     isActive: true,
 *     isDeleted: false,
 *     isDemo: true,
 *   },
 *   slug: "demo",
 *   createdBy: new ObjectId(),
 * })
 * ```
 */

export * from "./src/mod.ts";
