/*
  Warnings:

  - The `price` column on the `Activity` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `discount` column on the `Activity` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Made the column `cancellation_en` on table `Activity` required. This step will fail if there are existing NULL values in that column.
  - Made the column `cancellation_es` on table `Activity` required. This step will fail if there are existing NULL values in that column.
  - Made the column `cancellation_pl` on table `Activity` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description_en` on table `Activity` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description_es` on table `Activity` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description_pl` on table `Activity` required. This step will fail if there are existing NULL values in that column.
  - Made the column `duration_en` on table `Activity` required. This step will fail if there are existing NULL values in that column.
  - Made the column `duration_es` on table `Activity` required. This step will fail if there are existing NULL values in that column.
  - Made the column `duration_pl` on table `Activity` required. This step will fail if there are existing NULL values in that column.
  - Made the column `location_en` on table `Activity` required. This step will fail if there are existing NULL values in that column.
  - Made the column `location_es` on table `Activity` required. This step will fail if there are existing NULL values in that column.
  - Made the column `location_pl` on table `Activity` required. This step will fail if there are existing NULL values in that column.
  - Made the column `title_en` on table `Activity` required. This step will fail if there are existing NULL values in that column.
  - Made the column `title_es` on table `Activity` required. This step will fail if there are existing NULL values in that column.
  - Made the column `title_pl` on table `Activity` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Activity" ADD COLUMN     "pictures" TEXT NOT NULL DEFAULT '/path/to/default/image.png',
ALTER COLUMN "image" SET DEFAULT '/path/to/default/image.png',
ALTER COLUMN "images" SET DEFAULT ARRAY['/images/activities/default.jpg', '/images/activities/default.jpg']::TEXT[],
ALTER COLUMN "title" SET DEFAULT 'Activity',
ALTER COLUMN "city" SET DEFAULT 'No information provided',
ALTER COLUMN "location" SET DEFAULT 'No information provided',
ALTER COLUMN "duration" SET DEFAULT 'No duration provided',
DROP COLUMN "price",
ADD COLUMN     "price" DECIMAL(15,2) NOT NULL DEFAULT 0.00,
DROP COLUMN "discount",
ADD COLUMN     "discount" DECIMAL(15,2),
ALTER COLUMN "forRent" SET DEFAULT false,
ALTER COLUMN "tags" SET DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "cancellation" SET DEFAULT 'No cancellation policy provided',
ALTER COLUMN "featured" SET DEFAULT false,
ALTER COLUMN "availability" SET DEFAULT 'No availability information',
ALTER COLUMN "description" SET DEFAULT 'No description provided',
ALTER COLUMN "cancellation_en" SET NOT NULL,
ALTER COLUMN "cancellation_en" SET DEFAULT 'No cancellation policy provided',
ALTER COLUMN "cancellation_es" SET NOT NULL,
ALTER COLUMN "cancellation_es" SET DEFAULT 'No cancellation policy provided',
ALTER COLUMN "cancellation_pl" SET NOT NULL,
ALTER COLUMN "cancellation_pl" SET DEFAULT 'No cancellation policy provided',
ALTER COLUMN "description_en" SET NOT NULL,
ALTER COLUMN "description_en" SET DEFAULT 'No description provided',
ALTER COLUMN "description_es" SET NOT NULL,
ALTER COLUMN "description_es" SET DEFAULT 'No description provided',
ALTER COLUMN "description_pl" SET NOT NULL,
ALTER COLUMN "description_pl" SET DEFAULT 'No description provided',
ALTER COLUMN "duration_en" SET NOT NULL,
ALTER COLUMN "duration_en" SET DEFAULT 'No duration provided',
ALTER COLUMN "duration_es" SET NOT NULL,
ALTER COLUMN "duration_es" SET DEFAULT 'No duration provided',
ALTER COLUMN "duration_pl" SET NOT NULL,
ALTER COLUMN "duration_pl" SET DEFAULT 'No duration provided',
ALTER COLUMN "location_en" SET NOT NULL,
ALTER COLUMN "location_en" SET DEFAULT 'No information provided',
ALTER COLUMN "location_es" SET NOT NULL,
ALTER COLUMN "location_es" SET DEFAULT 'No information provided',
ALTER COLUMN "location_pl" SET NOT NULL,
ALTER COLUMN "location_pl" SET DEFAULT 'No information provided',
ALTER COLUMN "title_en" SET NOT NULL,
ALTER COLUMN "title_en" SET DEFAULT 'Activity',
ALTER COLUMN "title_es" SET NOT NULL,
ALTER COLUMN "title_es" SET DEFAULT 'Activity',
ALTER COLUMN "title_pl" SET NOT NULL,
ALTER COLUMN "title_pl" SET DEFAULT 'Activity';
