// #
// #
// ES UNA DEMOSTRACION DE LOS FUNDAMENTOS DE AUTENTICACION NO UTILIZAR



import type { MiddlewareNext } from "astro";
import { defineMiddleware } from "astro:middleware";

const privateRoutes = ['/protected']; // definimos las rutas que seran protegidas


// desestructuramos del context el url y la request
export const onRequest = defineMiddleware(({url , request} , next)=>{
    
    const authHeaders = request.headers.get('Authorization') ?? ''
    console.log('El middlware es solamente ejecutado del lado del servidor')
    
    // si la ruta esta protegida
    if(privateRoutes.includes(url.pathname)){
        // chequeamos las autorizaciones
        return checkLocalAuth(authHeaders , next);
    }

    return next()
})


const checkLocalAuth = (authHeaders : string , next : MiddlewareNext) => {
    // si envian los authHeaders
    if(authHeaders){
        // en los headers lo que ingresamos como usuario / password
        // seria asi Basic 9ikjf9wi904j3o

        const authValue = authHeaders.split(' ').at(-1) ?? 'user:pass'
        // aca decodificamos y dividimos el usuario:contraseña
        const decodedValue = atob(authValue).split(':') 
        // aca desestructuramos
        const [user, password] = decodedValue; 

        if(user === 'admin' && password === 'admin2'){
            return next()
        }

    }

    // si no nos envian los headers mostramos esto
    return new Response('Autenticacion necesaria',{
        status : 401,
        headers : {
            'WWW-Authenticate' : 'Basic real="Secure Area"'
        }
    });
    
}