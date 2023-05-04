// Importación de módulos y archivos necesarios para el servidor
import express from "express";
import routerProducts from "./routes/ProductManager.router.js";
import routerCart from "./routes/CartRouter.js";

// Creación de una instancia de Express
const app = express()

// Middleware para el manejo de solicitudes y respuestas en formato JSON y URL encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware para enrutar todas las solicitudes a la ruta '/products' y '/cart' hacia el routerProducts y routerCart
app.use('/products', routerProducts);
app.use('/cart', routerCart);

// Puerto en el que el servidor estará escuchando
const PORT = 8080;

// Inicio del servidor en el puerto especificado
app.listen(PORT, () => {
console.log(`Servidor en puerto ${PORT}`)
})