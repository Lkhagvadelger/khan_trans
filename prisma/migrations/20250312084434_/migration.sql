-- CreateTable
CREATE TABLE "Load" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "LoadID" TEXT NOT NULL,
    "PickUpDate" TIMESTAMP(3) NOT NULL,
    "DeliveryDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Load_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vehicle" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "Vehicle" TEXT NOT NULL,
    "VehicleWeight" INTEGER NOT NULL,
    "VehicleType" TEXT NOT NULL,
    "VehicleYear" INTEGER NOT NULL,
    "VehicleMake" TEXT NOT NULL,
    "VehicleModel" TEXT NOT NULL,
    "VehicleColor" TEXT NOT NULL,
    "VehicleLotNumber" TEXT NOT NULL,

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoadAddress" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "Location" TEXT NOT NULL,
    "Contact" TEXT NOT NULL,
    "ContactPhone" TEXT NOT NULL,

    CONSTRAINT "LoadAddress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Note" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "Note" TEXT NOT NULL,

    CONSTRAINT "Note_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "Payment" TEXT NOT NULL,
    "PaymentDate" TIMESTAMP(3) NOT NULL,
    "PaymentAmount" INTEGER NOT NULL,
    "PaymentMethod" TEXT NOT NULL,
    "PaymentStatus" TEXT NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Driver" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "Driver" TEXT NOT NULL,
    "DriverPhone" TEXT NOT NULL,
    "DriverEmail" TEXT NOT NULL,
    "DriverLicense" TEXT NOT NULL,
    "DriverLicenseExpiry" TIMESTAMP(3) NOT NULL,
    "DriverLicenseState" TEXT NOT NULL,
    "DriverLicenseNumber" TEXT NOT NULL,

    CONSTRAINT "Driver_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BrokerInfo" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "BrokerName" TEXT NOT NULL,
    "BrokerEmail" TEXT NOT NULL,
    "BrokerContact" INTEGER NOT NULL,
    "MC_Number" INTEGER NOT NULL,

    CONSTRAINT "BrokerInfo_pkey" PRIMARY KEY ("id")
);
