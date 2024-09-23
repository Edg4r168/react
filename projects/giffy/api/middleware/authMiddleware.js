import Jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../secret-key.js";

export const authenticate = (req, res, next) => {
    let jwt = req.headers?.authorization;
    
    if (!jwt) jwt = req.body?.jwt;
    if (!jwt) return res.status(401).json({ error: 'Unauthorized' });

    try {
        const decodedToken = Jwt.verify(jwt, JWT_SECRET_KEY);
        const { data: userName } = decodedToken;

        req.body.user = { userName };
        next();

    } catch (err) {
        console.log(err);
        return res.status(401).json({ error: 'Unauthorized' });
    }
}