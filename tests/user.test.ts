import { assert, assertEquals } from "@std/assert";
import { User, UserType } from "../mod.ts";
import { ObjectId } from "bson";

Deno.test("Create User", function createUser() {
  const orgId: ObjectId = new ObjectId();
  const roleId: ObjectId = new ObjectId();
  const createdBy: ObjectId = new ObjectId();
  const user = new User({
    organizationId: orgId,
    identityId: "identity_id",
    type: UserType.Member,
    email: "demo@codr.sh",
    roles: [roleId],
    flags: {
      isActive: true,
      isAnonymous: false,
      isDeleted: false,
    },
    createdBy,
  });

  assertEquals(user.toJSON().email, "demo@codr.sh");
  assertEquals(user.toJSON().flags.isActive, true);
  assertEquals(user.toJSON().flags.isDeleted, false);
  assertEquals(user.toJSON().flags.isAnonymous, false);
  assert(user.toJSON().organizationId.equals(orgId));
  assert(user.toJSON().roles[0].equals(roleId));
  assert(user.toJSON().createdBy.equals(createdBy));
  assert(user.toJSON().updatedBy.equals(createdBy));
});
