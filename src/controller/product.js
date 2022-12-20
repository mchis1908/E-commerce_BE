const Product = require("../models/product");
const shortid = require("shortid");
const slugify = require("slugify");
const Category = require("../models/category");

// Tạo product
exports.createProduct = (req, res) => {
  // res.status(200).json({ file: req.files, body: req.body });

  const { name, price, description, category, quantity, createdBy } = req.body;
  let productPictures = [];

  if (req.files.length > 0) {
    productPictures = req.files.map((file) => {
      return { img: file.filename };
    });
  }

  const product = new Product({
    name: req.body.name,
    slug: slugify(name),
    price,
    quantity,
    description,
    productPictures,
    category,
    createdBy: req.user._id,
  });

  product.save((error, product) => {
    if (error) return res.status(400).json({ error });
    if (product) {
      res.status(201).json({ product });
    }
  });
};

exports.getProductsBySlug = (req, res) => {
  const { slug } = req.params;
  Category.findOne({ slug: slug })
    .select("_id type")
    .exec((error, category) => {
      if (error) {
        return res.status(400).json({ error });
      }
      if (category) {
        Product.find({ category: category._id }).exec((error, products) => {
          if (error) {
            return res.status(400).json({ error });
          }

          if (category.type) {
            if (products.length > 0) {
              res.status(200).json({
                products,
                priceRange: {
                  under2000k: 2000000,
                  under5000k: 5000000,
                  under10000k: 10000000,
                  under15000k: 15000000,
                  under20000k: 20000000,
                  under30000k: 30000000,
                  under50000k: 50000000,
                },
                productsByPrice: {
                  under2000k: products.filter(
                    (product) => product.price <= 2000000
                  ),
                  under5000k: products.filter(
                    (product) =>
                      product.price > 2000000 && product.price <= 5000000
                  ),
                  under10000k: products.filter(
                    (product) =>
                      product.price > 5000000 && product.price <= 10000000
                  ),
                  under15000k: products.filter(
                    (product) =>
                      product.price > 10000000 && product.price <= 15000000
                  ),
                  under20000k: products.filter(
                    (product) =>
                      product.price > 15000000 && product.price <= 20000000
                  ),
                  under30000k: products.filter(
                    (product) =>
                      product.price > 20000000 && product.price <= 30000000
                  ),
                  under50000k: products.filter(
                    (product) =>
                      product.price > 30000000 && product.price <= 50000000
                  ),
                },
              });
            }
          } else {
            res.status(400).json({ products });
          }
        });
      }
    });
};

exports.getProductDetailsById = (req, res) => {
  const { productId } = req.params;
  if (productId) {
    Product.findOne({ _id: productId })
      .populate({
        path: "category",
        select: "_id slug",
      })
      .exec((error, product) => {
        if (error) return res.status(400).json({ error });
        if (product) {
          res.status(200).json({ product });
        }
      });
  } else {
    return res.status(400).json({ error: "Params required" });
  }
};

exports.deleteProductById = (req, res) => {
  const { productId } = req.body.payload;
  if (productId) {
    Product.deleteOne({ _id: productId }).exec((error, result) => {
      if (error) return res.status(400).json({ error });
      if (result) {
        res.status(202).json({ result });
      }
    });
  } else {
    res.status(400).json({ error: "Params required" });
  }
};

exports.getProducts = async (req, res) => {
  const products = await Product.find({ createdBy: req.user._id })
    .select("_id name price quantity slug description productPictures category")
    .populate({ path: "category", select: "_id name" })
    .exec();

  res.status(200).json({ products });
};

exports.getUserProducts = async (req, res) => {
  const products = await Product.find({})
    .select("_id name price quantity slug description productPictures category")
    .populate({ path: "category", select: "_id name" })
    .exec();

  res.status(200).json({ products });
};
