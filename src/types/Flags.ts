export interface Flags {
  // soft delete entities
  isDeleted: boolean;
  // can individuals not assigned to an entity (typically groups, projects,
  // datasets, etc) view the entity? if isPrivate = true, then only users
  // with privilege can interact with the entity
  isPrivate: boolean;
}
