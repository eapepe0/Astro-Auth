


import { firebase } from "@/firebase";
import { defineAction } from "astro:actions";
import { z } from 'astro:schema';
import { createUserWithEmailAndPassword, type AuthError } from "firebase/auth";
import { updateProfile , sendEmailVerification  } from "firebase/auth";


// siempre exportamos y definimos la accion
export const registerUser = defineAction({
    accept : 'form', // vamos a recibir un form
    // el esquema de datos que vamos a recibir
    input : z.object({
        name : z.string().min(2), // un string minimo 2 caracteres
        email : z.string().email(), // string email
        password : z.string().min(6),  // password minimo 6
        remember_me : z.boolean().optional(), // booleano opcional
    }),// si no se cumple este esquema lanzara un error
    // función que maneja la acción. Recibe los datos validados como argumento.
    handler: async ({name , email , password , remember_me} , {cookies}) => {
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
        // Creacion de usuario
        try {
            const user = await createUserWithEmailAndPassword(firebase.auth, email , password)

            // Actualizar el nombre (displayName)
            updateProfile(firebase.auth.currentUser! , {
                displayName : name
            })
            // Verificar el correo electronico
            await sendEmailVerification(firebase.auth.currentUser! , {
                /* url: 'http://localhost:4321/protected?emailVerified=true', */
                url: `${import.meta.env.WEBSITE_URL}/protected?emailVerified=true`,
            })
            return user;

        } catch (error) {

            const firebaseError = error as AuthError;

            if(firebaseError.code ==='auth/email-already-in-use'){
                throw new Error('El correo ya esta en uso');
            } 
            
            throw new Error('Auxilio algo salio mal')
        }


    },
});