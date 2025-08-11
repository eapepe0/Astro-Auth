import { loginUser } from "./auth/login.action";
import { logout } from "./auth/logout.action";
import { registerUser } from "./auth/register.action";
import { loginWithGoogle } from "./auth/login-google.action";

export const server = {

    // acciones

    // Auth
    registerUser,
    logout,
    loginUser,
    loginWithGoogle
}