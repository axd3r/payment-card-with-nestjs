import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PaymentsService } from './payments/services/payments.service';

export async function createApplicationContext() {
  const app = await NestFactory.createApplicationContext(AppModule);
  await app.init();
  const paymentService = app.get(PaymentsService, { strict: false });
  return { paymentService };
}
