import { withPagination } from "../db";
import { users, accounts, sessions, verifications } from "./auth";

const pocoprepApp = {
  users,
  accounts,
  sessions,
  verifications
};

export {
  users as usersSchema,
  accounts as accountsSchema,
  sessions as sessionsSchema,
  verifications as verificationsSchema,
  pocoprepApp as pocoprepAppSchema,
  withPagination,
};
