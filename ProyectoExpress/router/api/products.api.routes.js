const express =
    require("express");

const router =
    express.Router();

const productsApiController =
    require(
        "../../controller/products.api.controller.js"
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
    productsApiController.create
);

router.put(
    "/:id",
    productsApiController.update
);

router.delete(
    "/:id",
    productsApiController.remove
);

module.exports =
    router;