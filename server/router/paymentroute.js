const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const AllPaymentsModel = require("../model/allPayments");
dotenv.config();

const stripe = require("stripe")(process.env.SECRET_KEY);

router.post("/", async (req, res) => {
  const { amount, ProductName } = req.body;

  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: "pkr",
    metadata: { "Product Name": ProductName },
  });
  return res.status(200).json(paymentIntent.client_secret);
});
router.post("/allPayments", async (req, res) => {
  try {
    const data = new AllPaymentsModel();
    data.PlanType = req.body.PlanType;
    data.PlanAmount = req.body.PlanAmount;
    await data.save();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json(error);
  }
});
router.get("/allPayments", async (req, res) => {
  const data = await AllPaymentsModel.find();
  res.send(data);
});
module.exports = router;
