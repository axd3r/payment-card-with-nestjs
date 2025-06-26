import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCardPaymentDto } from '../dto/create-card-payment.dto';
import { CreatePaypalPaymentDto } from '../dto/create-paypal-payment.dto';
import Stripe from 'stripe';
import * as paypal from '@paypal/checkout-server-sdk';
import { toTwoDecimals } from '../utils/currency.util';
import { Payment, PaymentDocument } from '../entities/payment.entity';
import { OrdersCreateRequest } from '@paypal/checkout-server-sdk/lib/orders/ordersCreateRequest.js';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PaymentsService {
  private stripe: Stripe;
  private paypalClient: paypal.core.PayPalHttpClient;

  constructor(
    @InjectModel(Payment.name)
    private paymentModel: Model<PaymentDocument>
  ) {
    const stripeSecret = process.env.STRIPE_SECRET_KEY;

    if (!stripeSecret) {
      throw new Error('Stripe API key not configured in .env');
    }

    this.stripe = new Stripe(stripeSecret, {
      apiVersion: '2025-05-28.basil',
    });

    const paypalMode = process.env.PAYPAL_MODE || 'sandbox';
    const paypalClientId = process.env.PAYPAL_CLIENT_ID;
    const paypalClientSecret = process.env.PAYPAL_CLIENT_SECRET;

    if (!paypalClientId || !paypalClientSecret) {
      throw new Error('PayPal credentials not configured in .env');
    }

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

      await this.paymentModel.create({
        provider: 'stripe',
        paymentId: paymentIntent.id,
        status: paymentIntent.status,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
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
      const request = new OrdersCreateRequest();

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

      await this.paymentModel.create({
        provider: 'paypal',
        paymentId: response.result.id,
        status: response.result.status,
        amount: parseFloat(dto.amount.toFixed(2)),
        currency: dto.currency.toLowerCase(),
        description: dto.description,
      });
      
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
