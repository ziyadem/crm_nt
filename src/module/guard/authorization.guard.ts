import {
    Injectable,
    Inject,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from '@prisma'

@Injectable()
export class AuthorizationGuard implements CanActivate {
  @Inject() private readonly jwtService: JwtService
  @Inject() private readonly prisma: PrismaService

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    let tokenId = request.headers.authorization
    if (!tokenId) {
      throw new UnauthorizedException('token mavjus emas')
    }
    try {
      if (tokenId.startsWith('Bearer ')) {
        tokenId = tokenId.substr('Bearer '.length)
      }
      let id = await this.jwtService.verifyAsync(tokenId)
      const user = await this.prisma.user.findFirst({
        where: {
          user_id:id.id,
        },
      })
      if (!user) {
        throw new UnauthorizedException('token invalid')
      }
    } catch (e) {
      throw new UnauthorizedException()
    }
    const decodeToken = await this.jwtService.decode(tokenId)
    if (!decodeToken) {
      throw new UnauthorizedException()
    }
    request.user = decodeToken
    return true
  }
}


