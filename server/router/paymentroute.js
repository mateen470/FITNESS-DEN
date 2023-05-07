const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");

dotenv.config();

const stripe = require("stripe")(process.env.SECRET_KEY);

router.post("/", async (req, res) => {
  const { amount, ProductName } = req.body;

  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: "pkr",
    metadata: { "Product Name": ProductName },
  });
  res.status(200).json(paymentIntent.client_secret);
});
module.exports = router;
