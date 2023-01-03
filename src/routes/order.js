const { requireSignin, userMiddleware } = require("../common_middleware");
const {
  addOrder,
  getOrders,
  getOrder,
  updateOrder,
  updateReviewOrder,
} = require("../controller/order");
const router = require("express").Router();

router.post("/addOrder", requireSignin, userMiddleware, addOrder);
router.get("/getOrders", requireSignin, userMiddleware, getOrders);
router.post("/getOrder", requireSignin, userMiddleware, getOrder);
router.post(`/user/order/update`, requireSignin, userMiddleware, updateOrder);
router.post(
  `/user/order/review`,
  requireSignin,
  userMiddleware,
  updateReviewOrder
);

module.exports = router;
