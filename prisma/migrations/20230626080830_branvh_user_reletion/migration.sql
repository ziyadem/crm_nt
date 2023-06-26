-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "branchs"("branch_id") ON DELETE CASCADE ON UPDATE NO ACTION;
