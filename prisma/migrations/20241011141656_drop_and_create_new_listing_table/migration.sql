/*
  Warnings:

  - You are about to drop the column `location_en` on the `Listing` table. All the data in the column will be lost.
  - You are about to drop the column `location_es` on the `Listing` table. All the data in the column will be lost.
  - You are about to drop the column `location_pl` on the `Listing` table. All the data in the column will be lost.
  - You are about to drop the column `propertyType_en` on the `Listing` table. All the data in the column will be lost.
  - You are about to drop the column `propertyType_es` on the `Listing` table. All the data in the column will be lost.
  - You are about to drop the column `propertyType_pl` on the `Listing` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[link]` on the table `Listing` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `link` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `storage` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `price` on the `Listing` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Listing" DROP COLUMN "location_en",
DROP COLUMN "location_es",
DROP COLUMN "location_pl",
DROP COLUMN "propertyType_en",
DROP COLUMN "propertyType_es",
DROP COLUMN "propertyType_pl",
ADD COLUMN     "link" TEXT NOT NULL,
ADD COLUMN     "pictures" TEXT,
ADD COLUMN     "published" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "storage" INTEGER NOT NULL,
ADD COLUMN     "translated" BOOLEAN NOT NULL DEFAULT false,
DROP COLUMN "price",
ADD COLUMN     "price" DECIMAL(15,2) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Listing_link_key" ON "Listing"("link");
