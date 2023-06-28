import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { dbConfig } from '@config'
import { AdminModule } from '@module'
import { UserModule } from '@module'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [dbConfig],
      isGlobal: true,
    }),
    AdminModule,
    UserModule
  ],
})
export class App {}
