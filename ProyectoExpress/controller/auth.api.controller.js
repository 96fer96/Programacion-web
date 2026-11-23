const authService =
    require(
        "../services/auth.service.js"
    );


function login(
    req,
    res
) {

    const result =
        authService.login(
            req.body
        );

    if (!result.success) {

        return res
            .status(401)
            .json({
                error:
                    result.error
            });
    }

    return res
        .status(200)
        .json({
            token:
                result.token
        });
}


module.exports = {
    login
};