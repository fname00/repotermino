/*
  Warnings:

  - Added the required column `image` to the `Listing` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Listing" ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "images" TEXT[];
