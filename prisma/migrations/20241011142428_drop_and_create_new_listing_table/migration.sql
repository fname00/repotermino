/*
  Warnings:

  - Changed the type of `garage` on the `Listing` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `storage` on the `Listing` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Listing" DROP COLUMN "garage",
ADD COLUMN     "garage" BOOLEAN NOT NULL,
DROP COLUMN "storage",
ADD COLUMN     "storage" BOOLEAN NOT NULL;
