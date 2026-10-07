const {db} = require("./database.js")

function addColumnsToUsers() {
    db.exec(`
        ALTER TABLE users
        ADD COLUMN created_at DATETIME
    `);


    db.exec(`
        UPDATE users
        SET created_at = CURRENT_TIMESTAMP
        WHERE created_at IS NULL
    `);
}

addColumnsToUsers();