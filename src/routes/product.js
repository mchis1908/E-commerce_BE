const express = require("express");
// const { addCategory, getCategory } = require('../controller/category');
const {
  requireSignin,
  adminMiddleware,
  userMiddleware,
} = require("../common_middleware");
const {
  createProduct,
  getProductsBySlug,
  getProductDetailsById,
  deleteProductById,
  getProducts,
  getUserProducts,
  addReviewToProduct,
  addSalePrice,
} = require("../controller/product");
const multer = require("multer");
const router = express.Router();
const shortid = require("shortid");
const path = require("path");

// Lưu trữ ảnh product
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Kiểm tra và tạo product
router.post(
  "/product/create",
  requireSignin,
  adminMiddleware,
  upload.array("productPicture"),
  createProduct
);
// Lấy thông tin product
router.get("/products/:slug", getProductsBySlug);
// router.get('/category/getcategory', getCategory);
router.get("/product/:productId", getProductDetailsById);
router.get("/products", getUserProducts);

router.delete(
  "/product/deleteProductById",
  requireSignin,
  adminMiddleware,
  deleteProductById
);
router.post(
  "/product/getProducts",
  requireSignin,
  adminMiddleware,
  getProducts
);

router.post(
  "/product/addReview",
  requireSignin,
  userMiddleware,
  addReviewToProduct
);

router.post("/product/addSale", requireSignin, adminMiddleware, addSalePrice);
module.exports = router;
