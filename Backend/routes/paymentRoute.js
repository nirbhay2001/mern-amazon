const express = require("express");
const router = express.Router();
const {
  processPayment,
  sendStripeApiKey,
} = require("../controllers/paymentController");

const { isAuthenticatedUser, } = require("../middleware/auth");

router.post("/payment/process",isAuthenticatedUser,processPayment)

router.get("/stripeapikey",isAuthenticatedUser, sendStripeApiKey)

module.exports = router;