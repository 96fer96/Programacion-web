
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

    const result = processLogin(data);

    if (result.success) {
        req.session.userId = user.id;

        res.redirect("/");
    }

    if (result.error === "USUARIO_O_PASSWORD_INCORRECTOS") {
        return res.render("pages/login", {
            error: "Usuario o contraseña incorrectos"
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