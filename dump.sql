CREATE DATABASE "shortlyDB";

\c "shortlyDB";

CREATE TABLE "users" (
	"id" serial PRIMARY KEY,
	"name" TEXT NOT NULL,
	"email" TEXT NOT NULL UNIQUE,
	"password" TEXT NOT NULL,
	"createdAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE "urls" (
	"id" serial PRIMARY KEY,
	"url" TEXT NOT NULL UNIQUE,
	"shortUrl" TEXT NOT NULL,
	"visitCount" integer NOT NULL,
	"userId" integer NOT NULL REFERENCES "users"("id"),
	"createdAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW()
);



