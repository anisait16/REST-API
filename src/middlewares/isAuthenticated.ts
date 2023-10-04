import express from "express";
import { merge } from "lodash";

import { getUserBySessionToken } from "../db/actions";
import random from "../helpers/random";
import blend from "../helpers/blend";

const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const sessionToken = req.cookies["AUTH_COOKIE"];
        if (!sessionToken) return res.sendStatus(403);

        const user = await getUserBySessionToken(sessionToken).select("+authentication.sessionToken +authentication.salt +authentication.passwor");
        if (!user) return res.sendStatus(404);

        merge(req, { identity: user });

        return next();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export default isAuthenticated;