


import { firebase } from "@/firebase";
import { defineAction } from "astro:actions";
import { z } from 'astro:schema';
import { signOut } from "firebase/auth";

// siempre exportamos y definimos la accion
export const logout = defineAction({
    accept : 'json',
    // función que maneja la acción. Recibe los datos validados como argumento.
    handler: async () => {
        return await signOut(firebase.auth)
    },
});