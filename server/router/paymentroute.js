const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const AllPaymentsModel = require("../model/allPayments");
const EcomAllPaymentsModel = require("../model/ecomAllPayments");
const User = require("../model/auth-schema");
const utilityFunctions = require("../utility/utilityfunctions");
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
    data.IDofCurrentUser = req.body.IDofCurrentUser;
    data.AllProductsBoughtInfo = req.body.AllProductsBoughtInfo;
    data.CheckoutData = req.body.CheckoutData;
    await data.save();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json(error);
  }
});
router.get("/get-user-paid-products", async (req, res) => {
  try {
    const accessToken = req.header("Authorization")?.split(" ")[1] || "";
    if (!accessToken) {
      return await res.status(400).json({
        success: false,
        message: "UNAUTHORIZED!! NO TOKEN FOUND",
      });
    }
    accessTokenVerified = await utilityFunctions.accessTokenVerification(
      accessToken
    );
    const user = await User.findOne({
      _id: accessTokenVerified.id,
    });
    const userId = user._id.toString();

    const paidProducts = await EcomAllPaymentsModel.find({
      IDofCurrentUser: userId,
    });
    return res.status(200).json({
      success: true,
      message: "PRODUCTS FETCHED SUCCESSFULLY!!",
      data: paidProducts,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
}),
  router.get("/ecom-allPayments", async (req, res) => {
    try {
      const data = await EcomAllPaymentsModel.find();
      return res.status(200).json({
        success: true,
        message: "ALL PAID PRODUCTS FETCHED SUCCESSFULLY!!",
        data: data,
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  });
router.get("/ecom-single-porduct/:id", async (req, res) => {
  try {
    const porduct_Id = req.params;
    const data = await EcomAllPaymentsModel.findOne({ _id: porduct_Id.id });
    return res.status(200).json({
      success: true,
      message: "SINGLE PAID PRODUCTS FETCHED SUCCESSFULLY!!",
      data: data,
    });
  } catch (error) {
    return res.status(500).json(`THE ERROR IS ${error.message}`);
  }
});
router.put("/ecom-change-status/:id", async (req, res) => {
  try {
    const porduct_Id = req.params;
    const data = await EcomAllPaymentsModel.findOne({ _id: porduct_Id.id });
    data.status = req.body.deliveryStatus;
    await data.save();
    return res.status(200).json({
      success: true,
      message: "STATUS CHANGED!!",
    });
  } catch (error) {
    return res.status(500).json(`THE ERROR IS ${error.message}`);
  }
});

module.exports = router;
