import { assert, assertEquals } from "@std/assert";
import { Profile } from "../mod.ts";
import { ObjectId } from "bson";

Deno.test("Create Profile", function createProfile() {
  const userId: ObjectId = new ObjectId();
  const createdBy: ObjectId = new ObjectId();
  const profile = new Profile({
    userId: userId,
    name: { first: "Demo", last: "User" },
    username: "DemoUser",
    createdBy,
  });

  assertEquals(profile.toJSON().name.first, "Demo");
  assertEquals(profile.toJSON().name.last, "User");
  assertEquals(profile.toJSON().username, "DemoUser");
  assert(profile.toJSON().userId.equals(userId));
  assert(profile.toJSON().createdBy.equals(createdBy));
  assert(profile.toJSON().updatedBy.equals(createdBy));
});
