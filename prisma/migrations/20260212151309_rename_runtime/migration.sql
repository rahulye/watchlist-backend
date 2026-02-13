/*
  Warnings:

  - You are about to drop the column `runTime` on the `Movie` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "runTime",
ADD COLUMN     "runtime" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
