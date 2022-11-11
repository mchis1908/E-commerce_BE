const express = require('express');
const { requireSignin, adminMiddleware } = require('../common_middleware');

const { addCategory, getCategory, updateCategories } = require('../controller/category');
const router = express.Router();
const shortid = require('shortid');
const path = require('path');
const multer = require('multer');

// Lưu trữ ảnh product
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), 'uploads'));
    },
    filename: function (req, file, cb) {
        cb(null, shortid.generate() + '-' + file.originalname);
    }
})

const upload = multer({ storage });

// Kiểm tra và tạo category
router.post('/category/create', requireSignin, adminMiddleware, upload.single('categoryImage'), addCategory);
// Lấy thông tin category
router.get('/category/getcategory', getCategory);
//Cập nhật thông tin category
router.post('/category/update', upload.array('categoryImage'), updateCategories);

module.exports = router;