import { Module } from '@nestjs/common';
import { PaymentsService } from './services/payments.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { Payment, PaymentSchema } from './entities/payment.entity';
//import { PaymentsController } from './controllers/payments.controller';

@Module({
  imports: [
    ConfigModule, 
    HttpModule,
    MongooseModule.forFeature([
      { name: Payment.name, schema: PaymentSchema},
    ]),
  ],
  //controllers: [PaymentsController],
  providers: [PaymentsService],
  exports: [PaymentsService]
})
export class PaymentsModule {}
