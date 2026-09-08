const fs = require("fs").promises;
const path = require("path");

const usersPath = path.join(
    __dirname,
    "data",
    "users.json"
);


async function getAll() {

    const data = await fs.readFile(
        usersPath,
        "utf-8"
    );

    return JSON.parse(data);
}


async function findByUsername(username) {

    const users = await getAll();

    return users.find(
        user => user.username === username
    );
}


async function create(user) {

    const users = await getAll();

    users.push(user);

    await fs.writeFile(
        usersPath,
        JSON.stringify(users, null, 4)
    );

    return user;
}

async function getById(id) {

    const users = await getAll();

    return users.find(
        user => user.id === id
    );
}




module.exports = {
    getAll,
    findByUsername,
    getById,

    create
};