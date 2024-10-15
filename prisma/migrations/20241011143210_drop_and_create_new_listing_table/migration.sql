/*
  Warnings:

  - You are about to drop the column `area` on the `Listing` table. All the data in the column will be lost.
  - You are about to drop the column `clientPhone` on the `Listing` table. All the data in the column will be lost.
  - Made the column `holiday` on table `Listing` required. This step will fail if there are existing NULL values in that column.
  - Made the column `link` on table `Listing` required. This step will fail if there are existing NULL values in that column.
  - Made the column `published` on table `Listing` required. This step will fail if there are existing NULL values in that column.
  - Made the column `translated` on table `Listing` required. This step will fail if there are existing NULL values in that column.
  - Made the column `price` on table `Listing` required. This step will fail if there are existing NULL values in that column.
  - Made the column `garage` on table `Listing` required. This step will fail if there are existing NULL values in that column.
  - Made the column `storage` on table `Listing` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Listing" DROP COLUMN "area",
DROP COLUMN "clientPhone",
ALTER COLUMN "features" DROP NOT NULL,
ALTER COLUMN "features" SET DATA TYPE TEXT,
ALTER COLUMN "images" DROP NOT NULL,
ALTER COLUMN "images" SET DATA TYPE TEXT,
ALTER COLUMN "holiday" SET NOT NULL,
ALTER COLUMN "features_en" DROP NOT NULL,
ALTER COLUMN "features_en" SET DATA TYPE TEXT,
ALTER COLUMN "features_es" DROP NOT NULL,
ALTER COLUMN "features_es" SET DATA TYPE TEXT,
ALTER COLUMN "features_pl" DROP NOT NULL,
ALTER COLUMN "features_pl" SET DATA TYPE TEXT,
ALTER COLUMN "link" SET NOT NULL,
ALTER COLUMN "published" SET NOT NULL,
ALTER COLUMN "translated" SET NOT NULL,
ALTER COLUMN "price" SET NOT NULL,
ALTER COLUMN "garage" SET NOT NULL,
ALTER COLUMN "storage" SET NOT NULL;
