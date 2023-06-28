import {
  Controller,
  HttpCode,
  HttpStatus,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  ParseUUIDPipe,
  Body,
} from '@nestjs/common';
import { ApiParam, ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { AdminService } from './admin.service'
import { AdminCreatedDto } from './dtos'


@ApiTags('Admin')
@Controller({
  path: 'admin/',
  version: '1.0.0',
})
export class AdminController {
  constructor(readonly service: AdminService) {
    this.service = service
  }

  @HttpCode(HttpStatus.OK)
  @Post()
  @ApiBody({ type: AdminCreatedDto })
  async bookCreate(@Body() body: AdminCreatedDto) {
    return await this.service.adminCreated(body)
  }
}
