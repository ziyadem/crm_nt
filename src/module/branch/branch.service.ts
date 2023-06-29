import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common'
import { PrismaService } from '@prisma'
import { BranchCreatedRequest, BranchUpdateRequest } from './interfaces'
import { Branch } from '@prisma/client';

@Injectable()
export class BranchService {
  readonly #_prisma: PrismaService;

  constructor(prisma: PrismaService) {
    this.#_prisma = prisma;
  }

  async branchRetrieveAll(): Promise<Branch[]> {
    return this.#_prisma.branch.findMany({
      select: {
        branch_id: true,
        branch_title: true,
        branch_phone: true,
        branch_address: true,
        branch_created_at: true,
      },
    });
  }

  async branchCreate(payload: BranchCreatedRequest) {
    await this.#_checkBranch(payload.branch_title);
    try {
      await this.#_prisma.branch.create({
        data: {
          branch_title: payload.branch_title,
          branch_address: payload.branch_address,
          branch_phone: payload.branch_phone,
        },
      });
      return { message: 'branch created' };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async branchUpdate(payload: BranchUpdateRequest) {
    await this.#_foundedBranch(payload.branch_id);
    try {
      await this.#_prisma.branch.updateMany({
        where: {
          branch_id: payload.branch_id,
        },
        data: {
          branch_title: payload.branch_title,
          branch_address: payload.branch_address,
          branch_phone: payload.branch_phone,
        },
      })
      return { message: 'updated' }
      
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async #_checkBranch(branch_title: string): Promise<void> {
    const branch = await this.#_prisma.branch.findFirst({
      where: {
        branch_title: branch_title,
      },
    });

    if (branch) {
      throw new NotFoundException('Branch already exists');
    }
  }

  async #_foundedBranch(branch_id: string): Promise<void> {
    const branch = await this.#_prisma.branch.findFirst({
      where: {
        branch_id: branch_id,
      },
    });

    if (!branch) {
      throw new NotFoundException('Branch note found');
    }
  }
}
