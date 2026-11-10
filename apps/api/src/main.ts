import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

async function bootstrap() {
  const logger = new Logger('NexusVaultAPI');
  const app = await NestFactory.create(AppModule);

  // Global prefix
  app.setGlobalPrefix('api/v1');

  // CORS
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // Global Validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      forbidNonWhitelisted: false,
    }),
  );

  // Global Interceptor and Exception Filter
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter());

  // Swagger OpenAPI Docs
  const config = new DocumentBuilder()
    .setTitle('Nexus Vault — Game Library API')
    .setDescription(
      'Enterprise-grade RESTful API for digital video game management, cataloging, playtime telemetry, user reviews, and collections.',
    )
    .setVersion('1.0.0')
    .addTag('Games', 'Catalog, search, filter, and management of video games')
    .addTag('Collections', 'Curated lists, custom playlists, and categories')
    .addTag('Reviews', 'Community evaluations, ratings, pros and cons')
    .addTag('Statistics', 'Library metrics, playtime totals, genre distributions')
    .addTag('Health', 'Liveness and database health verification')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    customSiteTitle: 'Nexus Vault API Documentation',
  });

  const port = process.env.PORT || 4000;
  await app.listen(port, '0.0.0.0');

  logger.log(`=======================================================`);
  logger.log(`🎮 Nexus Vault Backend API listening on 0.0.0.0:${port}`);
  logger.log(`📖 Swagger API Docs: http://localhost:${port}/api/docs`);
  logger.log(`⚡ API Endpoint: http://localhost:${port}/api/v1`);
  logger.log(`=======================================================`);
}

bootstrap();
