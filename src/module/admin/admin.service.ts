import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common"
import { PrismaService } from "@prisma"
import { AdminCreatedRequest } from "./interfaces";
import { ApiInternalServerErrorResponse } from "@nestjs/swagger";

@Injectable()
export class AdminService {
  readonly #_prisma: PrismaService;

  constructor(prisma: PrismaService) {
    this.#_prisma = prisma;
  }

  async adminCreated(payload: AdminCreatedRequest) {
    await this.#_checkAdmin(payload.user_name)
    await this.#_checkBranch(payload.branch_id)
    try {  
        await this.#_prisma.user.create({
          data: {
            user_name: payload.user_name,
            user_password: payload.user_password,
            user_role: "admin",
            branch_id: payload.branch_id,
          }          
        })
        return {message:"admin created"}
    } catch (error) {
        console.log(error);
        throw new InternalServerErrorException()       
    }

  }

  async #_checkAdmin(user_name: string): Promise<void> {
    const admin = await this.#_prisma.user.findFirst({
      where: {
        user_name: user_name,
      },
    });
    if (admin) {
      throw new NotFoundException('Admin already exists');
    }
  }

  async #_checkBranch(id: string): Promise<void> {
    const branch = await this.#_prisma.branch.findFirst({
      where: {
        branch_id: id,
      },
    });
    if (!branch) {
      throw new NotFoundException('Branch not found');
    }
  }
}