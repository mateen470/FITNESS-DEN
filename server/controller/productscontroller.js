const Product = require("../model/products");
const User = require("../model/auth-schema");
const utilityFunctions = require("../utility/utilityfunctions");

const ProductControllerFunction = {
  CreateProduct: async (req, res) => {
    try {
      const {
        mainImage,
        sideImageOne,
        sideImageTwo,
        title,
        metaDescription,
        info,
        price,
      } = req.body;
      if (
        !title ||
        !metaDescription ||
        !info ||
        !mainImage ||
        !sideImageOne ||
        !sideImageTwo ||
        !price
      ) {
        return await res
          .status(400)
          .json({ success: false, message: "PLEASE FILL IN ALL FIELDS!!" });
      }
      const productData = new Product({
        mainImage,
        sideImageOne,
        sideImageTwo,
        title,
        metaDescription,
        info,
        price,
      });

      await productData.save();

      return await res.status(200).json({
        success: true,
        message: "PRODUCT ADDED SUCCESSFULLY!!",
        data: productData,
      });
    } catch (error) {
      return await res.status(500).json({
        success: false,
        message: `CAN'T ADD PRODUCT!!`,
      });
    }
  },
  ShowAllProducts: async (req, res) => {
    try {
      const allProducts = await Product.find();

      return await res.status(200).json({
        success: true,
        message: "PRODUCTS FETCHED SUCCESSFULLY!!",
        data: allProducts,
      });
    } catch (error) {
      return await res.status(500).json({
        success: false,
        message: `CAN'T FETCH ALL PRODUCTS!!`,
      });
    }
  },
  ViewSingleProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const singleProduct = await Product.findById({ _id: id });
      return await res.status(200).json({
        success: true,
        message: "PRODUCT FETCHED SUCCESSFULLY!!",
        data: singleProduct,
      });
    } catch (error) {
      return await res.status(500).json({
        success: false,
        message: "AN ERROR OCCURED!!",
      });
    }
  },
  UpdateProduct: async (req, res) => {
    try {
      const updatedProduct = await Product.findOne({
        _id: req.params.id,
      });

      updatedProduct.title = req.body.title;
      updatedProduct.metaDescription = req.body.metaDescription;
      updatedProduct.info = req.body.info;
      updatedProduct.mainImage = req.body.mainImage;
      updatedProduct.sideImageOne = req.body.sideImageOne;
      updatedProduct.sideImageTwo = req.body.sideImageTwo;
      updatedProduct.price = req.body.price;

      await updatedProduct.save();

      return await res.status(200).json({
        success: true,
        message: "PRODUCT UPDATED SUCCESSFULLY!!",
        data: updatedProduct,
      });
    } catch (error) {
      return await res.status(500).json({
        success: false,
        message: "CAN'T UPDATE PRODUCT!!",
      });
    }
  },
  DeleteProduct: async (req, res) => {
    try {
      await Product.findOneAndDelete({ _id: req.params.id });
      return await res.status(200).json({
        success: true,
        message: "PRODUCT DELETED SUCCESSFULLY !!",
      });
    } catch (error) {
      return await res.status(500).json({
        success: false,
        message: "CAN'T DELETE PRODUCT!!",
      });
    }
  },
  AddReview: async (req, res) => {
    try {
      const id = req.params;
      const { review, rating } = req.body;
      if (!review) {
        return await res
          .status(400)
          .json({ success: false, message: "PLEASE WRITE A REVIEW FIRST!!" });
      }
      if (!rating) {
        return await res.status(400).json({
          success: false,
          message: "PLEASE RATE OUR PRODUCT AND SERVICES ALSO!!",
        });
      }

      const accessToken = req.header("Authorization")?.split(" ")[1] || "";
      if (!accessToken) {
        return await res.status(400).json({
          success: false,
        });
      }
      accessTokenVerified = await utilityFunctions.accessTokenVerification(
        accessToken
      );
      const user = await User.findOne({
        _id: accessTokenVerified.id,
      });

      const userName = user.name;
      const userId = user._id.toString();
      const productId = id.id;
      const product = await Product.findOne({ _id: productId });

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "PRODUCT NOT FOUND!!",
        });
      }
      const existingReview = product.comments.find(
        (productReview) => productReview.IDofCurrentUser === userId
      );
      if (existingReview) {
        return res.status(400).json({
          success: false,
          message: "YOU HAVE ALREADY REVIEWED THIS PRODUCT!!",
        });
      }
      const newReview = {
        IDofCurrentUser: user._id,
        nameOfUser: userName,
        comment: review,
      };

      product.comments.push(newReview);
      product.ratings.push(rating);
      product.reviewStars =
        product.ratings.reduce((a, b) => a + b, 0) / product.ratings.length;

      await product.save();

      return res.status(200).json({
        success: true,
        message: "THANK YOU FOR REVIEWING!!",
        data: newReview,
      });
    } catch (error) {
      return await res.status(500).json({
        success: false,
        message: `CAN'T ADD REVIEW!!${error.message}`,
      });
    }
  },
};

module.exports = ProductControllerFunction;
