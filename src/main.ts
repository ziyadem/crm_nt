import type {INestApplication } from '@nestjs/common'
import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { App } from './app'
import { appConfig } from '@config'

setImmediate(async (): Promise<void> => {
  const app = await NestFactory.create<INestApplication>(App);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      stopAtFirstError: true,
    }),
  )
  
  await app.listen(appConfig.port)
})
