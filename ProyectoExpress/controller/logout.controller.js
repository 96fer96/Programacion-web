const websocketService =
    require("../services/websocket.service.js");


// ======================================================
// CERRAR SESIÓN
// ======================================================

function logout(req, res, next) {

    const sessionId =
        req.sessionID;


    req.session.destroy(error => {

        if (error) {

            return next(error);

        }


        // Cerrar los WebSockets asociados
        // a la sesión destruida.

        websocketService.closeSessionConnections(
            sessionId
        );


        // Eliminamos la cookie que identifica
        // la sesión en el navegador.

        res.clearCookie("connect.sid");


        // Volvemos a la página principal.

        res.redirect("/");

    });

}


module.exports = {
    logout
};