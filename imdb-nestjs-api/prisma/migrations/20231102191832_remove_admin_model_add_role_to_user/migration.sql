/*
  Warnings:

  - You are about to drop the column `adminId` on the `Vote` table. All the data in the column will be lost.
  - You are about to drop the `Admin` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN');

-- DropForeignKey
ALTER TABLE "Vote" DROP CONSTRAINT "Vote_adminId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'USER';

-- AlterTable
ALTER TABLE "Vote" DROP COLUMN "adminId";

-- DropTable
DROP TABLE "Admin";
