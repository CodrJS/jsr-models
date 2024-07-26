import type { ObjectId } from "bson";
import type { AtLeast } from "../types/mod.ts";
import { Base, type BaseParameters } from "./Base.ts";

/**
 * Parameters for creating a {@link Project} entity.
 */
export interface ProjectParameters extends BaseParameters<"Project"> {
  /** The organization id the project belongs to. */
  readonly organizationId: ObjectId;
  /** The title of the project. */
  title: string;
  /** The URL slug of the project (unique to the organization) */
  slug: string;
  /** The color of the project shown in the UI. */
  bgColorClass: string;
  /** Project flags. */
  flags: {
    /** Is the project active/archived? */
    isActive: boolean;
    /** Is the project soft deleted? */
    isDeleted: boolean;
  };
}

/**
 * Poject entity class for representing a reseach project.
 */
export class Project extends Base<"Project"> {
  readonly organizationId: ProjectParameters["organizationId"];
  title: ProjectParameters["title"];
  slug: ProjectParameters["slug"];
  bgColorClass: ProjectParameters["bgColorClass"];
  flags: ProjectParameters["flags"];

  constructor({
    organizationId,
    bgColorClass,
    flags,
    slug,
    title,
    _id,
    _version,
    createdAt,
    updatedAt,
    createdBy,
    updatedBy,
  }: AtLeast<
    ProjectParameters,
    "createdBy" | "bgColorClass" | "flags" | "slug" | "title" | "organizationId"
  >) {
    super({ _id, _version, createdAt, updatedAt, createdBy, updatedBy });

    this.bgColorClass = bgColorClass;
    this.flags = flags;
    this.slug = slug;
    this.title = title;
    this.organizationId = organizationId;
  }

  /**
   * Transforms the {@link Project} class object into a {@link ProjectParameters}-like
   * json object. Useful for saving the entity to the database.
   * @returns a json representation of the project entity.
   */
  toJSON(): Omit<ProjectParameters, "kind"> {
    const json = super.toJSON();
    return {
      ...json,
      bgColorClass: this.bgColorClass,
      flags: this.flags,
      slug: this.slug,
      title: this.title,
      createdBy: this.createdBy,
      organizationId: this.organizationId,
    };
  }
}
