const express =
    require("express");

const logoutController =
    require("../controller/logout.controller");

const router =
    express.Router();


// ======================================================
// LOGOUT
// ======================================================

router.post(
    "/logout",
    logoutController.logout
);


module.exports = router;