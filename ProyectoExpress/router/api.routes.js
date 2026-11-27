const express =
    require("express");

const router =
    express.Router();

const authApiRoutes =
    require(
        "./api/auth.api.routes.js"
    );

const productsApiRoutes =
    require(
        "./api/products.api.routes.js"
    );

router.use(
    "/auth",
    authApiRoutes
);

router.use(
    "/products",
    productsApiRoutes
);

module.exports =
    router;