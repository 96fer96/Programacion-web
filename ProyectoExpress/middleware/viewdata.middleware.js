//Esta función es un middleware que se encarga de mostrar la información del carrito y del usuario logueado en el header
// el cual se ejecuta en todas las vistas de la aplicación.
// Se ejecuta antes de las rutas registradas posteriormente en app.js, permitiendo preparar datos que estarán disponibles
// cuando esas rutas rendericen una vista.
// Agrega los datos necesarios a res.locals, que es un objeto que contiene variables locales disponibles para la vista.

const usersModel = require("../model/users.model");

async function showCartAndUser(req, res, next) {
    
    res.locals.currentUser = null;
    res.locals.cartCount = 0;


    try {

        // Si hay un usuario logueado, tomo su id y busco el usuario y su carrito
        if (req.session.userId) {

            const user =
                await usersModel.getById(
                    req.session.userId
                );


            const cart =
                await req.session.cart;

            res.locals.currentUser = user;

            //Si el usuario tiene un carrito, calculo la cantidad de productos y la paso a las vistas
            if (cart) {

                res.locals.cartCount =
                    cart.items.reduce(
                        (total, item) =>
                            total + item.quantity,
                        0
                    );

            }

        }


        //Si no hubiera next, el flujo de la aplicación se detendría aquí y no se ejecutaría el siguiente middleware o ruta.
        next();


    } catch (error) {

        next(error);

    }


}

module.exports = {
    showCartAndUser
};