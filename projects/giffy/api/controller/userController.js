import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../secret-key.js";

import usersBD from "../model/userModel.js";
import favsBD from "../model/favsModel.js";


export const getFavs = (req, res) => {
    const { userName } = req.body?.user;

    res.json({ favs: favsBD[userName] });
    // res.status(200).send(userName);
};


export const postFav = (req, res) => {
    const id = req.params.id;
    const { userName } = req.body.user;

    const alreadyExist = favsBD[userName].some(favId => favId === id);

    if (!alreadyExist) {
        favsBD[userName].push(id);
    }

    console.log({
        alreadyExist,
        userName,
    });

    res.status(201).json({ favs: favsBD[userName] });
};


export const deleteFav = (req, res) => {
    const id = req.params.id;
    const { userName } = req.body.user;

    favsBD[userName] = favsBD[userName].filter(favId => favId !== id);

    res.json({ favs: favsBD[userName] });
};


export const login = (req, res) => {
    const { userName, password } = req.body;

    if (!userName || !password) return res.sendStatus(400);

    const user = usersBD.find(user => user.userName === userName);

    try {
        if (!user) throw new Error("User notfound");
        if (user.password !== password) throw new Error("User notfound");

        const payload = {
            // exp: 60,
            data: user.userName
        };

        const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: "1h", algorithm: 'HS256' });

        res.json({ jwt: token })
        
    } catch (error) {
        console.log(error);
        res.send(error);
    }
};

export const register = (req, res) => {
    const { userName, password } = req.body;
    console.log({ userName, password });
    if (!userName || !password) return res.sendStatus(400);

    const user = {
        userName,
        password
    }

    const alreadyExist = usersBD.find(user => user.userName === userName);

    if (alreadyExist) return res.sendStatus(409);

    usersBD.push(user);
    // initialize the user favs
    favsBD[userName] = [];

    res.sendStatus(201);
}