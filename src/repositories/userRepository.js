import connection from "../dbStrategy/database.js";

async function getUserByEmail(email) {
    return await connection.query(
        'SELECT * FROM users WHERE email=$1',
        [email]
    );
}

async function insertUser(name, email, password) {
    return await connection.query(
        'INSERT INTO users (name, email, password) VALUES ($1,$2,$3)',
        [name, email, password]
    );
}


export default {
    getUserByEmail,
    insertUser
}