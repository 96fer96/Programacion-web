const usersModel = require("../model/users.model");
const bcrypt = require("bcryptjs");

function showLogin(req, res) {
    res.render("pages/login",
        //Indico explicitamente que no quiero usar el layout principal para esta vista, sino que quiero renderizarla 
        //sin ningún layout.
        {
            layout: false
        }
    );
}

async function processLogin(req, res, next) {
    try {
    const {
        username,
        password
    } = req.body;

    const user =
        await usersModel.findByUsername(username);

    if (!user) {
        return res.render("pages/login", {
            error: "Usuario o contraseña incorrectos"
        });
    }

    const passwordIsValid =
        await bcrypt.compare(
            password,
            user.password
        );

    if (!passwordIsValid) {
        return res.render("pages/login", {
            error: "Usuario o contraseña incorrectos"
        });
    }

    // Login correcto
    //En la sesión actual, guardá qué usuario inició sesión.
    req.session.userId = user.id;

    res.redirect("/");
    } catch (error) {
        next(error);
    }
}

module.exports = {
    showLogin,
    processLogin
};