-- AlterTable
ALTER TABLE "Activity" ADD COLUMN     "cancellation_en" TEXT,
ADD COLUMN     "cancellation_es" TEXT,
ADD COLUMN     "cancellation_pl" TEXT,
ADD COLUMN     "description_en" TEXT,
ADD COLUMN     "description_es" TEXT,
ADD COLUMN     "description_pl" TEXT,
ADD COLUMN     "duration_en" TEXT,
ADD COLUMN     "duration_es" TEXT,
ADD COLUMN     "duration_pl" TEXT,
ADD COLUMN     "location_en" TEXT,
ADD COLUMN     "location_es" TEXT,
ADD COLUMN     "location_pl" TEXT,
ADD COLUMN     "title_en" TEXT,
ADD COLUMN     "title_es" TEXT,
ADD COLUMN     "title_pl" TEXT;

-- AlterTable
ALTER TABLE "Listing" ADD COLUMN     "description_en" TEXT,
ADD COLUMN     "description_es" TEXT,
ADD COLUMN     "description_pl" TEXT,
ADD COLUMN     "features_en" TEXT[],
ADD COLUMN     "features_es" TEXT[],
ADD COLUMN     "features_pl" TEXT[],
ADD COLUMN     "location_en" TEXT,
ADD COLUMN     "location_es" TEXT,
ADD COLUMN     "location_pl" TEXT,
ADD COLUMN     "propertyType_en" TEXT,
ADD COLUMN     "propertyType_es" TEXT,
ADD COLUMN     "propertyType_pl" TEXT,
ADD COLUMN     "title_en" TEXT,
ADD COLUMN     "title_es" TEXT,
ADD COLUMN     "title_pl" TEXT;
