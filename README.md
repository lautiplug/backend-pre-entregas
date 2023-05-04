Para ejecutar la aplicación, debe descargar el archivo y en la consola integrada o en la que desee (dirigirse al directorio de la carpeta) ejecutar el comando npm run dev
_Va a ver el mensaje "Servidor iniciado en http://localhost:8080"_

Descargue alguna aplicación o extensión para hacer solicitudes HTTP, recomiendo Postman o la extension para VSC Thunder Client


_GET:_ 
Debe copiar el path http://localhost:8080/products para ver la totalidad de los productos, http://localhost:8080/products/NUMERO para ver el producto por el id deseado ó http://localhost:8080/products?limit=NUMERO para pedir un resultado con un limite del numero que desee. Para ver todo el CART: http://localhost:8080/cart para ver un ID especifico: http://localhost:8080/products/NUMERO

_POST:_
Para obtener una lista de todos los productos, envía una solicitud GET a la ruta 'localhost:8080/'. 
Para limitar la cantidad de productos devueltos, agrega el parámetro de consulta 'limit'. Por ejemplo, podes enviar una solicitud GET a la ruta 'localhost:8080/products?limit=10' para obtener los primeros 10 productos tene en cuenta que la cantidad podría ser menor o mayor dependiendo los productos que agregues o hayan (3).

Para obtener un producto por su ID, envía una solicitud GET a la ruta 'localhost:8080/:pid', donde 'pid' es el ID del producto que deseas obtener. Por ejemplo, si deseas obtener el producto con ID 1, envía una solicitud GET a la ruta 'localhost:8080/1'.

Para agregar un nuevo producto, envía una solicitud POST a la ruta 'localhost:8080/'. Incluye los detalles del nuevo producto en el BODY de la solicitud. Tené en cuenta que el ID es generado por una función y es automática, por lo que si luego querés ver el ID de ese producto deberás buscarlo, notarás un ID largo.

_PUT:_
Para actualizar un producto existente por su ID, envía una solicitud PUT a la ruta 'localhost:8080/:id', donde 'id' es el ID del producto que deseas actualizar. Incluye los nuevos detalles del producto en el cuerpo de la solicitud.

_DELETE:_
Para eliminar un producto existente por su ID, envía una solicitud DELETE a la ruta '/:id', donde 'id' es el ID del producto que deseas eliminar.