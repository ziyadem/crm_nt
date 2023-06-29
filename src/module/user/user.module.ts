import { Module } from "@nestjs/common"
import { PrismaService } from "@prisma"
import { UserController } from "./user.controller"
import { UserService } from "./user.service"
import { JwtModule } from "@nestjs/jwt"

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.SEKRET_KEY_TOKEN,
      signOptions: { expiresIn: '365d' },
    }),
  ],
  providers: [PrismaService, UserService],
  controllers: [UserController],
})
export class UserModule {}