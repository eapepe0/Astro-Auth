


import { firebase } from "@/firebase";
import { defineAction } from "astro:actions";
import { z } from 'astro:schema';
import { signInWithEmailAndPassword, type AuthError } from "firebase/auth";

// siempre exportamos y definimos la accion
export const loginUser = defineAction({
    accept : 'form', // vamos a recibir un form
    // el esquema de datos que vamos a recibir
    input : z.object({
        email : z.string().email(), // string email
        password : z.string().min(6),  // password minimo 6
        remember_me : z.boolean().optional(), // booleano opcional
    }),// si no se cumple este esquema lanzara un error
    // función que maneja la acción. Recibe los datos validados como argumento.
    handler: async ({ email , password , remember_me} , {cookies}) => {
        // si apretamos "Recuerdame"
        if(remember_me){
            cookies.set('email', email ,{
                expires : new Date(Date.now() + 1000 * 60 * 60 * 24 * 365 ), // 1 año
                path : '/', // esta cookie abarca toda la app
            })
        } else{
            cookies.delete('email',{
                path: '/' // especificamos la cookie con el path
            })
        }
        // Loagueamos el usuario
        try {
            const user = await signInWithEmailAndPassword(firebase.auth, email , password)
            return JSON.stringify(user);

        } catch (error) {
            const firebaseError = error as AuthError;
            if(firebaseError.code === 'auth/invalid-credential'){
                throw new Error('Hay un error en el usuario/contraseña');
            } 
            
            throw new Error('Auxilio algo salio mal')
        }
    },
});