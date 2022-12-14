-- DropForeignKey
ALTER TABLE "Server" DROP CONSTRAINT "Server_teamId_fkey";

-- AddForeignKey
ALTER TABLE "Server" ADD CONSTRAINT "Server_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;
