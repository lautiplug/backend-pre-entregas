import fs from 'fs';

const path = 'src/cart/Cart.json'
const pathProductManager = 'src/manager/products.json'

// se crea la clase Cart
class Cart {
  #firstId = 0;
  constructor() {
    this.path = path
  }


  // Genera un nuevo ID para un carrito. Si hay carritos existentes, el ID será el máximo de los IDs existentes + 1.
  // Si no hay carritos existentes, el ID será igual al primer ID disponible (empieza en 1).
  async #generateId() {
    const allCarts = await fs.promises.readFile(path, 'utf-8')
    const cartsJSON = JSON.parse(allCarts)

    if (cartsJSON.length > 0) {
      const cartIds = cartsJSON.map(cart => cart.id)
      const maxNumber = Math.max(...cartIds)
      console.log(cartIds, maxNumber)
      let id = maxNumber + 1
      return id
    } else {
      this.#firstId += 1
      let id = this.#firstId
      return id;
    }
  }

  // Crear un nuevo cart en el archivo JSON.
  async createCart() {
    try {
      if (fs.existsSync(path)) {

        const cart = await fs.promises.readFile(path, 'utf-8')

        if (cart.length == 0) {
          await fs.promises.writeFile(path, JSON.stringify([]))
        }

        const newCart = {
          id: await this.#generateId(),
          products: []
        }

        if (cart.length == 0) {
          await fs.promises.writeFile(path, JSON.stringify([newCart]))
        } else {
          const cartJSON = JSON.parse(cart)
          cartJSON.push(newCart)
          await fs.promises.writeFile(path, JSON.stringify(cartJSON))
        }

      } else {
        return []
      }

    } catch (error) {
      return console.log(error)
    }
  }

  // Obtener el carrito del archivo JSON
  async getCarts() {
    try {
      const cartReader = await fs.promises.readFile(path, 'utf-8')
      const cartReaderJSON = JSON.parse(cartReader)
      return cartReaderJSON
    } catch (error) {
      return console.log(error)
    }
  }

  // Obtener un carrito especifico por ID del archivo JSON
  async getCartById(id) {
    try {
      const cartReader = await this.getCarts()
      const cartFilterId = cartReader.find(cart => cart.id == id)
      return console.log(cartFilterId.id)
    } catch (error) {
      return console.log(error)
    }
  }

  // Obtener todos los productos del archivos products.json
  async getProducts() {
    const products = await fs.promises.readFile(pathProductManager, 'utf-8')
    const productsJSON = JSON.parse(products)
    return productsJSON
  }

  // Agregar un producto al carrito por Cart ID y Product ID
  async addToCart(idCart, idProduct) {
    try {
      const cartReader = await this.getCarts()
      const cartFilter = cartReader.find(carts => carts.id == idCart)
      if (cartFilter) {
        const products = await this.getProducts()
        const productFound = products.find(product => product.id == idProduct)
        if (!productFound) {
          throw new Error('El producto no fue encontrado.')
        }
        const restCarts = cartReader.filter(cart => cart.id != idCart)
        if (cartFilter.products.length) {
          const productIndex = cartFilter.products.findIndex(product => product.id == idProduct)
          if (productIndex > -1) {
            cartFilter.products[productIndex].quantity += 1
          } else {
            cartFilter.products.push({
              id: idProduct,
              quantity: 1
            })
          }
        } else {
          cartFilter.products.push({
            id: idProduct,
            quantity: 1
          })
        }
        restCarts.push(cartFilter)
        await fs.promises.writeFile(path, JSON.stringify(restCarts))
        return cartFilter
      } else {
        throw new Error('El carrito no fue encontrado.')
      }
    } catch (error) {
      console.log(error)
    }
  }
}

// test()

export default Cart;