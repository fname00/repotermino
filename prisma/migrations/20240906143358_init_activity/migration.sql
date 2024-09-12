-- CreateTable
CREATE TABLE "Activity" (
    "id" SERIAL NOT NULL,
    "image" TEXT NOT NULL,
    "images" TEXT[],
    "title" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "discount" TEXT,
    "forRent" BOOLEAN NOT NULL,
    "tags" TEXT[],
    "cancellation" TEXT NOT NULL,
    "featured" BOOLEAN NOT NULL,
    "availability" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);
