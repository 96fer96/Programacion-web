const bcrypt =
    require(
        "bcrypt"
    );

const jwt =
    require(
        "jsonwebtoken"
    );

const usersModel =
    require(
        "../model/users.model.js"
    );

function login(
    credentials
) {

    const user =
        usersModel.findByEmail(
            credentials.email
        );

    if (!user) {

        return {
            success: false,
            error:
                "CREDENCIALES_INVALIDAS"
        };
    }


    const validPassword =
        bcrypt.compareSync(
            credentials.password,
            user.password
        );


    if (!validPassword) {

        return {
            success: false,
            error:
                "CREDENCIALES_INVALIDAS"
        };
    }


    const token =
        jwt.sign(
            {
                sub:
                    user.id,

                role:
                    user.role
            },

            process.env.JWT_SECRET,

            {
                expiresIn:
                    "15m"
            }
        );


    return {
        success: true,
        token:
            token
    };
}

module.exports = {
    login
};