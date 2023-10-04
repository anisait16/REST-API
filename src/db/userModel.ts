import mongoose from "mongoose";

import UserSchema from "./userSchema";

const UserModel = mongoose.model("users", UserSchema);

export default UserModel;