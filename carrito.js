function iniciarCarrito() {
    if (!localStorage.getItem("carrito")) {
        localStorage.setItem("carrito",JSON.stringify({"productos":[]}));
    }
}

function mostrarCarrito(){
    let carrito = document.querySelector(".contenedor-carrito");
    let carritoLS = JSON.parse(localStorage.getItem("carrito"));
    let total = 0;
    if (carritoLS && carritoLS.productos.length) {
        let listaCarrito = document.createElement("div");
        listaCarrito.classList.add("lista-carrito");
        let resumenCarrito = document.createElement("div");
        resumenCarrito.classList.add("resumen-carrito");
        carrito.innerHTML = ``;
        carritoLS.productos.forEach(producto => {
            let contenedorProducto = document.createElement("div");
            contenedorProducto.innerHTML = `<img src=${producto.img} alt=${producto.modelo}>`
            contenedorProducto.classList.add("producto-carrito");
            let itemGeneral = document.createElement("div");
            itemGeneral.classList.add("item-general");
            itemGeneral.innerHTML = `
                <h3>${producto.modelo}, ${producto.memoria}, color ${producto.colores}</h3>
                <p>Cantidad: ${producto.cantidad}</p>`;
            
            total += producto.precio * producto.cantidad;
            let eliminarBTN = document.createElement("button");
            eliminarBTN.classList.add("eliminar-item-btn")
            eliminarBTN.innerText = "Eliminar";
            eliminarBTN.addEventListener("click",(e)=>{
                e.preventDefault();
                console.log("Eliminar");
                eliminarElemento(carritoLS.productos, producto)});
            let itemPrecio = document.createElement("div");
            itemPrecio.classList.add("item-precio");
            itemPrecio.innerHTML = `<h4>$${producto.precio}</h4>`;
            itemGeneral.appendChild(eliminarBTN);
            contenedorProducto.appendChild(itemGeneral);
            contenedorProducto.appendChild(itemPrecio);
            listaCarrito.appendChild(contenedorProducto);
            carrito.appendChild(listaCarrito);
        });
        resumenCarrito.innerHTML = `<h3>TOTAL: $${total}</h3>`;
        carrito.appendChild(resumenCarrito);
    } else {
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
