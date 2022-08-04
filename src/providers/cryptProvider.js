import bcrypt from 'bcrypt';

const CRYPT_SALT = process.env.CRYPT_SALT || 10

export async function encode (password) {
    return await bcrypt.hash(password,CRYPT_SALT);
}

export async function verify (password,hash) {
    return await bcrypt.compare(password,hash);
}