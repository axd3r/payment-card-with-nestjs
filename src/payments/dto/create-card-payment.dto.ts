import { IsString, IsNotEmpty, IsNumber, IsIn } from 'class-validator';

export class CreateCardPaymentDto {
  @IsNumber()
  amount: number;

  @IsString()
  @IsIn(['usd', 'eur'])
  currency: string;

  @IsString()
  @IsNotEmpty()
  token: string;

  @IsString()
  description: string;
}
