const productsService = require("../services/products.service");

function getAll(req, res) {
    const products = productsService.getAll();
    return res.status(200).json({
        data: products
    });
}

function getById(req, res) {
    const productId = parseInt(req.params.id);
    const product = productsService.getById(productId);

    if (product) {
        res.status(200).json({
            data: product
        });
    } else {
        res.status(404).json({ error: "Producto no encontrado" });
    }
}

//queda pendiente implementar las funciones de create, update y remove
function create(req, res) {
    
    if (req.body) {
        const newProduct = productsService.create(req.body);
        res.status(201).json({
            message: "Producto creado exitosamente",
            data: newProduct
        });
    } else {
        res.status(400).json({ error: "Datos del producto inválidos" });
    }
}

function update(req, res) {
    const productId = parseInt(req.params.id);
    
    if (productId) {
        const updatedProduct = productsService.update(productId, req.body);
        if (updatedProduct) {
            res.status(200).json({
                message: "Producto actualizado exitosamente",
                data: updatedProduct
            });
        } else {
            res.status(404).json({ error: "Producto no encontrado" });
        }
    }
}

function remove(req, res) {
    const productId = parseInt(req.params.id);
    
    if (productId) {
        const deletedProduct = productsService.remove(productId);
        if (deletedProduct) {
            res.status(200).json({
                message: "Producto eliminado exitosamente",
                data: deletedProduct
            });
        } else {
            res.status(204).json({ error: "Producto no encontrado" });
        }
    }
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};
