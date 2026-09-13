// ======================================================
// CERRAR SESIÓN
// ======================================================

function logout(req, res, next) {

    req.session.destroy(error => {

        if (error) {

            return next(error);

        }


        // Eliminamos también la cookie que identifica
        // la sesión en el navegador.
        res.clearCookie("connect.sid");


        // Una vez cerrada la sesión,
        // volvemos a la página principal.
        res.redirect("/");

    });

}


module.exports = {
    logout
};