-- CreateTable
CREATE TABLE "teachers" (
    "teacher_id" UUID NOT NULL DEFAULT GEN_RANDOM_UUID(),
    "teacher_first_name" VARCHAR(100) NOT NULL,
    "teacher_last_name" VARCHAR NOT NULL,
    "teacher_username" VARCHAR(100) NOT NULL,
    "teacher_age" INTEGER NOT NULL,
    "teacher_phone" VARCHAR(12) NOT NULL,
    "teacher_img" VARCHAR NOT NULL,
    "teacher_gender" VARCHAR NOT NULL,
    "user_id" UUID NOT NULL,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "teachers_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "teachers_teacher_username_key" ON "teachers"("teacher_username");

-- AddForeignKey
ALTER TABLE "teachers" ADD CONSTRAINT "teachers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION;
