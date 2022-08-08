import { nanoid } from 'nanoid'
import userRep from '../repositories/userRepository.js'
import urlRep from '../repositories/urlRepository.js'

export async function createShortURL(_, res) {
    const id = nanoid();
    try {
        const userId = await userRep.getUserByEmail(res.locals.authUser.email);
        await urlRep.insertUrl(res.locals.newUrl, id, 0, userId.rows[0].id);
        return res.status(201).send(id);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500)
    }
}

export async function getOneURL(req, res) {
    const urlId = req.params.id;
    try {
        const foundUrl = await urlRep.getUrlBy(urlId,'idFormatted');
        if (foundUrl.rows.length > 0) {
            return res.status(200).send(foundUrl.rows[0]);
        } else {
            return res.sendStatus(404);
        }
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

export async function openShortURL(req, res) {
    const shortUrl = req.params.shortUrl
    try {
        const foundUrl = await urlRep.getUrlBy(shortUrl,'shortUrl');
        if (foundUrl.rows.length > 0) {
            await urlRep.increaseVisitCount(
                foundUrl.rows[0].visitCount, foundUrl.rows[0].id);
            return res.redirect(foundUrl.rows[0].url)
        } else {
            return res.sendStatus(404);
        }
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

export async function deleteURL(req, res) {
    const user = res.locals.authUser;
    const urlId = req.params.id;
    try {
        const foundUrl = await urlRep.getUrlBy(urlId,'id');
        if (foundUrl.rows.length > 0) {
            if (user.id === foundUrl.rows[0].userId) {
                await urlRep.deleteUrl(urlId)
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