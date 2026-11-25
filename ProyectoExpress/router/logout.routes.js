const express =
    require("express");

const logoutController =
    require("../controller/logout.controller");

const router =
    express.Router();

const {
    requireLogin
} = require(
    "../middleware/sessionAuth.middleware.js"
);


// ======================================================
// LOGOUT
// ======================================================

router.post(
    "/logout",
    requireLogin,
    logoutController.logout
);


module.exports = router;