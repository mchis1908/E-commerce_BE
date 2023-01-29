const express = require("express");
const { requireSignin, adminMiddleware } = require("../common_middleware");
const {
  createDiscount,
  getDiscountByName,
  getDiscounts,
  deleteDiscountById,
  updateDiscount,
} = require("../controller/discount");
const router = express.Router();

router.post("/discount/create", requireSignin, adminMiddleware, createDiscount);
router.post("/discount/getdiscount", getDiscountByName);
router.get("/discount/getdiscounts", getDiscounts);
router.delete(
  "/discount/deleteDiscountById",
  requireSignin,
  adminMiddleware,
  deleteDiscountById
);
router.post("/discount/update", requireSignin, adminMiddleware, updateDiscount);
module.exports = router;
