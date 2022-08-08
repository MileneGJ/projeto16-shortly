import userRep from '../repositories/userRepository.js'
import urlRep from '../repositories/urlRepository.js'

export async function listUserURLs(_, res) {
    const user = res.locals.authUser;
    try {
        const foundUser = await userRep.getUserByEmail(user.email);
        if (foundUser.rows.length > 0) {
            const userUrls = await urlRep.getUrlBy(foundUser.rows[0].id, 'userIdFormatted');
            const visitSum = await urlRep.sumVisitsByUser(foundUser.rows[0].id);
            const resObject = {
                id: foundUser.rows[0].id,
                name: foundUser.rows[0].name,
                visitCount: parseInt(visitSum.rows[0].coalesce),
                shortenedUrls: userUrls.rows
            }
            return res.status(200).send(resObject);
        } else {
            return res.sendStatus(404);
        }
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

export async function listUserRanking(_, res) {
    try {
        const ranking = await urlRep.getRanking();
        res.status(200).send(ranking.rows);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}