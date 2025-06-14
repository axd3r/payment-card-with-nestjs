
<p align="center">
  <a href="http://nestjs.com/" target="blank">
    <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" />
  </a>
</p>

<p align="center">A RESTful API for processing payments via Stripe (Visa, Mastercard, Amex) and PayPal, built with <a href="http://nestjs.com" target="_blank">NestJS</a>.</p>

<p align="center">
  <a href="https://www.npmjs.com/~nestjscore" target="_blank">
    <img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" />
  </a>
  <a href="https://www.npmjs.com/~nestjscore" target="_blank">
    <img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" />
  </a>
  <a href="https://www.npmjs.com/~nestjscore" target="_blank">
    <img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" />
  </a>
  <a href="https://circleci.com/gh/nestjs/nest" target="_blank">
    <img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" />
  </a>
  <a href="https://discord.gg/G7Qnnhy" target="_blank">
    <img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord" />
  </a>
</p>

---

## 🚀 Description

This project provides a secure and scalable API to handle payments via:

- 💳 Stripe (Visa, Mastercard, Amex)
- 💰 PayPal

It is built using the [NestJS](https://nestjs.com) framework and supports the latest features of Node.js.

---

## 📦 Installation

```bash
$ npm install
```

---

## 🔧 Environment Variables

Create a `.env` file in the root of your project and add the following:

```env
# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key

# PayPal
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret
PAYPAL_MODE=sandbox # or 'live'
```

---

## 📍 API Endpoints

### Stripe Payment

```
POST /payments/card
```

**Request Body (JSON)**:

```json
{
  "amount": 2000,
  "currency": "usd",
  "token": "tok_visa",
  "description": "Sample payment via Visa"
}
```

### PayPal Payment

```
POST /payments/paypal
```

**Request Body (JSON)**:

```json
{
  "amount": 49.99,
  "currency": "usd",
  "description": "Test order from PayPal"
}
```

---

## 🚀 Running the App

```bash
# development
$ npm run start

# watch mode (hot reload)
$ npm run start:dev

# production
$ npm run start:prod
```

---

## 🧪 Running Tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

---

## 📬 Postman Collection

You can import a ready-to-use Postman collection from the `/docs` folder to test all endpoints quickly.

---

## 🛠 Technologies

- [NestJS](https://nestjs.com)
- [Stripe SDK](https://stripe.com/docs/api)
- [PayPal SDK](https://developer.paypal.com/docs/api/overview/)
- [TypeScript](https://www.typescriptlang.org/)
- [dotenv](https://www.npmjs.com/package/dotenv)

---

## 👨‍💻 Author

- Created by [Joaquín Orihuela](https://github.com/tu-perfil)  
- Inspired by modern payment systems & secure financial APIs

---

## 📝 License

This project is [MIT licensed](LICENSE).

---

## 💬 Support & Contributions

- Found a bug or need a feature? Open an [issue](https://github.com/tu-repo/issues)
- Want to contribute? Submit a [pull request](https://github.com/tu-repo/pulls)

---

## ⭐ Star the project

If you find this helpful, please consider giving it a ⭐ on GitHub!
