const { requireSignin, userMiddleware } = require("../common_middleware");
const {
  addOrder,
  getOrders,
  getOrder,
  updateOrder,
} = require("../controller/order");
const router = require("express").Router();

router.post("/addOrder", requireSignin, userMiddleware, addOrder);
router.get("/getOrders", requireSignin, userMiddleware, getOrders);
router.post("/getOrder", requireSignin, userMiddleware, getOrder);
router.post(`/order/update`, requireSignin, userMiddleware, updateOrder);

module.exports = router;
