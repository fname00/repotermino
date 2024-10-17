-- AlterTable
ALTER TABLE "Activity" ALTER COLUMN "image" SET DEFAULT '/images/listings/default.jpg',
ALTER COLUMN "pictures" SET DEFAULT '/images/listings/default.jpg';

-- AlterTable
ALTER TABLE "Listing" ALTER COLUMN "image" SET DEFAULT '/images/listings/default.jpg',
ALTER COLUMN "pictures" SET DEFAULT '/images/listings/default.jpg';
