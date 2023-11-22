import  Jwt  from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

export const protectAdmin = async (req, res, next) => {
    const authorizations = req.headers.authorization.split(" ");
    const token = authorizations[1];

    const decryptToken = Jwt.decode(token, process.env.JWT_SECRET);
    if(!decryptToken){
        return res.status(400).send('TOKEN INVALIDE');
    } 
    if(decryptToken.type !== 'ADMIN') return res.status(401).send('NON AUTHORISER')

    next()
};