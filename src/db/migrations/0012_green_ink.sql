ALTER TABLE "orderInfo" DROP CONSTRAINT "orderInfo_order_id_orders_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orderInfo" ADD CONSTRAINT "orderInfo_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
