import { v4 as uuidv4 } from 'uuid';
import {
    timestamp,
    pgTable,
    text,
    primaryKey,
   integer,
   boolean
  } from "drizzle-orm/pg-core"
  import type { AdapterAccount } from '@auth/core/adapters'
  
  export const users = pgTable("user", {
   id: text("id").notNull().primaryKey().$default(() => uuidv4()),
   username: text("name").unique().notNull(),
   password: text("password").notNull(),
   isAdmin: boolean("isAdmin").notNull().default(false)
  })
  