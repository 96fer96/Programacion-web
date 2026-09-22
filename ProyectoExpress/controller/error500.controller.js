/*
Este middleware se encarga de manejar los errores internos del servidor. Cuando una ruta, Controller o middleware
ejecuta next(error), Express omite el flujo normal y busca un middleware de manejo de errores.
Express reconoce este tipo de middleware porque recibe cuatro parámetros: err, req, res y next.
*/
function showError500(err, req, res, next) {
    console.error(err.stack);
    res.status(500).render("pages/error500");
}

module.exports = {
    showError500
};