import signUpSchema from "../schemas/signUpSchema.js";
import signInSchema from "../schemas/signInSchema.js";
import { encodeC } from "../providers/cryptProvider.js";
import userRep from '../repositories/userRepository.js'

export async function validateSignUp(req, res, next) {
    const validation = signUpSchema.validate(req.body);
    if (validation.error) {
        return res.status(422).send(validation.error.details[0].message)
    }
    try {
        const foundUser = await userRep.getUserByEmail(req.body.email)
        if(foundUser.rows.length>0){
            return res.sendStatus(409);
        } else {
            const cryptPassword = encodeC(req.body.password)
            res.locals.newUser = {
                name:req.body.name,
                email:req.body.email,
                password:cryptPassword
            }
            next()
        }
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

export function validateSignIn(req,res,next) {
    const validation = signInSchema.validate(req.body);
    if (validation.error) {
        return res.status(422).send(validation.error.details[0].message)
    } else {
        next()
    }
}