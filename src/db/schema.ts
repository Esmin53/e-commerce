import { v4 as uuidv4 } from 'uuid';
import {
    timestamp,
    pgTable,
    text,
    primaryKey,
   integer,
   boolean,
   pgEnum,
   decimal
  } from "drizzle-orm/pg-core"
  import type { AdapterAccount } from '@auth/core/adapters'
import { relations } from 'drizzle-orm';

  export const collectionEnum = pgEnum('collection', ['summer', 'winter']);
  export const sexEnum = pgEnum('sex', ['male', 'female', 'unisex']);
  export const colorsEnum = pgEnum('colors', ['black', 'white', 'gray', 'lightgray', 'red', 'yellow', 'blue', 'green', 'pink', 'purple', 'orange'])
  export const sizesEnum = pgEnum('sizes', ['xs', 's', 'm', 'l', 'xl', 'xxl'])
  export const categoriesEnum = pgEnum('categories', ['shirts', 'tshirts', 'pants', 'dresses', 'shoes', 'boots', 'glasses', 'jackets', 'coats', 'sweaters', 'accesories'])
  export const orderStatusEnum = pgEnum('order_status', ['payment_pending', 'payment_successful', 'in_shipping', 'delivered', 'canceled'])

  export const users = pgTable("user", {
   id: text("id").notNull().primaryKey().$default(() => uuidv4()),
   username: text("name").unique().notNull(),
   password: text("password").notNull(),
   isAdmin: boolean("isAdmin").notNull().default(false),
   createdAt: timestamp("created_at").defaultNow().notNull(),
   updatedAt: timestamp("updated_at").defaultNow().notNull()   
  })
  
  export const userRelations = relations(users, ({many}) => ({
    orders: many(orders)
  }))

  export const products = pgTable("product", {
    id: text("id").notNull().primaryKey().$default(() => uuidv4()),
    title: text("title").notNull().unique(),
    price: decimal("price").notNull(),
    description: text("description").notNull(),
    collection: collectionEnum('collection'),
    sex: sexEnum('sex'),
    sizes: sizesEnum('sizes').array().notNull(),
    colors: colorsEnum('colors').array().notNull(),
    images: text('images').array().notNull(),
    category: categoriesEnum('categories').notNull(),
    isFeatured: boolean('isFeatured').notNull().default(false),
    stripe_id: text("stripe_id").notNull(),
    price_id: text("price_id").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull()
  })

  export const productsRelations = relations(products, ({many}) => ({
    orderInfo: many(orderInfo)
  }))

  export const orders = pgTable("orders", {
    id: text("id").notNull().primaryKey().$default(() => uuidv4()),
    userId: text("user_id").references(() => users.id),
    products: text("product_id").references(() => products.id),
    isPaid: boolean("is_paid").default(false),
    orderStatus: orderStatusEnum('order_status').default('payment_pending'),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull()
  })

  export const orderRelations= relations(orders, ({one, many}) => ({
    user: one(users, {
      fields: [orders.userId],
      references: [users.id]
    }),
    orderInfos: many(orderInfo)
  }))

  export const orderInfo = pgTable("orderInfo", {
    id: text("id").notNull().primaryKey().$default(() => uuidv4()),
    orderId: text("order_id").references(() => orders.id) ,
    productId: text("product_id").references(() => products.id),
    color: colorsEnum("color").notNull(),
    size: sizesEnum("size").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),

})

export const orderInfoRelations = relations(orderInfo, ({ one }) => ({
  order: one(orders, {
    fields: [orderInfo.orderId],
    references: [orders.id]
  }),
  products: one(products, {
    fields: [orderInfo.productId],
    references: [products.id]
  })
}))