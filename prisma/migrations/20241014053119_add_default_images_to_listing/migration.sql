/*
  Warnings:

  - The `images` column on the `Listing` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Listing" DROP COLUMN "images",
ADD COLUMN     "images" TEXT[] DEFAULT ARRAY['/images/listings/default.jpg', '/images/listings/default.jpg']::TEXT[];
