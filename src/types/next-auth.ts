import type { Session, User } from 'next-auth'
import type { JWT } from 'next-auth/jwt'

type UserId = string
type Username = string
type Admin = boolean

declare module 'next-auth/jwt' {
  interface JWT {
    id: UserId
    username: Username
    isAdmin: Admin
  }
}

declare module 'next-auth' {
  interface Session {
    user: User & {
      id: UserId
      username: Username
      isAdmin: Admin
    }
  }
}

export type SessionUser = {
  user: (User & {
    id: string;
    username: string;
    isAdmin: boolean;
}) | undefined
}