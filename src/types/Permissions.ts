export type ResourceCodeType = `${ResourceCode}`;
export enum ResourceCode {
  // User Context -- how users access
  Organization = "ORGANIZATION",
  User = "USER",
  Profile = "PROFILE",
  UserGroup = "USERGROUP",
  // Project Context -- apps for how users interact
  Project = "PROJECT",
  Dataset = "DATASET",
  Sample = "SAMPLE",
  Annotation = "ANNOTATION",
  // System Context -- cross functional domain apps
  Config = "CONFIG",
  Audit = "AUDIT",
  // Preferences? (privacy/data processing, messaging, etc)
  Message = "MESSAGE",
}
export type ActionCodeType = `${ActionCode}`;
export enum ActionCode {
  Create = "CREATE",
  Read = "READ",
  Update = "UPDATE",
  Delete = "DELETE",
}

export type PermissionType = `${ActionCode}:${ResourceCode}`;
