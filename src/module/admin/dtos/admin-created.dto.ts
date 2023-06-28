import { IsUUID, IsString, IsNotEmpty } from 'class-validator'
import { AdminCreatedRequest } from "../interfaces"
import { ApiProperty } from '@nestjs/swagger'

export class AdminCreatedDto implements AdminCreatedRequest {
  @ApiProperty({ example: 'ziyadem_0117' })
  @IsString()
  @IsNotEmpty()
  user_name: string;

  @ApiProperty({ example: 'ziyadem17' })
  @IsString()
  @IsNotEmpty()
  user_password: string;

  @ApiProperty({ example: 'f86e0071-a080-4ec4-b87c-03849542a871' })
  @IsUUID()
  @IsNotEmpty()
  branch_id: string;
}
