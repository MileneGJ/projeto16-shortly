import jwt from 'jsonwebtoken';

const SECRET = process.env.TOKEN_SECRET || 'secret'
const EXPIRE = process.env.TOKEN_EXPIRE_IN || '1y'

export function encode(payload) {
    return jwt.sign(payload,SECRET, {expiresIn: EXPIRE});
}

export function decode(token) {
    return jwt.verify(token, SECRET);
}