export type TaskType =
  | "CLASSIFICATION"
  | "TAGGING"
  | "CODETAGGING"
  | "TRANSLATION";

export enum AnnotationTask {
  Classification = "CLASSIFICATION",
  Tagging = "TAGGING",
  CodeTaging = "CODETAGGING",
  Translation = "TRANSLATION",
}
