-- AlterTable
ALTER TABLE "Activity" ADD COLUMN     "discountAdults" DECIMAL(5,2) NOT NULL DEFAULT 0.00,
ADD COLUMN     "discountKids" DECIMAL(5,2) NOT NULL DEFAULT 0.00,
ADD COLUMN     "discountYouth" DECIMAL(5,2) NOT NULL DEFAULT 0.00,
ADD COLUMN     "maxAdults" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "maxKids" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "maxPersons" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "maxYouth" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "minAdults" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "minKids" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "minYouth" INTEGER NOT NULL DEFAULT 0;
