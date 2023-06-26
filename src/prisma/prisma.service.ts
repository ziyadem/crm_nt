import type { OnModuleDestroy, OnModuleInit } from '@nestjs/common' 
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit,OnModuleDestroy{
    constructor(config:ConfigService){
        super({
          datasources: {
            db: {
              url: config.getOrThrow<string>('db.url'),
            },
          },
        });
    }

    async onModuleInit() {
        await this.$connect()
    }

    async onModuleDestroy() {
        await this.$disconnect()
    }
}
