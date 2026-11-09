const express =
    require("express");

const router =
    express.Router();

const productsApiRoutes =
    require(
        "./api/products.api.routes"
    );

router.use(
    "/products",
    productsApiRoutes
);

module.exports =
    router;