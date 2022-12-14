-- CreateEnum
CREATE TYPE "ServerStatus" AS ENUM ('Pending', 'Running', 'Stopped');

-- CreateTable
CREATE TABLE "Team" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Server" (
    "ip" TEXT NOT NULL,
    "status" "ServerStatus" NOT NULL DEFAULT 'Pending',
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "teamId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Team_name_key" ON "Team"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Server_ip_key" ON "Server"("ip");

-- CreateIndex
CREATE UNIQUE INDEX "Server_teamId_key" ON "Server"("teamId");

-- AddForeignKey
ALTER TABLE "Server" ADD CONSTRAINT "Server_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
