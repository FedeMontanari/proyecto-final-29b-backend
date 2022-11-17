const { Router } = require("express");
const { STRIPE_SECRET_KEY } = process.env;
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const router = Router();

router.get("", (req, res) => {
  res.send({
    publishableKey: STRIPE_SECRET_KEY,
  });
});

router.post('create-payent-intent', async(req, res) => {
  try {
  const paymentIntent = await stripe.paymentIntent.create({
    currency: 'args',
    amoun: 1999,
    automatic_payment_methods: {
      enable: true,
    }
  })    
    res.send({clientSecret: paymentIntent.client_secret})
  } catch (e) {
    res.status(400).send({
      error:{
        message: e.message
      }
    })
  }
} )

module.exports = router;
