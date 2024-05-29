function iniciarCarrito() {
    if (!localStorage.getItem("carrito")) {
        localStorage.setItem("carrito",JSON.stringify({"productos":[]}));
    }
}

function mostrarCarrito(){
    let carrito = document.querySelector(".lista-carrito");
    let carritoLS = JSON.parse(localStorage.getItem("carrito"));
    if (carritoLS && carritoLS.productos.length) {
        carrito.classList.remove("carrito-vacio");
        carrito.innerHTML = ``;
        carritoLS.productos.forEach(producto => {
            let contenedorProducto = document.createElement("div");
            contenedorProducto.classList.add("producto-carrito");
            contenedorProducto.innerHTML = `
                <h3>${producto.modelo} <span>${producto.colores}</span> <span>${producto.memoria}</span></h3>
                <p>$${producto.precio}</p>
                <p>Cantidad: ${producto.cantidad}</p>
                <h4>Subtotal: <span>$${producto.precio * producto.cantidad}</span></h4>`;

            let eliminarBTN = document.createElement("button");
            eliminarBTN.classList.add("eliminar-item-btn")
            eliminarBTN.innerText = "Eliminar";
            eliminarBTN.addEventListener("click",(e)=>{
                e.preventDefault();
                eliminarElemento(carritoLS.productos, producto)});
            
            contenedorProducto.appendChild(eliminarBTN);
            carrito.appendChild(contenedorProducto);
        });
    } else {
        carrito.classList.add("carrito-vacio");
        carrito.innerHTML = `<h2>El carrito está vacio</h2>`;
    }
}

function buscarProductoCarrito(producto){
    return JSON.parse(localStorage.getItem("carrito")).productos.map(e => JSON.stringify({"modelo": e.modelo, "color": e.colores, "memoria": e.memoria})).indexOf(JSON.stringify({"modelo": producto.modelo, "color": producto.colores, "memoria": producto.memoria}));
}

function eliminarElemento(carrito, producto) {
    console.log("Eliminando item");
    console.log(producto);
    let indiceCarrito = buscarProductoCarrito(producto);
    if (carrito[indiceCarrito].cantidad === 1) {
        carrito.splice(indiceCarrito,1);
    } else {
        carrito[indiceCarrito].cantidad--;
    }
    localStorage.removeItem("carrito");
    localStorage.setItem("carrito",JSON.stringify({"productos":carrito}));
    mostrarCarrito();
}

document.addEventListener("DOMContentLoaded",()=>{
    iniciarCarrito();
    mostrarCarrito();
});
