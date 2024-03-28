DO $$ BEGIN
 CREATE TYPE "order_status" AS ENUM('payment_pending', 'payment_successful', 'in_shipping', 'delivered', 'canceled');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "is_paid" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "order_status" "order_status" DEFAULT 'payment_pending';