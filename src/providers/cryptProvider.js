import bcrypt from 'bcrypt';

const CRYPT_SALT = +process.env.CRYPT_SALT || 10

export function encodeC (password) {
    return bcrypt.hashSync(password,CRYPT_SALT);
}

export function verifyC (password,hash) {
    return bcrypt.compareSync(password,hash);
}