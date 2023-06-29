import { IsUUID, IsString, IsNotEmpty } from 'class-validator';
import { BranchCreatedRequest } from '../interfaces';
import { ApiProperty } from '@nestjs/swagger';

export class BranchCreateDto implements BranchCreatedRequest {
  @ApiProperty({ example: 'chilonzor' })
  @IsString()
  @IsNotEmpty()
  branch_title: string

  @ApiProperty({ example: 'toshkent shaxar,sebzor kochasi' })
  @IsString()
  @IsNotEmpty()
  branch_address: string

  @ApiProperty({ example: '999999999' })
  @IsString()
  @IsNotEmpty()
  branch_phone: string
}
