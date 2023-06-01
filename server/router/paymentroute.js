const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const AllPaymentsModel = require("../model/allPayments");
const EcomAllPaymentsModel = require("../model/ecomAllPayments");
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
router.post("/ecom-payment", async (req, res) => {
  const { amount } = req.body;

  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: "pkr",
    // metadata: { "Product Name": ProductName },
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
router.post("/ecom-allPayments", async (req, res) => {
  try {
    const data = new EcomAllPaymentsModel();
    console.log(req.body);
    data.IDofCurrentUser = req.body.IDofCurrentUser;
    data.AllProductsBoughtInfo = req.body.AllProductsBoughtInfo;
    data.CheckoutData = req.body.CheckoutData;
    await data.save();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json(error);
  }
});
router.get("/ecom-allPayments", async (req, res) => {
  const data = await EcomAllPaymentsModel.find();
  res.send(data);
});
module.exports = router;
