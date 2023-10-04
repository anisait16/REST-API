import express from "express";

import { getUsers } from "../db/actions";

const getAllUsers = async (req: express.Request, res: express.Response) => {
    try {
        const users = await getUsers();
        if (!users) return res.sendStatus(400);

        return res.status(200).json(users).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export default getAllUsers;