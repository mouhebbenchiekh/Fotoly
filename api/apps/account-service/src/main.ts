/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import MicroserviceInit from 'libs/shared/src/bootstrap';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const port = process.env.PORT || 3000;
  const app = await MicroserviceInit(
    'account',
    'account.proto',
    AppModule,
    port
  );

  await app.listen();
  Logger.log(`🚀 Application is running on: http://localhost:${port}/`);
}

bootstrap();
