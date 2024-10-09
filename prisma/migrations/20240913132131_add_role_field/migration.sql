/*
  Warnings:

  - Made the column `hashedPassword` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'user',
ALTER COLUMN "hashedPassword" SET NOT NULL;
