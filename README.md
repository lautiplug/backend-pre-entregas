Para ejecutar la aplicación, debe descargar el archivo y en la consola integrada o en la que desee (dirigirse al directorio de la carpeta) ejecutar el comando npm run dev
_Va a ver el mensaje "Servidor iniciado en http://localhost:8080"_

Descargue alguna aplicación o extensión para hacer solicitudes HTTP, recomiendo Postman o la extension para VSC Thunder Client


_GET:_ 
Debe copiar el path http://localhost:8080/products para ver la totalidad de los productos, http://localhost:8080/products/NUMERO para ver el producto por el id deseado ó http://localhost:8080/products?limit=NUMERO para pedir un resultado con un limite del numero que desee.

_POST:_
Para obtener una lista de todos los productos, envía una solicitud GET a la ruta 'localhost:8080/'. 
Para limitar la cantidad de productos devueltos, agrega el parámetro de consulta 'limit'. Por ejemplo, podes enviar una solicitud GET a la ruta 'localhost:8080/products?limit=10' para obtener los primeros 10 productos tene en cuenta que la cantidad podría ser menor o mayor dependiendo los productos que agregues o hayan (3).

Para obtener un producto por su ID, envía una solicitud GET a la ruta 'localhost:8080/:pid', donde 'pid' es el ID del producto que deseas obtener. Por ejemplo, si deseas obtener el producto con ID 1, envía una solicitud GET a la ruta 'localhost:8080/1'.

Para agregar un nuevo producto, envía una solicitud POST a la ruta 'localhost:8080/'. Incluye los detalles del nuevo producto en el BODY de la solicitud. Tené en cuenta que el ID es generado por una función y es automática, por lo que si luego querés ver el ID de ese producto deberás buscarlo, notarás un ID largo.

_PUT:_
Para actualizar un producto existente por su ID, envía una solicitud PUT a la ruta 'localhost:8080/:id', donde 'id' es el ID del producto que deseas actualizar. Incluye los nuevos detalles del producto en el cuerpo de la solicitud.

_DELETE:_
Para eliminar un producto existente por su ID, envía una solicitud DELETE a la ruta '/:id', donde 'id' es el ID del producto que deseas eliminar.


__CART__

_GET:_ 
Para obtener todos los carritos, envía una solicitud GET a la ruta 'http://localhost:8080/'. La respuesta debe ser un arreglo con todos los carritos existentes. Si no hay carritos, la respuesta será un arreglo vacío.

Obtener los productos del carrito: Para obtener los productos de un carrito, envía una solicitud GET a la ruta 'http://localhost:8080/:cid', donde 'cid' es el ID del carrito que deseas obtener. La respuesta debe ser un arreglo con todos los productos en el carrito. Si el carrito no tiene productos, la respuesta será un arreglo vacío.

_POST:_ 
Crear un nuevo carrito: Para crear un nuevo carrito, envía una solicitud POST a la ruta 'http://localhost:8080/'. No necesitas enviar ningún parámetro en el cuerpo de la solicitud. La respuesta será un mensaje indicando que el carrito fue creado satisfactoriamente, junto con el ID del carrito creado.

Agregar un producto al carrito: Para agregar un producto al carrito, envía una solicitud POST a la ruta 'http://localhost:8080/:cid/product/:pid', donde 'cid' es el ID del carrito al que deseas agregar el producto y 'pid' es el ID del producto que deseas agregar. La respuesta será un mensaje indicando que el producto fue agregado al carrito satisfactoriamente, junto con los IDs del carrito y del producto.