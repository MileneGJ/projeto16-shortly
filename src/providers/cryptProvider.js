import bcrypt from 'bcrypt';

const CRYPT_SALT = +process.env.CRYPT_SALT || 10

export function encode (password) {
    return bcrypt.hashSync(password,CRYPT_SALT);
}

export function verify (password,hash) {
    return bcrypt.compareSync(password,hash);
}