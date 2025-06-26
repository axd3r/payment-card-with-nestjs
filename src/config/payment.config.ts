export default () => ({
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  paypalClientId: process.env.PAYPAL_CLIENT_ID,
  paypalClientSecret: process.env.PAYPAL_CLIENT_SECRET,
  paypalMode: process.env.PAYPAL_MODE || 'sandbox',
});
