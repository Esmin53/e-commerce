DO $$ BEGIN
 CREATE TYPE "collection" AS ENUM('summer', 'winter');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "colors" AS ENUM('black', 'white', 'gray', 'lightgray', 'red', 'yellow', 'blue', 'green', 'pink', 'purple', 'orange');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "sex" AS ENUM('male', 'female', 'unisex');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "sizes" AS ENUM('xs', 's', 'm', 'l', 'xl', 'xxl');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "product" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"price" integer NOT NULL,
	"description" text NOT NULL,
	"collection" "collection",
	"sex" "sex",
	"sizes" sizes[] NOT NULL,
	"colors" colors[] NOT NULL,
	"images" text[] NOT NULL,
	CONSTRAINT "product_title_unique" UNIQUE("title")
);
