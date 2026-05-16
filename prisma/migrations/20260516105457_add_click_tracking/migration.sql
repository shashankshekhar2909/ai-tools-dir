-- CreateTable
CREATE TABLE "Click" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "toolSlug" TEXT NOT NULL,
    "source" TEXT,
    "referer" TEXT,
    "userAgent" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE INDEX "Click_toolSlug_idx" ON "Click"("toolSlug");

-- CreateIndex
CREATE INDEX "Click_createdAt_idx" ON "Click"("createdAt");
