import express from "express";

import { getUserBySessionToken } from "../db/actions";
import { get } from "lodash";

const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { id } = req.params;
    if (!id) return res.sendStatus(400);

    const sessionToken = req.cookies["AUTH_COOKIE"];
    const user = await getUserBySessionToken(sessionToken);

    if (!sessionToken || !user) return res.sendStatus(400);

    const currentUserID = user._id;

    if (currentUserID.toString() !== id) return res.sendStatus(403);

    get(req, "identity: user._id");

    return next();
};

export default isOwner;