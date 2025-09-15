import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ThrottlerExceptionFilter } from './exceptions/throttler-exception.filter';
import { initEnv } from './app-packages/config/base';

initEnv();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Automatically transform payloads to DTO types
      whitelist: true, // Strip properties not in the DTO
      forbidNonWhitelisted: true, // Throw an error if properties are not in the DTO
    }),
  );

  // Apply the throttler exception filter globally
  app.useGlobalFilters(new ThrottlerExceptionFilter());

  app.enableCors({});
  await app.listen(process.env.PORT ?? 3010);
  console.log('[+] server in running on PORT: 3010');
}
bootstrap();
