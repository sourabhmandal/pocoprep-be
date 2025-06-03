import { betterAuth } from "better-auth";
import { drizzleAdapter, type DrizzleAdapterConfig } from "better-auth/adapters/drizzle";
import { getDb } from "@/server";

const db = await getDb()
const config: DrizzleAdapterConfig = {
    provider: "pg",
    debugLogs: true,
    usePlural: true,
};
export const auth = betterAuth({
    database: drizzleAdapter(db, config),
    emailAndPassword: {  
        enabled: true
    },
    socialProviders: { 
        google: {
           clientId: process.env.AUTH_GOOGLE_ID as string, 
           clientSecret: process.env.AUTH_GOOGLE_SECRET as string, 
        }, 
    }, 
});