import connection from "../dbStrategy/database.js";

async function insertUrl(url, shortUrl, visitCount, userId) {
    return await connection.query(
        'INSERT INTO urls (url,"shortUrl","visitCount","userId") VALUES ($1,$2,$3,$4)',
        [url, shortUrl, visitCount, userId]
    );
}

async function getUrlBy(id, column) {
    switch (column) {
        case 'id':
            return await connection.query(
                'SELECT * FROM urls WHERE id=$1',
                [id]
            );
        case 'idFormatted':
            return await connection.query(
                'SELECT urls.id,urls."shortUrl",urls.url FROM urls WHERE id=$1',
                [id]
            );
        case 'shortUrl':
            return await connection.query(
                'SELECT * FROM urls WHERE "shortUrl"=$1',
                [id]
            );
        case 'userId':
            return await connection.query(
                'SELECT * FROM urls WHERE "userId"=$1',
                [id]
            );
        case 'userIdFormatted':
            return await connection.query(
                'SELECT urls.id,urls."shortUrl",urls.url,urls."visitCount" FROM urls WHERE "userId"=$1',
                [id]
            );

    }

}

async function increaseVisitCount(visitCount, urlId) {
    return await connection.query(
        'UPDATE urls SET "visitCount"=$1 WHERE id=$2',
        [(visitCount + 1), urlId]
    );
}

async function sumVisitsByUser(userId) {
    return await connection.query(
        'SELECT SUM(urls."visitCount") FROM urls WHERE "userId"=$1',
        [userId]
    );
}

async function deleteUrl(id) {
    return await connection.query(
        'DELETE FROM urls WHERE id=$1',
        [id]
    );
}

async function getRanking() {
    return await connection.query(
        `SELECT 
        users.id,
        users.name,
        COUNT(urls.id)::INTEGER as "linksCount",
        COALESCE(SUM(urls."visitCount"),0)::INTEGER as "visitCount"
        FROM users LEFT JOIN urls ON users.id=urls."userId" 
        GROUP BY users.id
        ORDER BY "visitCount" DESC
        LIMIT 10`
    );
}

export default {
    insertUrl,
    getUrlBy,
    sumVisitsByUser,
    increaseVisitCount,
    deleteUrl,
    getRanking
}