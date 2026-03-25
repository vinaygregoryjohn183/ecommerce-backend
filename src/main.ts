import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable automatic validation for incoming requests
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Strips away properties not defined in the DTO
  }));

  // Get ConfigService to access environment variables
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 3000);

  await app.listen(port);
  console.log(`🚀 Application is running on: http://localhost:${port}`);
}
bootstrap();
