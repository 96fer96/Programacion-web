const usersModel =
    require("../model/users.model.js");

const cartsService =
    require("../services/carts.service.js");


function viewLocals(req, res, next) {

    // Valores por defecto para usuarios anónimos
    res.locals.isAuthenticated = false;
    res.locals.isAdmin = false;
    res.locals.currentUser = null;
    res.locals.cartCount = 0;


    // Verificar si existe una sesión autenticada
    if (req.session?.userId) {

        const user =
            usersModel.getById(
                req.session.userId
            );

        if (user) {

            res.locals.isAuthenticated = true;

            res.locals.currentUser = {
                id: user.id,
                name: user.name,
                username: user.username,
                role: user.role
            };

            res.locals.isAdmin =
                user.role === "admin";

            if (req.session.cart) {

                res.locals.cartCount =
                    cartsService.getCartCount(
                        req.session.cart
                    );
            }
        }
    }

    next();
}


module.exports = {
    viewLocals
};