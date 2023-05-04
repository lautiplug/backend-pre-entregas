import { Router } from "express";
import Cart from '../cart/Cart.js'
import ProductManager from "../Manager/ProductManager.js";

const router = Router()

const cart = new Cart()

const productManager = new ProductManager()

// Obtener todos los carritos
router.get('/', async (req, res) => { 
    try {
        const allCarts = await cart.getCarts()
        res.status(200).json(allCarts)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// Crear un nuevo carrito.
router.post('/', async (req, res) => {
    try {
        await cart.createCart()
        const carts = await cart.getCarts()
        const newCart = JSON.stringify(carts[carts.length - 1].id)
        res.status(200).send(`¡El carrito fue creado satisfactoriamente. el ID es: ${newCart}!`)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// Obtener los productos del carrito.
router.get('/:cid', async (req, res) => { 
    try {
        const { cid } = req.params;
        const allCarts = await cart.getCarts()
        const cartFilter = allCarts.find(carts => carts.id == cid)
        if(cartFilter.products.length > 0){
            res.status(200).json(cartFilter.products)
        }else{
            res.status(400).send('No hay nada por mostrar, desea agregar productos?')
        }

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// Agregar un producto al carrito.
router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const {cid, pid} = req.params;
        await cart.getCartById(cid) // Se verifica que el carrito existe.
        await productManager.getProductById(pid) // Se verifica que el producto existe.
        await cart.addToCart(cid, pid) // Se agrega el producto al carrito.
        res.status(200).send(`El producto con ID: ${pid} fue agregado el carrito con el ID: ${cid}.`)

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

export default router;