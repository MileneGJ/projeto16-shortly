import connection from "../dbStrategy/database.js"

export async function createUser (_,res) {
    const user = res.locals.newUser
    try {
        await connection.query('INSERT INTO users (name, email, password) VALUES ($1,$2,$3)',
        [user.name,user.email,user.password]);
        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
}

export function loginUser () {

}

