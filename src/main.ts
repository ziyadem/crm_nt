import type {INestApplication } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { appConfig } from '@config'
import { App } from './app'

setImmediate(async (): Promise<void> => {
  const app = await NestFactory.create<INestApplication>(App)

  const config = new DocumentBuilder()
    .setDescription('the user Api description')
    .build();

  const document = SwaggerModule.createDocument(app, config)

  SwaggerModule.setup('/docs', app, document)

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      stopAtFirstError: true,
    }),
  )

  await app.listen(appConfig.port)
})
