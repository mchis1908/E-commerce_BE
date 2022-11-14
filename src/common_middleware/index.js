const jwt = require('jsonwebtoken')
const multer = require('multer');
const shortid = require('shortid');
const path = require('path');

// Lưu trữ ảnh product
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), 'uploads'));
    },
    filename: function (req, file, cb) {
        cb(null, shortid.generate() + '-' + file.originalname);
    }
})

exports.upload = multer({ storage });

// Yêu cầu phải đăng nhập trước
exports.requireSignin = (req, res, next) => {

    if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;

    } else {
        return res.status(400).json({ message: 'Authorization required' })

    }
    next();

    //jwt.decode()
}

// Xác định là user
exports.userMiddleware = (req, res, next) => {
    if (req.user.role !== "user") {
        return res.status(400).json({ message: 'User access denied' })
    }
    next();
}

// Xác định là admin
exports.adminMiddleware = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(400).json({ message: 'Admin Access denied' })
    }
    next();
}