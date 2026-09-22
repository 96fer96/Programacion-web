const productsModel = require('../model/products.model');

// ======================================================
// CREAR CARRITO
// ======================================================

function createCart(userId) {

    return {

        userId: userId,

        items: []

    };

}

// ======================================================
// AGREGAR PRODUCTO AL CARRITO
// ======================================================

function addProduct(cart, productId, quantity) {


    // Validamos que la cantidad sea válida
    if (!quantity || quantity < 1) {

        return {
            success: false,
            error: "INVALID_QUANTITY"
        };

    }


    // Buscamos el producto
    const product =
        getProductById(productId);


    // Verificamos que el producto exista
    if (!product) {

        return {
            success: false,
            error: "PRODUCT_NOT_FOUND"
        };

    }


    // Verificamos que la cantidad solicitada no supere
    // el stock disponible del producto
    if (quantity > product.stock) {

        return {
            success: false,
            error: "INSUFFICIENT_STOCK"
        };

    }


    // Buscamos si el producto ya existe dentro del carrito
    const existingItem =
            cart.items.find(
            item =>
                item.productId === productId
        );


    // Si el producto ya estaba en el carrito,
    // aumentamos su cantidad.
    if (existingItem) {


        const newQuantity =
            existingItem.quantity +
            quantity;


        // Verificamos que la nueva cantidad total
        // no supere el stock disponible.
        if (newQuantity > product.stock) {

            return {
                success: false,
                error: "INSUFFICIENT_STOCK"
            };

        }


        existingItem.quantity =
            newQuantity;

    }


    // Si el producto no estaba en el carrito,
    // lo agregamos.
    else {

        cart.items.push({

            productId: productId,

            quantity: quantity

        });

    }


    return {
        success: true
    };

}

function getItems(cart) {
    //Se almacenan en la constante items los productos que se encuentran en el carrito, si el carrito no tiene
    //productos, se asigna un arreglo vacío.
    const items = cart
        ? cart.items.map(item => {

            const product =
                productsModel.getById(
                    item.productId
                );


            return {
                product: product,
                quantity: item.quantity,
                subtotal:
                    product.price *
                    item.quantity
            };

        })
        : [];


    return items;
}

// ======================================================
// ACTUALIZAR CANTIDAD
// ======================================================

function updateQuantity(cart, productId, quantity) {


    // Validamos que la cantidad sea válida
    if (!quantity || quantity < 1) {

        return {
            success: false,
            error: "INVALID_QUANTITY"
        };

    }


    // Buscamos el producto
    const product =
        getProductById(productId);


    if (!product) {

        return {
            success: false,
            error: "PRODUCT_NOT_FOUND"
        };

    }


    // Verificamos que no se supere el stock disponible
    if (quantity > product.stock) {

        return {
            success: false,
            error: "INSUFFICIENT_STOCK"
        };

    }


    // Buscamos el producto dentro del carrito
    const item =
            cart.items.find(
            item =>
                item.productId === productId
        );


    if (!item) {

        return {
            success: false,
            error: "ITEM_NOT_FOUND"
        };

    }


    // Actualizamos la cantidad almacenada en el carrito
    item.quantity =
        quantity;


    return {
        success: true
    };

}

function getTotal(items) {
    const total =
        items.reduce(
            (sum, item) =>
                sum + item.subtotal,
            0
        );
    return total;
}

function getProductById(productId) {
    return productsModel.getById(productId);
}

function removeProduct(cart, productId) {
    // Busco dentro del carrito el producto que se desea eliminar
    const item =
        cart.items.find(
            item =>
                item.productId === productId
        );


    if (!item) {
        return {
            success: false,
            error: "ITEM_NOT_FOUND"
        };
    }


    // Elimino el producto del carrito, filtrando los items que no coincidan con el productId del producto a eliminar
    //es decir, si se encuentra una coincidencia, se elimina el producto del carrito, y si no se encuentra, el carrito
    // permanece igual
    cart.items = cart.items.filter(
        item =>
            item.productId !== productId
    );

    //uso redirect para redirigir al usuario a la vista del carrito, que ahora estará actualizada sin el producto
    //eliminado
    return {
        success: true
    };

}

module.exports = {
    getItems,
    getTotal,
    getProductById,
    createCart,
    addProduct,
    updateQuantity,
    removeProduct
};

