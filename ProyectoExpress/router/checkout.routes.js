const express = require("express");

const checkoutController =
    require("../controller/checkout.controller");

const router = express.Router();


// ======================================================
// CHECKOUT
// ======================================================

// Mostrar vista temporal de checkout

router.get(
    "/checkout",
    checkoutController.showCheckout
);


module.exports = router;