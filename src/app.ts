import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { dbConfig } from '@config'
import { AdminModule } from '@module'
import { UserModule } from '@module'
import { BranchModule } from '@module'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [dbConfig],
      isGlobal: true,
    }),
    AdminModule,
    UserModule,
    BranchModule
  ],
})
export class App {}
