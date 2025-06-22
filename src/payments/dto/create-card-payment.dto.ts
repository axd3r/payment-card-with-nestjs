export interface CreateCardPaymentDto {
  amount: number;
  currency: 'usd' | 'eur';
  token: string;
  description?: string;
}
