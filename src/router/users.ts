import express from "express";

import getAllUsers from "../controllers/getAllUsers";
import deleteUser from "../controllers/deleteUser";
import updateUser from "../controllers/updateUser";
import isAuthenticated from "../middlewares/isAuthenticated";
import isOwner from "../middlewares/isOwner";

export default (router: express.Router) => {
    router.get("/users", isAuthenticated, getAllUsers);
    router.delete("/users/:id", isAuthenticated, isOwner, deleteUser);
    router.patch("/users/:id", isAuthenticated, isOwner, updateUser);
};