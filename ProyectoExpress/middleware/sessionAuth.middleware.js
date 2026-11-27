// ======================================================
// REQUERIR USUARIO AUTENTICADO
// ======================================================

function requireLogin(req, res, next) {

    if (!req.session?.userId) {

        return res.redirect("/login");
    }

    next();
}


// ======================================================
// REQUERIR USUARIO ANÓNIMO
// ======================================================

function requireGuest(req, res, next) {

    if (req.session?.userId) {

        return res.redirect("/");
    }

    next();
}


// ======================================================
// REQUERIR ADMINISTRADOR
// ======================================================

function requireAdminSession(req, res, next) {

    if (!req.session?.userId) {

        return res.redirect("/login");
    }

    if (req.session.role !== "admin") {

        return res
            .status(403)
            .send("Permisos insuficientes");
    }

    next();
}


module.exports = {
    requireLogin,
    requireGuest,
    requireAdminSession
};