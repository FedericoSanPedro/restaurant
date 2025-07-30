# restaurant

En este sitio web se busca ayudar a un restaurante poder hacer sus ventas via web. En este proyecto temprano se esta buscando poder cumplir con algunos pasos de los necesarios para poder llegar a tener un proyecto terminado.

Por eso, no todas las funciones de un sitio web de ventas estan implementadas.

Dentro del sitio empezamos con una Bienvenida al usuario, index. Donde se puede observar un navbar con 3 endpoints a donde avanzar, una imagen de fondo y un boton de Compra para ir a otro endpoint. El navbar es invocado en cada endpoint y es capaz de volverse toggle si se achica la pagina.

El siguiente endpoint es shop el cual nos permite ver el menu que ofrece el restaurante. Este se carga de una API; y devuelve id, categorias, imagenes, nombres, descripciones y precios. Se hayan botones de categorias que le permite al usuario presionar asi los productos que no pertenezcan a dicha categorias desaparezcan de la vista.
Luego se haya un boton al lado de cada producto para que se ejecute el agregado a la cartera de compra, el cual se guarda en el localstorage. Al apretarse un mensaje de agregado se vera reflejado.

El ultimo endpoint es cart en el cual se vera una tabla con los productos agregados. En caso de que no hayan se vera un mensaje explicitandolo. Cuando se encuentren al menos un producto agregado se vera su imagen con su nombre, el precio y la cantidad. Al modificar la cantidad se puede agregar un maximo de 10, en caso de pasarse se vera reflejado un mensaje sobre el limite de compra. Tambien la cantidad reflejara el cambio de precio del producto. Y si se agrega desde el endpoint shop tambien modificara este resultado.
Cada producto tiene un boton de borrar ese producto, eliminandolo de la tabla inmediatamente. Ademas se haya un boton debajo de la tabla que permite borrar todos los productos de la tabla. Al apretarse un mensaje de confirmacion aparece y al aceptarse se eliminan todos los productos de la tabla.

Eso es todo por ahora. En caso de que se hayan agregado mas funciones o modificado ya existentes hablarlo con el desarrollador Federico San Pedro.
Gracias y Saludos.