import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'
import { UserLoginRequest } from '../interfaces'

export class UserLoginDto implements UserLoginRequest {
  @ApiProperty({ example: 'ziyadem17' })
  @IsString()
  @IsNotEmpty()
  user_name: string

  @ApiProperty({ example: 'ziyadem17' })
  @IsString()
  @IsNotEmpty()
  user_password: string
}
