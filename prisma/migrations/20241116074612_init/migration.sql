-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('PATIENT', 'LOCAL_DOCTOR', 'ADMIN', 'NURSE');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "code" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "passwordDigest" TEXT,
    "phoneNumber" TEXT NOT NULL,
    "phoneNumberVerified" TIMESTAMP(3),
    "role" "UserRole" NOT NULL DEFAULT 'PATIENT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "pin" TEXT,
    "pinCreatedAt" TIMESTAMP(3),
    "pinType" TEXT,
    "pinVerifiedAt" TIMESTAMP(3),
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL DEFAULT '',
    "lastName" TEXT NOT NULL DEFAULT '',
    "sex" TEXT,
    "dob" TEXT,
    "height" INTEGER,
    "weight" INTEGER,
    "picture" TEXT,
    "priceMin" INTEGER,
    "priceMax" INTEGER,
    "notifyEmail" BOOLEAN NOT NULL DEFAULT true,
    "notifyPush" BOOLEAN NOT NULL DEFAULT true,
    "notifyBadge" BOOLEAN NOT NULL DEFAULT true,
    "historyId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "specialistDesc" TEXT,
    "patientCode" TEXT,
    "allowPatientAssign" TIMESTAMP(3),

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sid" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SmsRequestAttempt" (
    "id" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SmsRequestAttempt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FileUpload" (
    "id" TEXT NOT NULL,
    "fileGroup" TEXT,
    "fileLink" TEXT NOT NULL,
    "fileSource" TEXT NOT NULL,
    "removedAt" TIMESTAMP(3),
    "createdBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "fileCategory" TEXT,
    "fileSourceDate" TEXT,
    "patientNoteId" TEXT,
    "fileMIMEType" TEXT NOT NULL,
    "specialistQuestionId" TEXT,

    CONSTRAINT "FileUpload_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IP2Location" (
    "id" TEXT NOT NULL,
    "ipFrom" BIGINT NOT NULL,
    "ipTo" BIGINT NOT NULL,
    "countryCode" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "IP2Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FirebaseToken" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FirebaseToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_code_key" ON "User"("code");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phoneNumber_key" ON "User"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_historyId_key" ON "Profile"("historyId");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_patientCode_key" ON "Profile"("patientCode");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sid_key" ON "Session"("sid");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
