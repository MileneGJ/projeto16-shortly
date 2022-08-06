import connection from '../dbStrategy/database.js'

export async function listUserURLs(_, res) {
    const user = res.locals.authUser;
    try {
        const foundUser = await connection.query(
            'SELECT id,name FROM users WHERE email=$1',
            [user.email]
        );
        if (foundUser.rows.length === 0) {
            return res.sendStatus(404);
        }
        const userUrls = await connection.query(
            'SELECT urls.id,urls."shortUrl",urls.url,urls."visitCount" FROM urls WHERE "userId"=$1',
            [foundUser.rows[0].id]
        );
        const visitSum = await connection.query(
            'SELECT SUM(urls."visitCount") FROM urls WHERE "userId"=$1',
            [foundUser.rows[0].id]
        );
        const resObject = {
            id: foundUser.rows[0].id,
            name: foundUser.rows[0].name,
            visitCount: parseInt(visitSum.rows[0].sum),
            shortenedUrls:userUrls.rows
        }
        return res.status(200).send(resObject);
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
}

export function listUserRanking() {

}