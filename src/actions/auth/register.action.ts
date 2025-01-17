


import { defineAction } from "astro:actions";
import { z } from 'astro:schema';

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
    handler: async ({name , email , password , remember_me}) => {
        console.log({name , email , password , remember_me})
        return true;// retorna esto
    },
});