import { api } from "encore.dev/api";
import { createApplicationContext } from "../applicationContext";
import { CreateCardPaymentDto } from "./dto/create-card-payment.dto";
import { CreatePaypalPaymentDto } from "./dto/create-paypal-payment.dto";

export const createCardPayment = api(
  {
    method: "POST",
    path: "/payments/card",
    expose: true,
  },
  async (dto: CreateCardPaymentDto) => {
    const { paymentService } = await createApplicationContext();
    return paymentService.createStripedPayment(dto);
  }
);

export const createPaypalPayment = api(
  {
    method: "POST",
    path: "/payments/paypal",
    expose: true,
  },
  async (dto: CreatePaypalPaymentDto) => {
    const { paymentService } = await createApplicationContext();
    return paymentService.createPaypalPayment(dto);
  }
);
