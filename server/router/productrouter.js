const express = require("express");
const productRouter = express.Router();
const ProductControllerFunction = require("../controller/productscontroller");

productRouter.post("/add-product", ProductControllerFunction.CreateProduct);
productRouter.get("/all-products", ProductControllerFunction.ShowAllProducts);
productRouter.post("/add-review/:id", ProductControllerFunction.AddReview);
productRouter.get(
  "/single-product/:id",
  ProductControllerFunction.ViewSingleProduct
);
productRouter.put(
  "/update-product/:id",
  ProductControllerFunction.UpdateProduct
);
productRouter.delete(
  "/delete-product/:id",
  ProductControllerFunction.DeleteProduct
);

module.exports = productRouter;
