


import { firebase } from "@/firebase";
import { defineAction } from "astro:actions";
import { z } from 'astro:schema';
import { GoogleAuthProvider ,signInWithCredential } from "firebase/auth";


// siempre exportamos y definimos la accion
export const loginWithGoogle = defineAction({
    accept : 'json',
    // el esquema de datos que vamos a recibir
    input : z.any(),// si no se cumple este esquema lanzara un error
    // función que maneja la acción. Recibe los datos validados como argumento.
    handler: async (credentials) => {
        // pedimos las credenciales logueandonos con las credenciales que nos da el popup
        const credential = GoogleAuthProvider.credentialFromResult(credentials)

        // si no existe la credencial , ya sea por que se cerro el popup
        if(!credential){
            throw new Error('Google SignIn fallo!');
        }

        // nos logueamos con las credenciales 
        await signInWithCredential(firebase.auth , credential);
        return {
            ok : true
        };// retorna esto
    },
});

