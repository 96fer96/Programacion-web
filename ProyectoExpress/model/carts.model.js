const fs = require("fs");
const path = require("path");

const cartsPath = path.join(
    __dirname,
    "data",
    "carts.json"
);


function getAll() {

    const data = fs.readFileSync(
        cartsPath,
        "utf-8"
    );

    if (!data.trim()) {
        return [];
    }

    return JSON.parse(data);
}


function saveAll(carts) {

    fs.writeFileSync(
        cartsPath,
        JSON.stringify(carts, null, 4)
    );

}


function getByUserId(userId) {

    const carts = getAll();

    return carts.find(
        cart => cart.userId === userId
    );
}


function addProduct(userId, productId, quantity) {

    const carts = getAll();

    let cart = carts.find(
        cart => cart.userId === userId
    );


    // Si todavía no tiene carrito, lo creamos
    if (!cart) {

        cart = {
            userId: userId,
            items: []
        };

        carts.push(cart);
    }


    const existingItem =
        cart.items.find(
            item => item.productId === productId
        );


    // Si ya estaba, aumentamos cantidad
    if (existingItem) {

        existingItem.quantity += quantity;

    } else {

        cart.items.push({
            productId: productId,
            quantity: quantity
        });

    }


    saveAll(carts);

}


function updateQuantity(userId, productId, quantity) {

    const carts = getAll();

    const cart = carts.find(
        cart => cart.userId === userId
    );

    if (!cart) {
        return;
    }


    const item = cart.items.find(
        item => item.productId === productId
    );

    if (!item) {
        return;
    }


    item.quantity = quantity;

    saveAll(carts);
}


function removeProduct(userId, productId) {

    const carts = getAll();

    const cart = carts.find(
        cart => cart.userId === userId
    );

    if (!cart) {
        return;
    }


    cart.items = cart.items.filter(
        item => item.productId !== productId
    );


    saveAll(carts);
}


module.exports = {
    getAll,
    getByUserId,
    addProduct,
    updateQuantity,
    removeProduct
};