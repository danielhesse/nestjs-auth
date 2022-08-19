import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { RedocModule, RedocOptions } from 'nestjs-redoc';
import { fstat } from 'fs';
import { writeFile } from 'fs/promises';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Pipes
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('NestJS Auth')
    .setDescription('The NestJS API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  // SwaggerModule.setup('docs', app, document);

  await writeFile('swagger.json', JSON.stringify(document));

  // const redocOptions: RedocOptions = {
  //   title: 'NestJS Auth Documentation',
  //   docName: 'NestJS Auth',
  //   sortPropsAlphabetically: true,
  //   hideDownloadButton: false,
  //   hideHostname: false,
  //   auth: {
  //     enabled: true,
  //     user: 'admin',
  //     password: '123',
  //   },
  //   theme: {},
  // };
  // // Instead of using SwaggerModule.setup() you call this module
  // await RedocModule.setup('/docs', app, document, redocOptions);

  await app.listen(3333);
}
bootstrap();
