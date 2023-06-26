import {
  Injectable,
  Inject,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class SuperAdminAuthorizationGuard implements CanActivate {
  @Inject() private readonly jwtService: JwtService;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    let tokenId = request.headers.authorization;
    if (!tokenId) {
      throw new UnauthorizedException('token mavjus emas');
    }

    try {
      if (tokenId.startsWith('Bearer ')) {
        tokenId = tokenId.substr('Bearer '.length);
      }
      let id = await this.jwtService.verifyAsync(tokenId);
      if (id.id !== '8262c653-594b-43a5-9c19-1d0775028485') {
        throw new UnauthorizedException('token adminniki emas');
      }
    } catch (e) {
      throw new UnauthorizedException('token adminniki emas');
    }

    const decodeToken = await this.jwtService.decode(tokenId);
    if (!decodeToken) {
      throw new UnauthorizedException();
    }
    request.user = decodeToken;
    return true;
  }
}
