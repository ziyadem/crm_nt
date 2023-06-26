-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- CreateTable
CREATE TABLE "branchs" (
    "branch_id" UUID NOT NULL DEFAULT GEN_RANDOM_UUID(),
    "branch_title" VARCHAR(100) NOT NULL,
    "branch_address" VARCHAR NOT NULL,
    "branch_phone" VARCHAR(12) NOT NULL,
    "branch_created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "branchs_pkey" PRIMARY KEY ("branch_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "branchs_branch_title_key" ON "branchs"("branch_title");
