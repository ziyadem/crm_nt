import { IsUUID, IsString, IsNotEmpty } from 'class-validator'
import { UserCreatedRequest } from "../interfaces"
import { ApiProperty } from '@nestjs/swagger'

export class UserCreatedDto implements UserCreatedRequest {
  @ApiProperty({ example: 'ziyadem17' })
  @IsString()
  @IsNotEmpty()
  user_name: string

  @ApiProperty({ example: 'ziyadem17' })
  @IsString()
  @IsNotEmpty()
  user_password: string

  @ApiProperty({ example: 'admin' })
  @IsString()
  @IsNotEmpty()
  user_role: string

  @ApiProperty({ example: 'f86e0071-a080-4ec4-b87c-03849542a871' })
  @IsUUID()
  @IsNotEmpty()
  branch_id: string
}
