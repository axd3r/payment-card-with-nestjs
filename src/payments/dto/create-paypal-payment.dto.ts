import { IsString, IsNotEmpty, IsNumber, IsIn } from 'class-validator';

export class CreatePaypalPaymentDto {
  @IsNumber()
  amount: number;

  @IsString()
  @IsIn(['usd', 'eur'])
  currency: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
