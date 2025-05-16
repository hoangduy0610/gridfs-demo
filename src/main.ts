import { AppModule } from '@app/app.module';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';
import { join } from 'path';

require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['warn', 'error', 'debug', 'log', 'verbose'],
  });

  app.useStaticAssets(join(__dirname, '..', 'resources'), {
    prefix: '/static/',
  });

  app.useStaticAssets(join(__dirname, '..', 'views'), {
    prefix: '/web/',
  });

  app.use('/swagger-ui.html', basicAuth({
    challenge: true,
    users: { admin: 'admin' },
  }));

  app.enableCors({});

  const options = new DocumentBuilder()
    .setTitle('GridFS Demo')
    .setVersion('1.0')
    .addBearerAuth();

  if (process.env.MODE === 'production') {
    options.addServer("https://");
  } else if (process.env.MODE === 'test') {
    options.addServer("/");
  }

  const document = SwaggerModule.createDocument(app, options.build());
  SwaggerModule.setup('/swagger-ui.html', app, document);
  await app.listen(process.env.PORT || 80);

  Logger.log(`Server is running on ${await app.getUrl()}`, 'Bootstrap');
}

bootstrap();