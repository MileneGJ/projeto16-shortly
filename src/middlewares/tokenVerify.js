import { decodeT } from "../providers/tokenProvider.js";

export default function tokenVerify(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        res.sendStatus(401);
    }
    const user = decodeT(token.replace("Bearer ", ""));
    if (!user) {
        res.sendStatus(401);
    } else {
        res.locals.authUser = user;
        next();
    }
}