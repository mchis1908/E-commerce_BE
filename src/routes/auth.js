const express = require("express");
const {
  signup,
  signin,
  changeInfo,
  changePassword,
} = require("../controller/auth");
const { requireSignin, userMiddleware } = require("../common_middleware");
const {
  validateSignupRequest,
  isRequestValidated,
  validateSigninRequest,
} = require("../validators/auth");
const router = express.Router();

router.post("/signup", validateSignupRequest, isRequestValidated, signup);
router.post("/signin", validateSigninRequest, isRequestValidated, signin);
router.post("/user/changeInfo", requireSignin, userMiddleware, changeInfo);
router.post(
  "/user/changePassword",
  requireSignin,
  userMiddleware,
  changePassword
);
// router.post('/profile', requireSignin, (req, res) => {
//     res.status(200).json({ user: 'profile' })
// })

module.exports = router;
