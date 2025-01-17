import { defineMiddleware } from "astro:middleware";

const privateRoutes = ['/protected']; // definimos las rutas que seran protegidas


// desestructuramos del context el url y la request
export const onRequest = defineMiddleware(({url , request} , next)=>{
    
    const authHeaders = request.headers.get('Authorization')
    console.log('El middlware es solamente ejecutado del lado del servidor')
    
    // si la ruta esta protegida
    if(privateRoutes.includes(url.pathname)){
        // si nos envian en los headers 'Authorization' pasamos
        if(authHeaders){
            return next()
        }
    // si no nos envian en los headers enviamos error
    return new Response('Autenticacion necesaria',{
        status : 401,
        headers : {
            'WWW-Authenticate' : 'Basic real="Secure Area"'
        }
    });
    }

    return next()
})