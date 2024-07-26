import type { AtLeast } from "../types/mod.ts";
import { Base, type BaseParameters } from "./Base.ts";

/**
 * Parameters for building an {@link Organization} entity.
 */
export interface OrganizationParameters extends BaseParameters<"Organization"> {
  /** A list of domains (and ports) linked to the Organziation */
  domains: string[];
  /** Flags options for the organization */
  flags: {
    /** Whether or not the organization is active */
    isActive: boolean;
    /** Whether or not the organization is soft deleted */
    isDeleted: boolean;
    /** Whether or not the organization is a demo organization */
    isDemo: boolean;
  };
  /** Name of the organization */
  name: string;
  /** Slug for generating subdomains for the organization */
  slug: string;
}

/**
 * A class the represents an organization.
 */
export class Organization extends Base<"Organization"> {
  readonly domains: OrganizationParameters["domains"];
  readonly flags: OrganizationParameters["flags"];
  readonly name: OrganizationParameters["name"];
  readonly slug: OrganizationParameters["slug"];

  /**
   * Create an Organization entity.
   * @param params An object of required and optional parameters referenced from the {@link OrganizationParameters} interface.
   */
  constructor({
    flags = {
      isActive: true,
      isDeleted: false,
      isDemo: false,
    },
    _id,
    _version,
    createdAt,
    updatedAt,
    createdBy,
    updatedBy,
    name,
    slug,
    domains,
  }: AtLeast<
    OrganizationParameters,
    "createdBy" | "domains" | "name" | "slug"
  >) {
    super({
      _id,
      _version,
      createdAt,
      updatedAt,
      createdBy,
      updatedBy,
    });
    this.domains = domains;
    this.flags = flags;
    this.name = name;
    this.slug = slug;
  }

  /**
   * Transforms the organization class object to a json object. Useful for saving the entity to the database.
   * @returns a json representation of the organization.
   */
  toJSON(): Omit<OrganizationParameters, "kind"> {
    const json = super.toJSON();
    return {
      ...json,
      domains: this.domains,
      flags: this.flags,
      name: this.name,
      slug: this.slug,
    };
  }
}
