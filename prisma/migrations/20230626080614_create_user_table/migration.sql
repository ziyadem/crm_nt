-- CreateTable
CREATE TABLE "users" (
    "user_id" UUID NOT NULL DEFAULT GEN_RANDOM_UUID(),
    "user_name" VARCHAR(100) NOT NULL,
    "user_password" VARCHAR NOT NULL,
    "user_role" VARCHAR(100) NOT NULL DEFAULT 'admin',
    "branch_id" UUID NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_user_name_key" ON "users"("user_name");
