DO $$ BEGIN
 CREATE TYPE "categories" AS ENUM('shirts', 'tshirts', 'pants', 'dresses', 'shoes', 'boots', 'glasses', 'jackets', 'coats', 'sweaters', 'accesories');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "product" ADD COLUMN "categories" "categories" NOT NULL;--> statement-breakpoint
ALTER TABLE "product" ADD COLUMN "isFeatured" boolean DEFAULT false NOT NULL;