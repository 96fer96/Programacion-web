const database =
    require("better-sqlite3");

const path =
    require("path");

const db =
    new database(
        path.join(
            __dirname,
            "ecommerce.db"
        )
    );

module.exports = {
    db
};