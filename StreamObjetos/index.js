
const { Readable, Transform, Writable } = require('node:stream');

// 1. Lista de productos
const productos = [
    { nombre: 'Laptop', precio: 2500 },
    { nombre: 'Mouse', precio: 50 },
    { nombre: 'Teclado', precio: 120 },
    { nombre: 'Monitor', precio: 800 }
];

// 2. Stream de lectura de objetos
const lector = Readable.from(productos);

// 3. Stream de transformación
const transformar = new Transform({
    objectMode: true,

    transform(producto, encoding, callback) {
        const productoProcesado = {
            ...producto,
            precioConIGV: producto.precio * 1.18
        };

        callback(null, productoProcesado);
    }
});

// 4. Stream de escritura
const escritor = new Writable({
    objectMode: true,

    write(producto, encoding, callback) {
        console.log('Producto:', producto.nombre);
        console.log('Precio original: S/', producto.precio);
        console.log('Precio con IGV: S/', producto.precioConIGV.toFixed(2));
        console.log('------------------------');

        callback();
    }
});

// 5. Conectar los streams
lector
    .pipe(transformar)
    .pipe(escritor);
