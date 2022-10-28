
const jwt = require('jsonwebtoken')

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
        return res.status(400).json({ message: 'Access denied' })
    }
    next();
}