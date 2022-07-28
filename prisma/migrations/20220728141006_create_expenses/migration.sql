-- CreateTable
CREATE TABLE "expenses" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    "value" REAL NOT NULL,
    CONSTRAINT "expenses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
