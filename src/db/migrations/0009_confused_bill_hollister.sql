ALTER TABLE "orderInfo" ADD COLUMN "created_at" timestamp;--> statement-breakpoint
ALTER TABLE "orderInfo" ADD COLUMN "updated_at" timestamp;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "created_at" timestamp;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "updated_at" timestamp;--> statement-breakpoint
ALTER TABLE "product" ADD COLUMN "created_at" timestamp;--> statement-breakpoint
ALTER TABLE "product" ADD COLUMN "updated_at" timestamp;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "created_at" timestamp;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "updated_at" timestamp;