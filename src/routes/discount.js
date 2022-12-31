const express = require("express");
const { requireSignin, adminMiddleware } = require("../common_middleware");
const { createDiscount, getDiscountByName } = require("../controller/discount");
const router = express.Router();

router.post("/discount/create", requireSignin, adminMiddleware, createDiscount);
router.post("/discount/getdiscount", getDiscountByName);

module.exports = router;
