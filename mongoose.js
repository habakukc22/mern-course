const mongoose = require("mongoose");
require("dotenv").config();

const Product = require("./models/product");

const password = process.env.MONGODB_PASSWORD;

// console.log(password);

mongoose
  .connect(
    `mongodb+srv://habakukc22:${password}@cluster0.orn0ind.mongodb.net/products_test?retryWrites=true&w=majority`
    // `mongodb+srv://habakukc22:MVEMAnrnhTIEVqEB@cluster0.orn0ind.mongodb.net/products_test?retryWrites=true&w=majority`
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

  res.json(createdProduct);
};

exports.createProduct = createProduct;
