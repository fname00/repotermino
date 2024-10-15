/*
  Warnings:

  - You are about to drop the column `address` on the `Listing` table. All the data in the column will be lost.
  - You are about to drop the column `garageSize` on the `Listing` table. All the data in the column will be lost.
  - You are about to drop the column `lat` on the `Listing` table. All the data in the column will be lost.
  - You are about to drop the column `long` on the `Listing` table. All the data in the column will be lost.
  - You are about to drop the column `tags` on the `Listing` table. All the data in the column will be lost.
  - You are about to drop the column `yearBuilding` on the `Listing` table. All the data in the column will be lost.
  - You are about to drop the column `zipCode` on the `Listing` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Listing" DROP COLUMN "address",
DROP COLUMN "garageSize",
DROP COLUMN "lat",
DROP COLUMN "long",
DROP COLUMN "tags",
DROP COLUMN "yearBuilding",
DROP COLUMN "zipCode",
ALTER COLUMN "city" DROP NOT NULL,
ALTER COLUMN "location" DROP NOT NULL,
ALTER COLUMN "area" DROP NOT NULL,
ALTER COLUMN "country" DROP NOT NULL,
ALTER COLUMN "clientPhone" DROP NOT NULL,
ALTER COLUMN "bed" DROP NOT NULL,
ALTER COLUMN "bath" DROP NOT NULL,
ALTER COLUMN "sqft" DROP NOT NULL,
ALTER COLUMN "propertyType" DROP NOT NULL,
ALTER COLUMN "forRent" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "image" DROP NOT NULL,
ALTER COLUMN "holiday" DROP NOT NULL,
ALTER COLUMN "link" DROP NOT NULL,
ALTER COLUMN "published" DROP NOT NULL,
ALTER COLUMN "translated" DROP NOT NULL,
ALTER COLUMN "price" DROP NOT NULL,
ALTER COLUMN "garage" DROP NOT NULL,
ALTER COLUMN "storage" DROP NOT NULL;
