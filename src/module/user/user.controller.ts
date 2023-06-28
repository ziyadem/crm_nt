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
  @Post('create-admin')
  @ApiBearerAuth()
  @UseGuards(SuperAdminAuthorizationGuard)
  @ApiBody({ type: UserCreatedDto })
  async adminCreate( @Body() body: UserCreatedDto ) {
    return await this.service.adminCreate(body)
  }

  @HttpCode(HttpStatus.OK)
  @Post('create-teacher')
  @ApiBearerAuth()
  @UseGuards(AuthorizationGuard)
  @ApiBody({ type: UserCreatedDto })
  async teacherCreate( @Body() body: UserCreatedDto) {
    return await this.service.teacherCreate(body)
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiBody({ type: UserLoginDto })
  async login(@Body() body: UserLoginDto) {
    return await this.service.login(body);
  }
}