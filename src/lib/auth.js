import { betterAuth } from "better-auth";
import { jwt } from "better-auth/plugins"; // Fixed: JWT plugin now imported from /plugins
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db('lessonVault');

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders:{
    google:{
      clientId: process.env.GOOGLE_CLIENT,
      clientSecret: process.env.GOOGLE_SECRET
    }
  },
  user:{
    additionalFields: {
      role:{
        type: 'string',
        defaultValue: 'user',
      },
      plan: {
        type: 'string',
        defaultValue: 'free',
      }
    }
  },
  session:{
    cookieCache:{
      enabled: true,
      // Fixed: maxAge is in seconds. 
      // 60 * 60 * 24 * 30 sets a 30-day cache.
      maxAge: 60 * 60 * 24 * 30, 
      strategy: 'jwt',
    }
  },
  plugins:[
    jwt()
  ]
});