/*
  Warnings:

  - Made the column `userId` on table `Tasklist` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Tasklist" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Tasklist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Tasklist" ("createdAt", "description", "id", "name", "userId") SELECT "createdAt", "description", "id", "name", "userId" FROM "Tasklist";
DROP TABLE "Tasklist";
ALTER TABLE "new_Tasklist" RENAME TO "Tasklist";
CREATE UNIQUE INDEX "Tasklist_id_key" ON "Tasklist"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
