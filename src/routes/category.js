const express = require('express');
const { requireSignin, adminMiddleware } = require('../common_middleware');

const { addCategory, getCategory } = require('../controller/category');
const router = express.Router();

// Kiểm tra và tạo category
router.post('/category/create', requireSignin, adminMiddleware, addCategory);
// Lấy thông tin category
router.get('/category/getcategory', getCategory);

module.exports = router;