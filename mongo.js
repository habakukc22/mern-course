const MongoClient = require("mongodb").MongoClient;
const productSchema = require("./models/product");

const url =
  "mongodb+srv://habakukc22:MVEMAnrnhTIEVqEB@cluster0.orn0ind.mongodb.net/products_test?retryWrites=true&w=majority";

const createProduct = async (req, res, next) => {
  const newProduct = {
    name: req.body.name,
    price: req.body.price,
  };
  const client = new MongoClient(url);

  try {
    await client.connect();
    const db = client.db();
    const result = await db.collection("products").insertOne(newProduct);
  } catch (error) {
    return res.json({ message: "Could not store data." });
  }

  client.close(); // na aula é assim, porém aqui não está funcioando

  res.json(newProduct);
};

const getProducts = async (req, res, next) => {
  const client = new MongoClient(url);
  let products;
  try {
    await client.connect();
    const db = client.db();
    products = await db.collection("products").find().toArray();
  } catch (error) {
    return res.json({ message: "ERROR" });
  }

  client.close();

  res.json(products);
};

exports.createProduct = createProduct;
exports.getProducts = getProducts;
