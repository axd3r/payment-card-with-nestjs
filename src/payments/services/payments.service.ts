import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateCardPaymentDto } from '../dto/create-card-payment.dto';
import { CreatePaypalPaymentDto } from '../dto/create-paypal-payment.dto';
import Stripe from 'stripe';
import * as paypal from '@paypal/checkout-server-sdk';
import { toTwoDecimals } from '../utils/currency.util';

@Injectable()
export class PaymentsService {
  private stripe: Stripe;
  private paypalClient: paypal.core.PayPalHttpClient;

  constructor(private configService: ConfigService) {
    const stripeSecret = this.configService.get<string>('STRIPE_SECRET_KEY');

    if (!stripeSecret) {
      throw new Error('Stripe API key not configured in .env');
    }

    this.stripe = new Stripe(stripeSecret, {
      apiVersion: '2025-05-28.basil',
    });

    const paypalMode = this.configService.get<string>('PAYPAL_MODE') || 'sandbox';
    const paypalClientId = this.configService.get<string>('PAYPAL_CLIENT_ID');
    const paypalClientSecret = this.configService.get<string>('PAYPAL_CLIENT_SECRET');

    const environment =
      paypalMode === 'live'
        ? new paypal.core.LiveEnvironment(paypalClientId, paypalClientSecret)
        : new paypal.core.SandboxEnvironment(paypalClientId, paypalClientSecret);

    this.paypalClient = new paypal.core.PayPalHttpClient(environment);
  }

  async createStripedPayment(dto: CreateCardPaymentDto) {
    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: dto.amount,
        currency: dto.currency,
        payment_method: dto.token,
        confirm: true,
        description: dto.description,
        automatic_payment_methods: {
          enabled: true,
          allow_redirects: 'never',
        },
      });

      return {
        id: paymentIntent.id,
        status: paymentIntent.status,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async createPaypalPayment(dto: CreatePaypalPaymentDto) {
    try {
      const request = new paypal.orders.OrdersCreateRequest();
      request.requestBody({
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: dto.currency.toUpperCase(),
              value: toTwoDecimals(dto.amount),
            },
            description: dto.description,
          },
        ],
      });

      const response = await this.paypalClient.execute(request);
      return {
        id: response.result.id,
        status: response.result.status,
        links: response.result.links,
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
