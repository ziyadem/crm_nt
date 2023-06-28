import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { PrismaService } from "@prisma"
import * as bcrypt from 'bcrypt'
import { UserCreatedRequest, UserLoginRequest } from "./interfaces"

@Injectable()
export class UserService {
  readonly #_prisma: PrismaService;
  private jwtService: JwtService;

  constructor(prisma: PrismaService, jwtService: JwtService) {
    this.#_prisma = prisma
    this.jwtService = jwtService
  }

  async login(payload: UserLoginRequest) { 
    
    const foundedUser = await this.#_prisma.user.findFirst({
      where: {
        user_name: payload.user_name,
      },
    })

    if (!foundedUser) {
      throw new NotFoundException('User Not Found')
    }

    let checkPsw = await bcrypt.compare(
         payload.user_password,
         foundedUser.user_password,
      )
    if (!checkPsw) return new BadRequestException('Password xato!')

    let token =  this.jwtService.sign({ id: foundedUser.user_id })

    return {
      message: 'loged!',
      data: {
        token: token,
        user_role: foundedUser.user_role,
      },
    }
  }

  async userCreate(payload: UserCreatedRequest) {
    await this.#_checkBranch(payload.branch_id)
    await this.#_checkUser(payload.user_name)
    try {
    let hashPas = await bcrypt.hash(payload.user_password, 12)
      await this.#_prisma.user.create({
        data: {
          user_name: payload.user_name,
          user_password: hashPas,
          user_role: payload.user_role,
          branch_id: payload.branch_id,
        },
      });
      return { message: 'user created' }
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }

  async #_checkUser(user_name: string): Promise<void> {
    const User = await this.#_prisma.user.findFirst({
      where: {
        user_name: user_name,
      },
    })
    if (User) {
      throw new NotFoundException('User already exists')
    }
  }

  async #_checkBranch(id: string): Promise<void> {

    const branch = await this.#_prisma.branch.findFirst({
      where: {
        branch_id: id,
      },
    })

    if (!branch) {
      throw new NotFoundException('Branch not found')
    }
  }
}