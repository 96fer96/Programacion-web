const express =
    require(
        "express"
    );

const router =
    express.Router();

const authApiController =
    require(
        "../../controller/auth.api.controller.js"
    );

router.post(
    "/login",
    authApiController.login
);

module.exports =
    router;