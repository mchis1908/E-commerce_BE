const express = require("express");
const { requireSignin, userMiddleware } = require("../common_middleware");

const {
  addItemToWish,
  getWishItems,
  removeWishItems,
} = require("../controller/wish");
const router = express.Router();

router.post(
  "/user/wish/addtowish",
  requireSignin,
  userMiddleware,
  addItemToWish
);

router.post("/user/getWishItems", requireSignin, userMiddleware, getWishItems);
router.post(
  "/user/wish/removeItem",
  requireSignin,
  userMiddleware,
  removeWishItems
);
module.exports = router;
