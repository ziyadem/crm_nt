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
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags,ApiParam } from '@nestjs/swagger';
import { BranchService } from './branch.service';
import { AuthorizationGuard, SuperAdminAuthorizationGuard } from '../guard';
import { BranchCreateDto } from './dtos/branch-create.dto';
import { BranchUpdateDto } from './dtos'
import { IsUuidPipe } from '@validators';


@ApiTags('Branch')
@Controller({
  path: 'branch',
  version: '1.0.0',
})
export class BranchController {
  constructor(readonly service: BranchService) {
    this.service = service;
  }

  @HttpCode(HttpStatus.OK)
  @Get('all')
  @ApiBearerAuth()
  @UseGuards(AuthorizationGuard)
  async branchRetrieveAll() {
    return await this.service.branchRetrieveAll();
  }

  @HttpCode(HttpStatus.OK)
  @Post()
  @ApiBearerAuth()
  @UseGuards(SuperAdminAuthorizationGuard)
  @ApiBody({ type: BranchCreateDto })
  async branchCreate(@Body() body: BranchCreateDto) {
    return await this.service.branchCreate(body);
  }

  @HttpCode(HttpStatus.OK)
  @Patch(':branch_id')
  @ApiBearerAuth()
  @UseGuards(SuperAdminAuthorizationGuard)
  @ApiParam({
    name: 'branch_id',
    example: 'e6fb9ee2-6f5d-46bb-8b04-3b4a9b716419',
  })
  @ApiBody({ type: BranchUpdateDto })
  async branchUpdate(
    @Param('branch_id', IsUuidPipe) branch_id: string,
    @Body() body: BranchUpdateDto,
  ) {
    await this.service.branchUpdate({
      ...body,
      branch_id,
    });
  }
}
