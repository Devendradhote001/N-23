const ProductModel = require("../models/product.model");

const createProductController = async (req, res) => {
  try {
    let { title, description, amount, currency, product_image } = req.body;

    let newProduct = await ProductModel.create({
      title,
      description,
      price: {
        amount: amount,
        currency: currency,
      },
      product_image,
      seller_id: req.user._id,
    });

    return res.status(201).json({
      message: "Product created",
      product: newProduct,
    });
  } catch (error) {
    console.log("error in creating products->", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = createProductController;
