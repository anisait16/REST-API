import express from "express";

import { getUserByEmail } from "../db/actions";
import blend from "../helpers/blend";
import random from "../helpers/random";

const login = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.sendStatus(400);

        const user = await getUserByEmail(email).select("+authentication.salt +authentication.password");
        if (!user) return res.sendStatus(400);

        const userSalt = (user.authentication?.salt) as string;
        const expectedHash = blend(userSalt, password);

        if (expectedHash !== user.authentication?.password) return res.sendStatus(400);

        const salt = random();
        user.authentication.sessionToken = blend(salt, user._id.toString());

        await user.save();

        res.cookie("AUTH_COOKIE", user.authentication.sessionToken, { domain: "localhost", path: "/" });
        return res.status(200).json(user).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export default login;