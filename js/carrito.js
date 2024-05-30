function iniciarCarrito() {
    if (!localStorage.getItem("carrito")) {
        localStorage.setItem("carrito",JSON.stringify({"productos":[]}));
    }
}

function mostrarCarrito(){
    const carrito = document.querySelector(".contenedor-carrito");
    const carritoLS = JSON.parse(localStorage.getItem("carrito"));
    let total = 0;
    if (carritoLS && carritoLS.productos.length) {
        const listaCarrito = document.createElement("div");
        listaCarrito.classList.add("lista-carrito");
        const resumenCarrito = document.createElement("div");
        resumenCarrito.classList.add("resumen-carrito");
        carrito.innerHTML = ``;
        carritoLS.productos.forEach(producto => {
            const contenedorProducto = document.createElement("div");
            contenedorProducto.innerHTML = `<img src=${producto.img} alt=${producto.modelo}>`
            contenedorProducto.classList.add("producto-carrito");
            const itemGeneral = document.createElement("div");
            itemGeneral.classList.add("item-general");
            itemGeneral.innerHTML = `
                <h3>${producto.modelo}, ${producto.memoria}, color ${producto.colores}</h3>`;
            
            total += producto.precio * producto.cantidad;

            const contenedorOperaciones = document.createElement("div");
            contenedorOperaciones.classList.add("contenedor-operaciones");

            const contenedorCantidad = document.createElement("div");
            contenedorCantidad.classList.add("contenedor-cantidad");

            const restarItem = document.createElement("button");
            const mostrarCantidad = document.createElement("span");
            const sumarItem = document.createElement("button");

            restarItem.classList.add("restar-item-btn")
            restarItem.innerText = "-";
            restarItem.addEventListener("click",(e)=>{
                e.preventDefault();
                restarElemento(carritoLS.productos, producto)});
            
            sumarItem.classList.add("sumar-item-btn")
            sumarItem.innerText = "+";
            sumarItem.addEventListener("click",(e)=>{
                e.preventDefault();
                sumarElemento(carritoLS.productos, producto)});

            mostrarCantidad.innerText = `${producto.cantidad}`;

            contenedorCantidad.appendChild(restarItem);
            contenedorCantidad.appendChild(mostrarCantidad);
            contenedorCantidad.appendChild(sumarItem);
            
            const eliminarBTN = document.createElement("button");
            eliminarBTN.classList.add("eliminar-item-btn")
            eliminarBTN.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fill="currentColor" d="M8.5 4h3a1.5 1.5 0 0 0-3 0m-1 0a2.5 2.5 0 0 1 5 0h5a.5.5 0 0 1 0 1h-1.054l-1.194 10.344A3 3 0 0 1 12.272 18H7.728a3 3 0 0 1-2.98-2.656L3.554 5H2.5a.5.5 0 0 1 0-1zM5.741 15.23A2 2 0 0 0 7.728 17h4.544a2 2 0 0 0 1.987-1.77L15.439 5H4.561zM8.5 7.5A.5.5 0 0 1 9 8v6a.5.5 0 0 1-1 0V8a.5.5 0 0 1 .5-.5M12 8a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/></svg>`;
            eliminarBTN.addEventListener("click",(e)=>{
                e.preventDefault();
                eliminarElemento(carritoLS.productos, producto)});

            contenedorOperaciones.appendChild(contenedorCantidad);
            contenedorOperaciones.appendChild(eliminarBTN);

            itemGeneral.appendChild(contenedorOperaciones);

            const itemPrecio = document.createElement("div");
            itemPrecio.classList.add("item-precio");
            itemPrecio.innerHTML = `<h4>${formatoPrecio(producto.precio)}</h4>`;

            contenedorProducto.appendChild(itemGeneral);
            contenedorProducto.appendChild(itemPrecio);

            listaCarrito.appendChild(contenedorProducto);
            carrito.appendChild(listaCarrito);
        });
        crearResumenCarrito(resumenCarrito,total,0);
        carrito.appendChild(resumenCarrito);
    } else {
        carrito.innerHTML = `<h2>El carrito está vacio</h2>`;
    }
}

function buscarProductoCarrito(producto){
    return JSON.parse(localStorage.getItem("carrito")).productos.map(e => JSON.stringify({"modelo": e.modelo, "color": e.colores, "memoria": e.memoria})).indexOf(JSON.stringify({"modelo": producto.modelo, "color": producto.colores, "memoria": producto.memoria}));
}

function restarElemento(carrito, producto) {
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

function sumarElemento(carrito, producto) {
    let indiceCarrito = buscarProductoCarrito(producto);
    carrito[indiceCarrito].cantidad++;
    localStorage.removeItem("carrito");
    localStorage.setItem("carrito",JSON.stringify({"productos":carrito}));
    mostrarCarrito();
}

function eliminarElemento(carrito, producto) {
    let indiceCarrito = buscarProductoCarrito(producto);
    carrito.splice(indiceCarrito,1);
    localStorage.removeItem("carrito");
    localStorage.setItem("carrito",JSON.stringify({"productos":carrito}));
    mostrarCarrito();
}

function crearResumenCarrito(resumenCarrito, total, descuento){
    let envio = (total>2000000) ? 0 : 5000;
    let iva = total * 0.21;
    let subtotal = total + envio + iva - descuento;
    resumenCarrito.innerHTML = `
        <h3>Resumen del pedido</h3>
        <p>Productos <span>${formatoPrecio(total)}</span></p>
        <p>IVA <span>${formatoPrecio(iva)}</span></p>
        <p>Envio <span>${(envio)?formatoPrecio(5000):'GRATIS'}</span></p>`;
    if (descuento) {
        resumenCarrito.innerHTML += `<p>Descuento <span>${formatoPrecio(descuento)}</span></p>`;
    }
    resumenCarrito.innerHTML += `<h4>Subtotal <span>${formatoPrecio(subtotal)}</span></h4>`;
    const finalizarCompraBTN = document.createElement("button");
    finalizarCompraBTN.classList.add("finalizar-compra-btn");
    finalizarCompraBTN.innerText = "Finalizar compra";
    finalizarCompraBTN.addEventListener("click",(e)=>{
        e.preventDefault();
        finalizaCompra(subtotal)});
    resumenCarrito.appendChild(finalizarCompraBTN);
    if (descuento === 0) {
        const agregarCupon = document.createElement("div");
        agregarCupon.classList.add("contenedor-cupon");
        agregarCupon.innerHTML = `
            <label>
                <span>¿Tienes un cupón de descuento?</span>
                <input id="cupon-descuento" type="text" name="descuento" placeholder="Cupón de bienvenida: iStore">
            </label>`;
        const aplicarCuponBTN = document.createElement("input");
        aplicarCuponBTN.setAttribute("type","submit");
        aplicarCuponBTN.classList.add("aplicar-cupon-btn");
        aplicarCuponBTN.setAttribute("value","Aplicar descuento");
        aplicarCuponBTN.addEventListener("click",(e)=>{
            e.preventDefault();
            const valorCupon = agregarCupon.querySelector("#cupon-descuento");
            if (valorCupon.value === "iStore"){
                crearResumenCarrito(resumenCarrito, total, 10000);
            } else {
                valorCupon.style.border = '1px solid red';
            }
        });
        agregarCupon.appendChild(aplicarCuponBTN);
        resumenCarrito.appendChild(agregarCupon);
    }
    
}

function finalizaCompra(subtotal) {
    const carrito = document.querySelector(".contenedor-carrito");
    carrito.innerHTML = `<h2>Compra realizada con exito!</h2>`;
}

const formatoPrecio = (number) => {
    const exp = /(\d)(?=(\d{3})+(?!\d))/g;
    const rep = '$1,';
    let arr = number.toFixed(2).toString().split('.');
    arr[0] = arr[0].replace(exp,rep);
    return '$' + ((arr[1]) ? arr.join('.') : arr[0]);
}

document.addEventListener("DOMContentLoaded",()=>{
    iniciarCarrito();
    mostrarCarrito();
});
