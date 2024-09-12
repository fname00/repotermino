/*
  Warnings:

  - You are about to drop the `Property` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Property";

-- CreateTable
CREATE TABLE "Listing" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "long" DOUBLE PRECISION NOT NULL,
    "clientPhone" TEXT NOT NULL,
    "bed" INTEGER NOT NULL,
    "bath" INTEGER NOT NULL,
    "garage" INTEGER NOT NULL,
    "garageSize" INTEGER NOT NULL,
    "sqft" INTEGER NOT NULL,
    "propertyType" TEXT NOT NULL,
    "yearBuilding" INTEGER NOT NULL,
    "price" TEXT NOT NULL,
    "forRent" BOOLEAN NOT NULL,
    "tags" TEXT[],
    "features" TEXT[],
    "description" TEXT NOT NULL,
    "dateAdd" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Listing_pkey" PRIMARY KEY ("id")
);
