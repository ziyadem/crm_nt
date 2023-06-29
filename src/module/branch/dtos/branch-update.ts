import { IsString, IsNotEmpty, IsOptional } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { BranchUpdateRequest } from '../interfaces'

export class BranchUpdateDto implements Omit<BranchUpdateRequest, 'id'> {
  @ApiProperty({ example: 'chilonzor' })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  branch_title?: string;

  @ApiProperty({ example: 'toshkent shaxar,sebzor kochasi' })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  branch_address?: string;

  @ApiProperty({ example: '999999999' })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  branch_phone?: string;
}
