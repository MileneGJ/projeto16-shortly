import userRep from '../repositories/userRepository.js' 
import { verifyC } from "../providers/cryptProvider.js";
import { encodeT } from "../providers/tokenProvider.js"

export async function createUser (_,res) {
    const user = res.locals.newUser
    try {
        await userRep.insertUser(user.name,user.email,user.password);
        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
}

export async function loginUser (req,res) {
    try {
        const foundUser = await userRep.getUserByEmail(req.body.email);
        if(foundUser.rows.length===0){
            res.sendStatus(401);
        } else {
            const validationPassword = verifyC(req.body.password,foundUser.rows[0].password)
            if(!validationPassword){
                res.sendStatus(401);
            } else {
                const token = encodeT(req.body);
                res.status(200).send(token);
            }
        }
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

