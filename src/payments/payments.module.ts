import { Module } from '@nestjs/common';
import { PaymentsService } from './services/payments.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
//import { PaymentsController } from './controllers/payments.controller';

@Module({
  imports: [ConfigModule, HttpModule],
  //controllers: [PaymentsController],
  providers: [PaymentsService],
  exports: [PaymentsService]
})
export class PaymentsModule {}
