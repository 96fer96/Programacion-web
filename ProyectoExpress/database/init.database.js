const {
    db
} = require("./database");


// ======================================================
// INICIALIZAR BASE DE DATOS
// ======================================================

function initDatabase() {

    /*
    db.exec()
        → ejecuta directamente SQL
        → puede contener varias sentencias
        → no genera un Statement para usar con .run()/.get()/.all()
    */
    return db.exec(`

        CREATE TABLE IF NOT EXISTS products (

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            name TEXT NOT NULL,

            price REAL NOT NULL,

            stock INTEGER NOT NULL,

            category TEXT NOT NULL,

            description TEXT,

            image TEXT,

            pedidos INTEGER DEFAULT 0

        );


        CREATE TABLE IF NOT EXISTS users (

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            username TEXT NOT NULL UNIQUE,

            name TEXT NOT NULL,

            email TEXT NOT NULL UNIQUE,

            password TEXT NOT NULL

        );

    `);

}


module.exports = {
    initDatabase
};