# Stream de objetos con Node.js

## 1. ¿Qué es?

Los Streams en Node.js permiten procesar datos progresivamente, sin necesidad de cargar toda la información en memoria. Mediante el modo `objectMode: true`, es posible trabajar directamente con objetos de JavaScript.

## 2. Tipos de Streams

- **Readable:** permite leer datos.
- **Writable:** permite escribir datos.
- **Duplex:** permite leer y escribir datos.
- **Transform:** permite modificar los datos durante el procesamiento.

## 3. ¿Cómo hacer Stream de objetos?

Para trabajar con streams de objetos se utiliza el módulo integrado `node:stream`, sin necesidad de instalar dependencias adicionales.

Los pasos principales son:

1. Importar las clases necesarias del módulo node:stream.
2. Crear un stream de lectura utilizando `Readable`.
3. Activar `objectMode: true` en los streams que trabajarán con objetos..
4. Utilizar `Transform` para modificar o procesar los objetos.
5. Utilizar `Writable` para recibir y mostrar los resultados.
6. Conectar los streams mediante el método `pipe()`.

## 4. Ejemplo práctico

El siguiente programa lee una lista de productos, calcula su precio con IGV y muestra los resultados.

```javascript
const { Readable, Transform, Writable } = require('node:stream');

const productos = [
    { nombre: 'Laptop', precio: 2500 },
    { nombre: 'Mouse', precio: 50 },
    { nombre: 'Teclado', precio: 120 }
];

// Lectura de objetos
const lector = Readable.from(productos);

// Transformación de objetos
const transformar = new Transform({
    objectMode: true,
    transform(producto, encoding, callback) {
        producto.precioConIGV = producto.precio * 1.18;
        callback(null, producto);
    }
});

// Escritura de resultados
const escritor = new Writable({
    objectMode: true,
    write(producto, encoding, callback) {
        console.log(producto);
        callback();
    }
});

// Conexión de los streams
lector.pipe(transformar).pipe(escritor);
```

## 5. Funcionamiento

El programa utiliza tres streams conectados:

- **Readable:** obtiene y envía los productos uno por uno.
- **Transform:** recibe cada producto y calcula su precio con IGV.
- **Writable:** recibe los productos procesados y los muestra en la consola.

El método `pipe()` conecta los streams y permite que los objetos pasen automáticamente de uno a otro.

## 6. Ejecución

Guardar el código en `index.js` y ejecutar en la terminal:

```bash
node index.js
```

## 7. Conclusión

Los streams de objetos permiten leer, transformar y escribir objetos de JavaScript progresivamente. Gracias a `objectMode: true` y al método `pipe()`, se puede procesar información de manera eficiente, evitando cargar todos los datos simultáneamente en memoria.
