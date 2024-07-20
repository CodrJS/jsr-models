import type { AtLeast } from "../types/mod.ts";
import { Base, type IBase } from "./Base.ts";

interface OrganizationFlags {
  isActive: boolean;
  isDeleted: boolean;
  isDemo: boolean;
}

export interface IOrganization extends IBase<"Organization"> {
  domains: string[]; // to restrict signin to a specified domain
  flags: OrganizationFlags;
  name: string;
  slug: string;
}

export class Organization extends Base<"Organization"> {
  readonly domains: string[];
  readonly flags: OrganizationFlags;
  readonly name: string;
  readonly slug: string;

  constructor({
    flags = {
      isActive: true,
      isDeleted: false,
      isDemo: false,
    },
    _id,
    __v,
    createdAt,
    updatedAt,
    createdBy,
    updatedBy,
    name,
    slug,
    domains,
  }: AtLeast<IOrganization, "createdBy" | "domains" | "name" | "slug">) {
    super({
      _id,
      __v,
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

  toJSON(): Omit<IOrganization, "kind"> {
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
