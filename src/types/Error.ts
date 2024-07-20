import type { ActionCode, ResourceCode } from "./Permissions.ts";
export type PermissionErrorType =
  `EE:${ResourceCode}:${ActionCode}:UNAUTHORIZED`;
export type ResourceExceptionErrorType = `EE:${ResourceCode}:EXCEPTION`;
export type DatabaseErrorType = `EE:${ResourceCode}:DATABASE:EXCEPTION`;
export type HTTPErrorType = `EE:HTTP:EXCEPTION`;
export type ErrorType =
  | PermissionErrorType
  | DatabaseErrorType
  | ResourceExceptionErrorType
  | HTTPErrorType;
