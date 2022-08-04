import { nanoid } from 'nanoid'
import connection from '../dbStrategy/database.js'

export async function createShortURL (_,res) {
    const id = nanoid();
    try {
        const userId = await connection.query(
            'SELECT id FROM users WHERE email=$1',
            [res.locals.authUser.email]);

        await connection.query(
            'INSERT INTO urls (url,"shortUrl","visitCount","userId") VALUES ($1,$2,$3,$4)',
            [res.locals.newUrl,id,0,userId.rows[0].id]);

        res.status(201).send(id);
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
}

export async function getOneURL (req,res) {
    const urlId = req.params.id;
    try {
        const foundUrl = await connection.query(
            'SELECT id,"shortUrl",url FROM urls WHERE id=$1',
            [urlId]
            );
        if(foundUrl) {
            res.status(200).send(foundUrl);
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export function openShortURL () {

}

export function deleteURL () {
    
}