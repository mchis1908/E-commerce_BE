const express = require('express');
const { requireSignin, userMiddleware } = require('../common_middleware');

const { addItemToCart } = require('../controller/cart');
const router = express.Router();

// Yêu cầu NGƯỜI DÙNG phải đăng nhập để thêm sản phẩm vào giỏ hàng
router.post('/user/cart/addtocart', requireSignin, userMiddleware, addItemToCart);

module.exports = router;