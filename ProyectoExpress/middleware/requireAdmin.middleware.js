function requireAdmin(req, res, next) {

    // Verificar que el usuario esté autenticado
    if (!req.user) {

        return res.status(401).json({
            error: "Usuario no autenticado"
        });
    }

    // Verificar que posea permisos administrativos
    if (req.user.role !== "admin") {

        return res.status(403).json({
            error: "Permisos insuficientes"
        });
    }

    // Permitir que continúe la petición
    next();
}

module.exports = {
    requireAdmin
};