const express =
    require("express");

const router =
    express.Router();

const productsApiController =
    require(
        "../../controller/products.api.controller.js"
    );

const {
    requireAdmin
} = require(
    "../../middleware/requireAdmin.middleware.js"
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
    requireAdmin,
    productsApiController.create
);

router.put(
    "/:id",
    verifyToken,
    requireAdmin,
    productsApiController.update
);

router.delete(
    "/:id",
    verifyToken,
    requireAdmin,
    productsApiController.remove
);

module.exports =
    router;