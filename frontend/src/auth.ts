import { betterAuth } from "better-auth";
import { drizzleAdapter, type DrizzleAdapterConfig } from "better-auth/adapters/drizzle";

import { Pool } from "pg";
import { getDb } from "@/server";

const db = await getDb()
const config: DrizzleAdapterConfig = {
    provider: "pg",
    debugLogs: true,
    usePlural: true,
};
export const auth = betterAuth({
    database: drizzleAdapter(db, config)
})