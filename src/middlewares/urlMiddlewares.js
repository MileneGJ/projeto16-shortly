import urlSchema from '../schemas/urlSchema.js'

export function validateURL (req,res,next) {
    const validation = urlSchema.validate(req.body);
    if(validation.error) {
        res.status(422).send(validation.error.details[0].message);
    } else {
        res.locals.newUrl = req.body.url;
        next();
    }
}