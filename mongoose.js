const mongoose = require("mongoose");
require("dotenv").config(); //In order to access the .env file

const Product = require("./models/product");

const password = process.env.MONGODB_PASSWORD;

// console.log(password);

mongoose
  .connect(
    `mongodb+srv://habakukc22:${password}@cluster0.orn0ind.mongodb.net/products_test?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

const createProduct = async (req, res, next) => {
  const createdProduct = new Product({
    name: req.body.name,
    price: req.body.price,
  });

  const result = await createdProduct.save();

  res.json(result);
};

const getProducts = async (req, res, next) => {
  const products = await Product.find().exec();
  // find is to get the collection based on the product schema
  //and exec is to turn it into new array

  res.json(products);
};

module.exports = {
  createProduct,
  getProducts,
};

// module.exports.createProduct = createProduct;
// module.exports.getProducts = getProducts;
