import express from "express";

import { createUser, getUserByEmail } from "../db/actions";
import blend from "../helpers/blend";
import random from "../helpers/random";

const register = async (req: express.Request, res: express.Response) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) return res.sendStatus(400);

        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).+/;
        const isValidPassword = passwordRegex.test(password);
        if (password.length < 8 || !isValidPassword) return res.sendStatus(400);

        const existingUser = await getUserByEmail(email);
        if (existingUser) return res.sendStatus(400);


        const salt = random();
        const user = await createUser({
            username,
            email,
            authentication: {
                password: blend(salt, password),
                salt: salt,
            }
        });

        return res.status(200).json(user).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export default register;