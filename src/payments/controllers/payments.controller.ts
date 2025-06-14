import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { PaymentsService } from '../services/payments.service';
import { CreateCardPaymentDto } from '../dto/create-card-payment.dto';
import { CreatePaypalPaymentDto } from '../dto/create-paypal-payment.dto';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('card')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async createCardPayment(@Body() dto: CreateCardPaymentDto) {
    return this.paymentsService.createStripedPayment(dto);
  }

  @Post('paypal')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async createPaypalPayment(@Body() dto: CreatePaypalPaymentDto) {
    return this.paymentsService.createPaypalPayment(dto);
  }
}
