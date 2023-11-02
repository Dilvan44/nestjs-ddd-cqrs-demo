-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Tasklist" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,
    CONSTRAINT "Tasklist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Tasklist" ("createdAt", "description", "id", "name") SELECT "createdAt", "description", "id", "name" FROM "Tasklist";
DROP TABLE "Tasklist";
ALTER TABLE "new_Tasklist" RENAME TO "Tasklist";
CREATE UNIQUE INDEX "Tasklist_id_key" ON "Tasklist"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
