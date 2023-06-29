import { Module } from '@nestjs/common'
import { PrismaService } from '@prisma'
import { BranchController } from './branch.controller'
import { BranchService } from './branch.service'

@Module({
  providers: [PrismaService, BranchService],
  controllers: [BranchController],
})
export class BranchModule {}
