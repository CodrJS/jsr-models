import { assert, assertEquals } from "@std/assert";
import { Organization } from "../mod.ts";
import { ObjectId } from "bson";

Deno.test("Create organziation", function createOrganization() {
  const createdBy: ObjectId = new ObjectId();
  const org = new Organization({
    domains: ["localhost:3000"],
    name: "Demo Account",
    flags: {
      isActive: true,
      isDeleted: false,
      isDemo: true,
    },
    slug: "demo",
    createdBy,
  });

  assertEquals(org.toJSON().name, "Demo Account");
  assertEquals(org.toJSON().slug, "demo");
  assertEquals(org.toJSON().createdBy.toString(), createdBy.toString());
  assertEquals(org.toJSON().flags.isActive, true);
  assertEquals(org.toJSON().flags.isDeleted, false);
  assertEquals(org.toJSON().flags.isDemo, true);
  assert(org.toJSON().domains.includes("localhost:3000"));
});
