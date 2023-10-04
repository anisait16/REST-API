import express from "express";

import { deleteUserById, getUserById } from "../db/actions";

const deleteUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        if (!id) return res.sendStatus(400);

        const user = await getUserById(id);
        if (!user) return res.sendStatus(400);

        await deleteUserById(id);

        return res.status(200).json(user).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export default deleteUser;