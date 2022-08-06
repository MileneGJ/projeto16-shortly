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

        return res.status(201).send(id);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500)
    }
}

export async function getOneURL (req,res) {
    const urlId = req.params.id;
    try {
        const foundUrl = await connection.query(
            'SELECT id,"shortUrl",url FROM urls WHERE id=$1',
            [urlId]
            );
        if(foundUrl.rows.length>0) {
            return res.status(200).send(foundUrl.rows[0]);
        } else {
            return res.sendStatus(404);
        }
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

export async function openShortURL (req,res) {
    const shortUrl = req.params.shortUrl
    try {
        const foundUrl = await connection.query(
            'SELECT id,url,"visitCount" FROM urls WHERE "shortUrl"=$1',
            [shortUrl]
            );
        if(foundUrl.rows.length>0) {
            await connection.query(
                'UPDATE urls SET "visitCount"=$1 WHERE id=$2',
                [(foundUrl.rows[0].visitCount+1),foundUrl.rows[0].id]
            );
            return res.redirect(foundUrl.rows[0].url)
        } else {
            return res.sendStatus(404);
        }
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

export async function deleteURL (req,res) {
    const user = res.locals.authUser;
    const urlId = req.params.id;
    try {
        const foundUrl = await connection.query(
            'SELECT userId FROM urls WHERE id=$1',
            [urlId]
            );
        if(foundUrl.rows.length>0){
            if(user.id===foundUrl.rows[0].userId){
                await connection.query(
                    'DELETE FROM urls WHERE id=$1',
                    [urlId]
                    )
                return res.sendStatus(204);
            } else {
                return res.sendStatus(401);
            }
        } else {
            return res.sendStatus(404);
        }
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}