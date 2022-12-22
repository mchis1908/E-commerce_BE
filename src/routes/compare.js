const express = require("express");
const { requireSignin, userMiddleware } = require("../common_middleware");

const {
  addItemToCompare,
  getCompareItems,
  removeCompareItems,
} = require("../controller/compare");
const router = express.Router();

router.post(
  "/user/compare/addtocompare",
  requireSignin,
  userMiddleware,
  addItemToCompare
);

router.post(
  "/user/getCompareItems",
  requireSignin,
  userMiddleware,
  getCompareItems
);
router.post(
  "/user/compare/removeItem",
  requireSignin,
  userMiddleware,
  removeCompareItems
);
module.exports = router;
