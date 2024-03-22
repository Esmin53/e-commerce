import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { db } from "./db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt"
import { toast } from "sonner";

const authOptions: NextAuthOptions = {
    secret: process.env.AUTH_SECRET,
    session: {
        strategy: "jwt"
    },
    providers: [
        Credentials({
            name: "Credentials",
            
            credentials: {
                username: { label: "Username", type: "username", placeholder: "username"},
                password: { label: "Password", type: "password"}
            },

            async authorize(credentials, req) {

                if(!credentials?.username || !credentials?.password) {
                    throw new Error("Unauthorized")
                }

                try {
                    const user = await db.select({
                        id: users.id,
                        username: users.username,
                        isAdmin: users.isAdmin,
                        password: users.password
                    }).from(users).where(eq(users.username, credentials?.username))     

                    if(!user[0]) {
                        throw new Error("Unauthorized")
                    }

                    const isMatch = await bcrypt.compare(credentials.password, user[0].password)

                    if(!isMatch) {
                        throw new Error("Unauthorized")
                    } else {
                        return user[0]
                    }
                } catch (error) {
                    console.log(error)
                    return null 
                }
            },
        })
    ],
    pages: {
        signIn: "/sign-in"
    },
    callbacks: {
        jwt: async ({ user, token}) => {
            if (user) {
                return {
                    id: user.id,
                    //@ts-ignore
                    username: user.username,
                    //@ts-ignore
                    isAdmin: user?.isAdmin
                } 
            }
            return token
        },
        session: async({ session, token }) => {
            if(session?.user) {
                session.user.id = token.id
                session.user.username = token.username,
                session.user.isAdmin = token.isAdmin
            }
            return Promise.resolve(session)
        },
    },

}

export default authOptions;