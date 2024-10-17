/*
  Warnings:

  - Made the column `city` on table `Listing` required. This step will fail if there are existing NULL values in that column.
  - Made the column `location` on table `Listing` required. This step will fail if there are existing NULL values in that column.
  - Made the column `country` on table `Listing` required. This step will fail if there are existing NULL values in that column.
  - Made the column `bed` on table `Listing` required. This step will fail if there are existing NULL values in that column.
  - Made the column `bath` on table `Listing` required. This step will fail if there are existing NULL values in that column.
  - Made the column `sqft` on table `Listing` required. This step will fail if there are existing NULL values in that column.
  - Made the column `propertyType` on table `Listing` required. This step will fail if there are existing NULL values in that column.
  - Made the column `features` on table `Listing` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `Listing` required. This step will fail if there are existing NULL values in that column.
  - Made the column `image` on table `Listing` required. This step will fail if there are existing NULL values in that column.
  - Made the column `images` on table `Listing` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description_en` on table `Listing` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description_es` on table `Listing` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description_pl` on table `Listing` required. This step will fail if there are existing NULL values in that column.
  - Made the column `features_en` on table `Listing` required. This step will fail if there are existing NULL values in that column.
  - Made the column `features_es` on table `Listing` required. This step will fail if there are existing NULL values in that column.
  - Made the column `features_pl` on table `Listing` required. This step will fail if there are existing NULL values in that column.
  - Made the column `title_en` on table `Listing` required. This step will fail if there are existing NULL values in that column.
  - Made the column `title_es` on table `Listing` required. This step will fail if there are existing NULL values in that column.
  - Made the column `title_pl` on table `Listing` required. This step will fail if there are existing NULL values in that column.
  - Made the column `pictures` on table `Listing` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Listing" ALTER COLUMN "title" SET DEFAULT 'Real estate',
ALTER COLUMN "city" SET NOT NULL,
ALTER COLUMN "city" SET DEFAULT 'No information provided',
ALTER COLUMN "location" SET NOT NULL,
ALTER COLUMN "location" SET DEFAULT 'No information provided',
ALTER COLUMN "country" SET NOT NULL,
ALTER COLUMN "country" SET DEFAULT 'No information provided',
ALTER COLUMN "bed" SET NOT NULL,
ALTER COLUMN "bed" SET DEFAULT 0,
ALTER COLUMN "bath" SET NOT NULL,
ALTER COLUMN "bath" SET DEFAULT 0,
ALTER COLUMN "sqft" SET NOT NULL,
ALTER COLUMN "sqft" SET DEFAULT 0,
ALTER COLUMN "propertyType" SET NOT NULL,
ALTER COLUMN "propertyType" SET DEFAULT 'Unknown',
ALTER COLUMN "forRent" SET DEFAULT false,
ALTER COLUMN "features" SET NOT NULL,
ALTER COLUMN "features" SET DEFAULT 'No features provided',
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "description" SET DEFAULT 'No description provided',
ALTER COLUMN "image" SET NOT NULL,
ALTER COLUMN "image" SET DEFAULT '/path/to/default/image',
ALTER COLUMN "images" SET NOT NULL,.png
ALTER COLUMN "images" SET DEFAULT '/path/to/default/image.png',
ALTER COLUMN "description_en" SET NOT NULL,
ALTER COLUMN "description_en" SET DEFAULT 'No description provided',
ALTER COLUMN "description_es" SET NOT NULL,
ALTER COLUMN "description_es" SET DEFAULT 'No description provided',
ALTER COLUMN "description_pl" SET NOT NULL,
ALTER COLUMN "description_pl" SET DEFAULT 'No description provided',
ALTER COLUMN "features_en" SET NOT NULL,
ALTER COLUMN "features_en" SET DEFAULT 'No features provided',
ALTER COLUMN "features_es" SET NOT NULL,
ALTER COLUMN "features_es" SET DEFAULT 'No features provided',
ALTER COLUMN "features_pl" SET NOT NULL,
ALTER COLUMN "features_pl" SET DEFAULT 'No features provided',
ALTER COLUMN "title_en" SET NOT NULL,
ALTER COLUMN "title_en" SET DEFAULT 'Real estate',
ALTER COLUMN "title_es" SET NOT NULL,
ALTER COLUMN "title_es" SET DEFAULT 'Real estate',
ALTER COLUMN "title_pl" SET NOT NULL,
ALTER COLUMN "title_pl" SET DEFAULT 'Real estate',
ALTER COLUMN "pictures" SET NOT NULL,
ALTER COLUMN "pictures" SET DEFAULT '/path/to/default/image.png',
ALTER COLUMN "price" SET DEFAULT 0.00,
ALTER COLUMN "garage" SET DEFAULT false,
ALTER COLUMN "storage" SET DEFAULT false;
