const express =
    require(
        "express"
    );

const router =
    express.Router();

const categoriesApiController =
    require(
        "../../controller/categories.api.controller.js"
    );


router.get(
    "/",
    categoriesApiController.getAll
);

router.get(
    "/:id",
    categoriesApiController.getById
);

router.post(
    "/",
    categoriesApiController.create
);

router.put(
    "/:id",
    categoriesApiController.update
);

router.delete(
    "/:id",
    categoriesApiController.remove
);


module.exports =
    router;