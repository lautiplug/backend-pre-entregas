import { Router } from "express";
import ProductManager from "../Manager/ProductManager.js";

const router = Router()

const productManager = new ProductManager()

// Obtener una lista de todos los productos.
router.get('/', async (req, res) => {
  try {
    const { limit } = req.query
    const products = await productManager.getProducts()
    const productLimit = products.slice(0, Number(limit))
    if (productLimit.length > 0) {
      res.status(200).json(productLimit)
    } else {
      res.status(200).json(products)
    }
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
})

// Obtener un producto por su ID.
router.get('/:pid', async (req, res) => {
  try {
    const { pid } = req.params;
    const productFilterID = await productManager.getProductById(Number(pid))
    if (productFilterID) {
      res.status(200).json(productFilterID)
    } else {
      res.status(400).send('El ID del producto no fue encontrado.')
    }
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
})

// Agregar un nuevo producto.
router.post('/', async (req, res) => {
  try {
    const product = req.body
    const newProduct = await productManager.addProduct(product)
    res.json(newProduct)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Actualizar un producto existente por su ID.
router.put('/:id', async (req, res) => {
  try {
    const product = req.body;
    const { id } = req.params;
    const productFile = await productManager.getProductById(Number(id));
    if (productFile) {
      await productManager.updateProduct(product, Number(id));
      res.send(`Producto actualizado con éxito.`);
    } else {
      res.status(404).send('El producto no fue encontrado.')
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
})

// Eliminar un producto existente por su ID.
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productManager.getProductById(Number(id));
    if (product) {
      await productManager.deleteProduct(Number(id));
      res.send(`El producto fue eliminado con éxito.`);
    } else {
      res.status(404).send('El producto no fue encontrado.')
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
})

export default router;