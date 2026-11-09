const categoriesService =
    require(
        "../services/categories.service.js"
    );

// ======================================================
// OBTENER TODAS LAS CATEGORÍAS
// ======================================================

function getAll(
    req,
    res
) {

    const categories =
        categoriesService.getAll();

    return res
        .status(200)
        .json({
            data:
                categories
        });
}


// ======================================================
// OBTENER CATEGORÍA POR ID
// ======================================================

function getById(
    req,
    res
) {

    const categoryId =
        Number(
            req.params.id
        );

    if (
        Number.isNaN(
            categoryId
        )
    ) {

        return res
            .status(400)
            .json({
                error:
                    "ID de categoría inválido"
            });
    }


    const category =
        categoriesService.getById(
            categoryId
        );


    if (!category) {

        return res
            .status(404)
            .json({
                error:
                    "Categoría no encontrada"
            });
    }


    return res
        .status(200)
        .json({
            data:
                category
        });
}


// ======================================================
// CREAR CATEGORÍA
// ======================================================

function create(
    req,
    res
) {

    if (
        !req.body.name
    ) {

        return res
            .status(400)
            .json({
                error:
                    "El nombre de la categoría es obligatorio"
            });
    }


    const newCategory =
        categoriesService.create(
            req.body
        );


    return res
        .status(201)
        .json({
            message:
                "Categoría creada exitosamente",

            data:
                newCategory
        });
}


// ======================================================
// ACTUALIZAR CATEGORÍA
// ======================================================

function update(
    req,
    res
) {

    const categoryId =
        Number(
            req.params.id
        );


    if (
        Number.isNaN(
            categoryId
        )
    ) {

        return res
            .status(400)
            .json({
                error:
                    "ID de categoría inválido"
            });
    }


    const updatedCategory =
        categoriesService.update(
            categoryId,
            req.body
        );


    if (!updatedCategory) {

        return res
            .status(404)
            .json({
                error:
                    "Categoría no encontrada"
            });
    }


    return res
        .status(200)
        .json({
            message:
                "Categoría actualizada exitosamente",

            data:
                updatedCategory
        });
}


// ======================================================
// ELIMINAR CATEGORÍA
// ======================================================

function remove(
    req,
    res
) {

    const categoryId =
        Number(
            req.params.id
        );


    if (
        Number.isNaN(
            categoryId
        )
    ) {

        return res
            .status(400)
            .json({
                error:
                    "ID de categoría inválido"
            });
    }


    const deletedCategory =
        categoriesService.remove(
            categoryId
        );


    if (!deletedCategory) {

        return res
            .status(404)
            .json({
                error:
                    "Categoría no encontrada"
            });
    }


    return res
        .status(200)
        .json({
            message:
                "Categoría eliminada exitosamente",

            data:
                deletedCategory
        });
}


module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};