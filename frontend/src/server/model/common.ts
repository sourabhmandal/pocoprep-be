import { pgEnum } from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum("role", ["ADMIN", "USER"]);
export const userStatusEnum = pgEnum("userStatus", [
  "ACTIVE",
  "DISABLED",
  "PENDING",
]);
export const availableIdps = [
  "credentials",
  "google",
  "facebook",
  "github",
  "azure-ad",
];