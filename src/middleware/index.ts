import type { MiddlewareNext } from "astro";
import { defineMiddleware } from "astro:middleware";

const privateRoutes = ['/protected']; // definimos las rutas que seran protegidas


// desestructuramos del context el url y la request
export const onRequest = defineMiddleware(({url , request} , next)=>{
  
    return next()
})


