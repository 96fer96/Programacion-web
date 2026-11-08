const usersService = require("../services/users.service");

function showLogin(req, res) {
    res.render("pages/login",
        //Indico explicitamente que no quiero usar el layout principal para esta vista, sino que quiero renderizarla
        //sin ningún layout.
        {
            layout: false
        }
    );
}

function processLogin(req, res, next) {
    try {
    const {
        username,
        password
    } = req.body;

    const data = {
        username,
        password
    }

    const result = usersService.processLogin(data);

    if (result.success) {
        req.session.userId = result.userId;

        res.redirect("/");
    }

    if (result.error === "USUARIO_INCORRECTO") {
        return res.render("pages/login", {
            error: "Usuario incorrecto",
            layout: false
        });
    }

    if (result.error === "PASSWORD_INCORRECTO") {
        return res.render("pages/login", {
            error: "Contraseña incorrecta",
            layout: false
        });
    }
} catch (error) {
        next(error);
    }
}

module.exports = {
    showLogin,
    processLogin
};