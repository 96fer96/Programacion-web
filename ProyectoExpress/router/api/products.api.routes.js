const express =
    require("express");

const router =
    express.Router();

const productsApiController =
    require(
        "../../controller/products.api.controller.js"
    );

const {
    verifyToken
} = require(
    "../../middleware/verifyToken.middleware.js"
);

router.get(
    "/",
    productsApiController.getAll
);

router.get(
    "/:id",
    productsApiController.getById
);

router.post(
    "/",
    verifyToken,
    productsApiController.create
);

router.put(
    "/:id",
    verifyToken,
    productsApiController.update
);

router.delete(
    "/:id",
    verifyToken,
    productsApiController.remove
);

module.exports =
    router;