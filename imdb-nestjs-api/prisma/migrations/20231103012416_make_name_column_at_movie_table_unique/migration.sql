/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Movie` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Movie_name_key" ON "Movie"("name");
