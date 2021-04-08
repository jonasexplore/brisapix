import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './modules/app/app.module';
import { configSwagger } from './config/SwaggerConfig';

async function bootstrap() {
  const port: number = parseInt(`${process.env.PORT}`) || 3000;
  const app = await NestFactory.create(AppModule);

  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
}
bootstrap();
