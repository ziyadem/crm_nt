-- CreateTable
CREATE TABLE "admins" (
    "admin_id" UUID NOT NULL,
    "admin_username" VARCHAR(100) NOT NULL,
    "admin_password" VARCHAR NOT NULL,
    "admin_role" VARCHAR(100) NOT NULL,
    "admin_branch_id" UUID NOT NULL,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("admin_id")
);
