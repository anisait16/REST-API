import mongoose from "mongoose";

import {
    usernameMinLengthChecker,
    usernameConstraint,
    emailConstraint
}
    from "./userSchemaConstraints";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        validate: [
            {
                validator: usernameMinLengthChecker,
                message: "Username must at least have 4 characters",
            },
            {
                validator: usernameConstraint,
                message: "Username must start with a letter",
            }
        ]
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: emailConstraint,
            message: "Invalid Email",
        }
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    authentication: {
        password: {
            type: String,
            required: true,
            select: false,
        },
        salt: {
            type: String,
            select: false,
        },
        sessionToken: {
            type: String,
            select: false,
        }
    }
});

export default UserSchema;