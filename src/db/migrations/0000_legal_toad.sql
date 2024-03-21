CREATE TABLE IF NOT EXISTS "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"email" text NOT NULL,
	"isVerified" boolean DEFAULT false,
	"emailVerified" timestamp,
	"verificationToken" text,
	"image" text
);
