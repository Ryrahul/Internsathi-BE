-- AlterTable
ALTER TABLE "Education" ALTER COLUMN "start_date" SET DATA TYPE TEXT,
ALTER COLUMN "end_date" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "profile_picture" TEXT;
