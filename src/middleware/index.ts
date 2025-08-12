import { firebase } from "@/firebase";
import type { MiddlewareNext } from "astro";
import { defineMiddleware } from "astro:middleware";

const privateRoutes = ['/protected']; // definimos las rutas que seran protegidas
const notAuthenticatedRoutes = ['/login' , '/register']; // rutas que no puedes entrar si ya estas autenticado

// desestructuramos del context el url , la request y locals

// <-- locals es un objeto que vive 
// durante todo el ciclo de una única petición y que sirve para compartir datos entre el middleware, 
// endpoints (API routes) y páginas de servidor.

// si después de este middleware llegás a un endpoint o página
// con rendering en el servidor, podés leer locals.isLoggedIn

// > Características importantes
// Solo dura una request
//.   No es almacenamiento persistente. En cada nueva petición, locals se reinicia.
// Útil para datos de autenticación
//.   Podés guardar:
//      El usuario autenticado
//      Roles o permisos
//      Flags como isLoggedIn



export const onRequest = defineMiddleware(({url , request , locals , redirect} , next)=>{

    // <-- por aca pasan todas las peticiones  --> 

    const isLoggedIn = !!firebase.auth.currentUser; // doble negacion convierte el valor en booleano
    const user = firebase.auth.currentUser;
    locals.isLoggedIn = isLoggedIn; // aca decimos que el isLoggedIn de locals es igual al isLoggedIn de aca

    /* si existe el usuario , cargaremos en user de locals los datos para tenerlos a mano */
    if(user){
        locals.user = {
            avatar : user.photoURL ?? '', /* si no existe la photoURL sera una string vacia */
            email :  user.email! , /* siempre tendremos un email */
            name : user.displayName! , /* siempre tendremos un displayName */
            emailVerified : user.emailVerified, /* es un booleano */
        }
    }


    /* Si el usuario no esta logueado y quiere ingresar a una ruta privada  */
    if(!isLoggedIn && privateRoutes.includes(url.pathname)){
        return redirect('/'); /* vamos al root */
    }

    /* Si estas logueado y queres ingresar a las rutas que deberias entrar si no tenes un usuario */
    if(isLoggedIn && notAuthenticatedRoutes.includes(url.pathname)){
        return redirect('/'); /* vamos al root */
    }
    
    return next()
})


