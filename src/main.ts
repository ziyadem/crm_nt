import type {INestApplication } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { appConfig } from '@config'
import { App } from './app'

setImmediate(async (): Promise<void> => {
  const app = await NestFactory.create<INestApplication>(App)

  const config = new DocumentBuilder() .addBearerAuth()
     .setTitle('Nestjs_exap_portfolio example')
     .setDescription('The nestjs and swager API description')
     .setVersion('1.0')
     .build()

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
