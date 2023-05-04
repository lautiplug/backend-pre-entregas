import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
const path = 'src/manager/products.json';

class ProductManager {
    #firstId = 0;
    constructor(path) {
        this.path = path;
    }

    // obtiene todos los productos
    async getProducts() {
        try {
            if (fs.existsSync(path)) {
                if (fs.existsSync(path).length != 0) {
                    const products = await fs.promises.readFile(path, 'utf-8')
                    return JSON.parse(products)
                } else {
                    throw new Error('No se encontraron productos en el almacenamiento.')
                }
            } else {
                throw new Error('Ocurrió un error al leer el almacenamiento de productos.')
            }
        } catch (error) {
            throw new Error(error.message)
        }
    }

    // genera un ID único para el producto
    async #generateId() {
        try {
            const idString = uuidv4();
            const idNumber = parseInt(idString.replace(/-/g, ''), 16);
            return idNumber;
        } catch (error) {
            console.log(error);
        }
    }

    // agrega un producto al archivo de productos
    async addProduct(name, description, price, photo, code, stock) {
        try {
            const product = {
                id: await this.#generateId(),
                name,
                description,
                price,
                photo,
                code,
                stock
            }
            const all = await this.getProducts()
            const productExists = all.find((p) => p.id === product.id);
            if (productExists) {
                throw new Error(`El producto con ID ${product.id} ya existe`);
            }
            all.push(product)
            await fs.promises.writeFile(path, JSON.stringify(all));
            return product
        } catch (error) {
            console.log(error);
        }
    }

    // obtiene un producto por su ID
    async getProductById(idProduct) {
        try {
            if (fs.existsSync(path)) {
                if (fs.existsSync(path).length != 0) {
                    const products = await fs.promises.readFile(path, 'utf-8')
                    const productsJSON = JSON.parse(products)
                    const productFilter = productsJSON.filter((prod) => prod.id == idProduct)
                    return productFilter[0]
                } else {
                    throw new Error('No se encontraron productos en el almacenamiento.')
                }
            } else {
                throw new Error('Ocurrió un error al leer el almacenamiento de productos.')
            }
        } catch (error) {
            throw new Error(error.message)
        }
    }

    // elimina un producto por su ID
    async deleteProduct(idProduct) {
        try {
            if (fs.existsSync(path)) {
                if (fs.existsSync(path).length != 0) {
                    const products = await fs.promises.readFile(path, 'utf-8')
                    const productsJSON = JSON.parse(products)
                    const productFound = productsJSON.filter((prod) => prod.id == idProduct); //PRODUCTO
                    const productFilter = productsJSON.filter((prod) => prod.id != idProduct); // NUEVO ARRAY
                    if (productFound.length > 0) {
                        await fs.promises.writeFile(path, JSON.stringify(productFilter))
                        return productFound
                    } else {
                        throw new Error('No se pudo eliminar el producto. Hubo un error o es inexistente.')
                    }
                } else {
                    throw new Error('El almacenamiento está vacío.')
                }
            } else {
                throw new Error('El producto o almacenamiento son inexistentes.')
            }
        } catch (error) {
            throw new Error(error.message)
        }
    }


    // Retorna el producto actualizado.
    async updateProduct(obj, id) {
        try {
            const productsFile = await this.getProducts();
            const index = productsFile.findIndex(prod => prod.id === id);
            console.log('Index:', index);
            if (index === -1) {
                throw new Error(`ID: ${id} no encontrado.`)
            } else {
                productsFile[index] = { ...obj, id }
            }
            await fs.promises.writeFile(path, JSON.stringify(productsFile));
            return productsFile[index]
        } catch (error) {
            console.log(error);
        }
    }

}

const productManager = new ProductManager()

const test = async () => {
    try {
        const obtener1 = await productManager.getProducts();
        console.log("Consulta inicial: ", obtener1);
        // Se agrega un producto (si tiene el mismo Code muestra error y no se agrega al file)
        await productManager.addProduct(
            "iphone 14",
            "producto nuevo caja sellada",
            1100,
            "www.iphoneimg.com",
            "gettingstuff0123",
            25
        );
    } catch (error) {
        console.log(error)
    }
}

// test()

export default ProductManager;