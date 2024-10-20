/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Company` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "access_token" TEXT,
ADD COLUMN     "refresh_token" TEXT,
ALTER COLUMN "fb_link" DROP NOT NULL,
ALTER COLUMN "insta_link" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Company_email_key" ON "Company"("email");
