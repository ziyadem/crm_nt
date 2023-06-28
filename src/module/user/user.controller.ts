import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from "@nestjs/common"
import { ApiBearerAuth, ApiBody, ApiTags } from "@nestjs/swagger"
import { UserService } from "./user.service"
import { UserCreatedDto, UserLoginDto } from "./dto"
import { AuthorizationGuard, SuperAdminAuthorizationGuard } from "../guard"
import { TokenId } from "../decorators"

@ApiTags('Auth')
@Controller({
  path: 'auth/',
  version: '1.0.0',
})
export class UserController {
  constructor(readonly service: UserService) {
    this.service = service;
  }

  @HttpCode(HttpStatus.OK)
  @Post('created')
  @ApiBearerAuth()
  @UseGuards(SuperAdminAuthorizationGuard)
  @ApiBody({ type: UserCreatedDto })
  async userCreate(@TokenId() tokenId: any, @Body() body: UserCreatedDto) {
    console.log(tokenId);

    return await this.service.userCreate(body);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiBody({ type: UserLoginDto })
  async login(@Body() body: UserLoginDto) {
    return await this.service.login(body);
  }
}