import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PaymentDocument = Payment & Document;

@Schema({ timestamps: true })
export class Payment {
  @Prop({ required: true, type: String })
  provider: 'stripe' | 'paypal';

  @Prop({ required: true, type: String })
  paymentId: string;

  @Prop({ type: String })
  status?: string;

  @Prop({ type: Number })
  amount?: number;

  @Prop({ type: String })
  currency?: string;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
