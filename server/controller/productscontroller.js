const Product = require("../model/products");

const ProductControllerFunction = {
  CreateProduct: async (req, res) => {
    try {
      const { image, title, metaDescription, content, price } = req.body;
      if (!title || !metaDescription || !content || !image || !price) {
        return await res
          .status(400)
          .json({ success: false, message: "PLEASE FILL IN ALL FIELDS!!" });
      }
      const productData = new Product({
        image,
        title,
        metaDescription,
        content,
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
      updatedProduct.content = req.body.content;
      updatedProduct.image = req.body.image;
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
};

module.exports = ProductControllerFunction;
