import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

const SECRET = (process.env.SECRET) as string;

const blend = (salt: string, password: string) => {
    return crypto.createHmac("sha-256", [salt, password].join("/")).update(SECRET).digest("hex");
};

export default blend;