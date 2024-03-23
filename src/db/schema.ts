import { v4 as uuidv4 } from 'uuid';
import {
    timestamp,
    pgTable,
    text,
    primaryKey,
   integer,
   boolean,
   pgEnum
  } from "drizzle-orm/pg-core"
  import type { AdapterAccount } from '@auth/core/adapters'

  export const collectionEnum = pgEnum('collection', ['summer', 'winter']);
  export const sexEnum = pgEnum('sex', ['male', 'female', 'unisex']);
  export const colorsEnum = pgEnum('colors', ['black', 'white', 'gray', 'lightgray', 'red', 'yellow', 'blue', 'green', 'pink', 'purple', 'orange'])
  export const sizesEnum = pgEnum('sizes', ['xs', 's', 'm', 'l', 'xl', 'xxl'])
  
  export const users = pgTable("user", {
   id: text("id").notNull().primaryKey().$default(() => uuidv4()),
   username: text("name").unique().notNull(),
   password: text("password").notNull(),
   isAdmin: boolean("isAdmin").notNull().default(false),   
  })
  

  export const products = pgTable("product", {
    id: text("id").notNull().primaryKey().$default(() => uuidv4()),
    title: text("title").notNull().unique(),
    price: integer("price").notNull(),
    description: text("description").notNull(),
    collection: collectionEnum('collection'),
    sex: sexEnum('sex'),
    sizes: sizesEnum('sizes').array().notNull(),
    colors: colorsEnum('colors').array().notNull(),
    images: text('images').array().notNull()
  })