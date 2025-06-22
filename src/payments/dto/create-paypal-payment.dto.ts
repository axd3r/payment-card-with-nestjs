export interface CreatePaypalPaymentDto {
  amount: number;
  currency: 'usd' | 'eur';
  description?: string;
}
