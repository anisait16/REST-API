import UserSchema from "./userSchema";

export const usernameMinLengthChecker = (username: string): boolean => username.length >= 4;

export const usernameConstraint = (username: string): boolean => {
    const regex = /^[A-Za-z]/;
    return regex.test(username);
};

export const emailConstraint = (email: string): boolean => {
    const regex = /@gmail\.com$/;
    return regex.test(email);
};