/*
  Warnings:

  - A unique constraint covering the columns `[BrokerEmail]` on the table `BrokerInfo` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[MC_Number]` on the table `BrokerInfo` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[DriverEmail]` on the table `Driver` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[DriverLicense]` on the table `Driver` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[DriverLicenseNumber]` on the table `Driver` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[LoadID]` on the table `Load` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Load" ADD COLUMN     "brokerId" TEXT,
ADD COLUMN     "driverId" TEXT;

-- AlterTable
ALTER TABLE "LoadAddress" ADD COLUMN     "loadId" TEXT;

-- AlterTable
ALTER TABLE "Note" ADD COLUMN     "loadId" TEXT;

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "loadId" TEXT;

-- AlterTable
ALTER TABLE "Vehicle" ADD COLUMN     "loadId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "BrokerInfo_BrokerEmail_key" ON "BrokerInfo"("BrokerEmail");

-- CreateIndex
CREATE UNIQUE INDEX "BrokerInfo_MC_Number_key" ON "BrokerInfo"("MC_Number");

-- CreateIndex
CREATE UNIQUE INDEX "Driver_DriverEmail_key" ON "Driver"("DriverEmail");

-- CreateIndex
CREATE UNIQUE INDEX "Driver_DriverLicense_key" ON "Driver"("DriverLicense");

-- CreateIndex
CREATE UNIQUE INDEX "Driver_DriverLicenseNumber_key" ON "Driver"("DriverLicenseNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Load_LoadID_key" ON "Load"("LoadID");

-- AddForeignKey
ALTER TABLE "Load" ADD CONSTRAINT "Load_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Load" ADD CONSTRAINT "Load_brokerId_fkey" FOREIGN KEY ("brokerId") REFERENCES "BrokerInfo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_loadId_fkey" FOREIGN KEY ("loadId") REFERENCES "Load"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoadAddress" ADD CONSTRAINT "LoadAddress_loadId_fkey" FOREIGN KEY ("loadId") REFERENCES "Load"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_loadId_fkey" FOREIGN KEY ("loadId") REFERENCES "Load"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_loadId_fkey" FOREIGN KEY ("loadId") REFERENCES "Load"("id") ON DELETE SET NULL ON UPDATE CASCADE;
