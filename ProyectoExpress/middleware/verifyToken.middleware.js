const jwt =
    require(
        "jsonwebtoken"
    );


// ======================================================
// VERIFICAR JWT
// ======================================================

function verifyToken(
    req,
    res,
    next
) {

    const authHeader =
        req.headers.authorization;

    // ------------------------------------------
    // Verificar existencia de Authorization
    // ------------------------------------------

    if (!authHeader) {

        return res
            .status(401)
            .json({
                error:
                    "Token requerido"
            });
    }

    // ------------------------------------------
    // Verificar formato Bearer <token>
    // ------------------------------------------

    const parts =
        authHeader.split(" ");

    if (
        parts.length !== 2 ||
        parts[0] !== "Bearer"
    ) {

        return res
            .status(401)
            .json({
                error:
                    "Formato de token inválido"
            });
    }


    const token =
        parts[1];


    // ------------------------------------------
    // Verificar autenticidad del JWT
    // ------------------------------------------

    try {

        const decoded =
            jwt.verify(
                token,
                process.env.JWT_SECRET
            );


        // Guardar payload en request
        req.user =
            decoded;


        next();


    } catch (error) {

        if (
            error.name ===
            "TokenExpiredError"
        ) {

            return res
                .status(401)
                .json({
                    error:
                        "Token expirado"
                });
        }


        return res
            .status(401)
            .json({
                error:
                    "Token inválido"
            });
    }
}


module.exports = {
    verifyToken
};