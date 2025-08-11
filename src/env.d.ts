
// estamos ampliando el espacio de nombres especial App , dentro de App podemos declarar tipos personalizados 
// un tipo personalizado es Locals , son propiedades que podemos usar dentro de middlewares , endpoints y paginas del servidor

interface User {
    email : string;
    name : string;
    avatar : string;
    emailVerified : boolean;
}



declare namespace App{
    interface Locals {
        isLoggedIn: boolean; // le decimos a TS que todos los middleware y endpoints pueden confiar en que existe y es un booleano 
        user: User | null ; /* user sera de tipo User o sera nulo */
    }
}