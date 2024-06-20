// crea el HTML para mostrar los productos en el carrito
function mostrarCarrito(){
    const $carrito = document.querySelector(".contenedor-carrito");
    const carritoLS = JSON.parse(localStorage.getItem("carrito"));
    const $titulo = document.querySelector(".titulo-carrito");
    let total = 0;

    if (carritoLS && carritoLS.productos.length) { // si hay elementos en el carrito
        let cantidadItems = 0
        // lista donde se van a mostrar los productos
        const $listaCarrito = document.createElement("div");
        $listaCarrito.classList.add("lista-carrito");
        // resumen del carrito de compras
        const $resumenCarrito = document.createElement("div");
        $resumenCarrito.classList.add("resumen-carrito");
        $carrito.innerHTML = ``;
        // para cada producto en el carrito
        carritoLS.productos.forEach(producto => {
            // creo un contenedor que muestre
            const $contenedorProducto = document.createElement("div");
            // imagen del producto
            $contenedorProducto.innerHTML = `<img src=${producto.img} alt=${producto.modelo}>`
            $contenedorProducto.classList.add("producto-carrito");
            // modelo, memoria y color del mismo
            const $itemGeneral = document.createElement("div");
            $itemGeneral.classList.add("item-general");
            $itemGeneral.innerHTML = `
                <h3>${producto.modelo}${(producto.memoria)?', '+producto.memoria : ''}, color ${producto.colores}</h3>`;
            // sumatoria del precio de los productos en el carrito
            total += producto.precio * producto.cantidad;
            // sumatoria de la cantidad de productos en el carrito
            cantidadItems += producto.cantidad;

            $titulo.innerText = `Mi carrito (${cantidadItems} item)`;
        
            const $contenedorOperaciones = document.createElement("div");
            $contenedorOperaciones.classList.add("contenedor-operaciones");

            const $contenedorCantidad = document.createElement("div");
            $contenedorCantidad.classList.add("contenedor-cantidad");

            const $restarItem = document.createElement("button");
            const $mostrarCantidad = document.createElement("span");
            const $sumarItem = document.createElement("button");
            // restar items
            $restarItem.classList.add("restar-item-btn")
            $restarItem.innerText = "-";
            $restarItem.addEventListener("click",(e)=>{
                e.preventDefault();
                restarElemento(carritoLS.productos, producto)});
            // agregar items
            $sumarItem.classList.add("sumar-item-btn")
            $sumarItem.innerText = "+";
            $sumarItem.addEventListener("click",(e)=>{
                e.preventDefault();
                incrementarElemento(carritoLS.productos, producto)});
            
            $mostrarCantidad.innerText = `${producto.cantidad}`;

            $contenedorCantidad.appendChild($restarItem);
            $contenedorCantidad.appendChild($mostrarCantidad);
            $contenedorCantidad.appendChild($sumarItem);
            
            // eliminar productos (todos los items)
            const $eliminarBTN = document.createElement("button");
            $eliminarBTN.classList.add("eliminar-item-btn")
            $eliminarBTN.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fill="currentColor" d="M8.5 4h3a1.5 1.5 0 0 0-3 0m-1 0a2.5 2.5 0 0 1 5 0h5a.5.5 0 0 1 0 1h-1.054l-1.194 10.344A3 3 0 0 1 12.272 18H7.728a3 3 0 0 1-2.98-2.656L3.554 5H2.5a.5.5 0 0 1 0-1zM5.741 15.23A2 2 0 0 0 7.728 17h4.544a2 2 0 0 0 1.987-1.77L15.439 5H4.561zM8.5 7.5A.5.5 0 0 1 9 8v6a.5.5 0 0 1-1 0V8a.5.5 0 0 1 .5-.5M12 8a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/></svg>`;
            $eliminarBTN.addEventListener("click",(e)=>{
                e.preventDefault();
                eliminarElemento(carritoLS.productos, producto)});

            $contenedorOperaciones.appendChild($contenedorCantidad);
            $contenedorOperaciones.appendChild($eliminarBTN);

            $itemGeneral.appendChild($contenedorOperaciones);

            // mostrar precio
            const $itemPrecio = document.createElement("div");
            $itemPrecio.classList.add("item-precio");
            $itemPrecio.innerHTML = `
                <h3>${formatoPrecio(producto.precio*producto.cantidad)}</h3>
                <h4>${formatoPrecio(producto.precio)}</h4>`;

            $contenedorProducto.appendChild($itemGeneral);
            $contenedorProducto.appendChild($itemPrecio);

            $listaCarrito.appendChild($contenedorProducto);
            $carrito.appendChild($listaCarrito);
        });
        crearResumenCarrito($resumenCarrito,total,0);
        $carrito.appendChild($resumenCarrito);
    } else { // si no hay productos en el carrito
        $titulo.innerText = '';
        $carrito.innerHTML = `<h2>El carrito está vacio</h2>`;
    }
}

// busca si un producto se encuentra en el carrito y de ser asi devuelve su posicion en el array (de lo contrario devuelve -1)
function buscarProductoCarrito(producto){
    return JSON.parse(localStorage.getItem("carrito")).productos.map(e => JSON.stringify({"modelo": e.modelo, "color": e.colores, "memoria": e.memoria})).indexOf(JSON.stringify({"modelo": producto.modelo, "color": producto.colores, "memoria": producto.memoria}));
}

// resta la cantidad y lo modifico en el local storage
function restarElemento(carrito, producto) {
    let indiceCarrito = buscarProductoCarrito(producto);
    // si la cantidad es 1 lo borro directamente
    if (carrito[indiceCarrito].cantidad === 1) {
        carrito.splice(indiceCarrito,1);
    } else {
        carrito[indiceCarrito].cantidad--;
    }
    localStorage.removeItem("carrito");
    localStorage.setItem("carrito",JSON.stringify({"productos":carrito}));
    mostrarCarrito();
}

// incrementa la cantidad y lo modifico en el local storage
function incrementarElemento(carrito, producto) {
    let indiceCarrito = buscarProductoCarrito(producto);
    carrito[indiceCarrito].cantidad++;
    localStorage.removeItem("carrito");
    localStorage.setItem("carrito",JSON.stringify({"productos":carrito}));
    mostrarCarrito();
}

// elimino en elemento del carrito
function eliminarElemento(carrito, producto) {
    let indiceCarrito = buscarProductoCarrito(producto);
    carrito.splice(indiceCarrito,1);
    localStorage.removeItem("carrito");
    localStorage.setItem("carrito",JSON.stringify({"productos":carrito}));
    mostrarCarrito();
}

// crea el resumen del carrito de compras
function crearResumenCarrito($resumenCarrito, total, descuento){
    let envio = (total>2000000) ? 0 : 5000;
    let iva = total * 0.21;
    let subtotal = total + envio + iva - descuento;
    $resumenCarrito.innerHTML = `
        <h3>Resumen del pedido</h3>
        <p>Productos <span>${formatoPrecio(total)}</span></p>
        <p>IVA <span>${formatoPrecio(iva)}</span></p>
        <p>Envio <span>${(envio)?formatoPrecio(5000):'GRATIS'}</span></p>`; // envio de $5000 para compras menores a $2000000
    if (descuento) { // solo muestro descuento si se aplica el cupon
        $resumenCarrito.innerHTML += `<p>Descuento <span>${formatoPrecio(descuento)}</span></p>`;
    }
    $resumenCarrito.innerHTML += `<h4>Subtotal <span>${formatoPrecio(subtotal)}</span></h4>`;
    
    // boton para finalizar la compra
    const $finalizarCompraBTN = document.createElement("button");
    $finalizarCompraBTN.classList.add("finalizar-compra-btn");
    $finalizarCompraBTN.innerText = "Finalizar compra";
    $finalizarCompraBTN.addEventListener("click",(e)=>{
        e.preventDefault();
        finalizaCompra()});
    $resumenCarrito.appendChild($finalizarCompraBTN);
    // si no se aplico un descuento permito la opcion de aplicar uno
    if (descuento === 0) {
        const $agregarCupon = document.createElement("div");
        $agregarCupon.classList.add("contenedor-cupon");
        $agregarCupon.innerHTML = `
            <label>
                <span>¿Tienes un cupón de descuento?</span>
                <input id="cupon-descuento" type="text" name="descuento" placeholder="Cupón de bienvenida: iStore">
            </label>`;
        const $aplicarCuponBTN = document.createElement("input");
        $aplicarCuponBTN.setAttribute("type","submit");
        $aplicarCuponBTN.classList.add("aplicar-cupon-btn");
        $aplicarCuponBTN.setAttribute("value","Aplicar descuento");
        $aplicarCuponBTN.addEventListener("click",(e)=>{
            e.preventDefault();
            const $valorCupon = $agregarCupon.querySelector("#cupon-descuento");
            if ($valorCupon.value === "iStore"){ // iStore es el unico cupon de descuento valido
                crearResumenCarrito($resumenCarrito, total, 10000);
            } else {
                $valorCupon.style.border = '1px solid red';
            }
        });
        $agregarCupon.appendChild($aplicarCuponBTN);
        $resumenCarrito.appendChild($agregarCupon);
    }
    
}

// finalizo compra y limpio el carrito de compras (libero el local storage)
function finalizaCompra() {
    const $carrito = document.querySelector(".contenedor-carrito");
    const $titulo = document.querySelector(".titulo-carrito");
    localStorage.removeItem("carrito");
    iniciarCarrito();
    $titulo.innerText = '';
    $carrito.innerHTML = `<h2>Compra realizada con exito!</h2>`;
}

// le da formato de moneda al precio para ser mostrado y convierte de peso a dolar de ser necesario
const formatoPrecio = (precio) => {
    const moneda = JSON.parse(localStorage.getItem("moneda"));
    precio /= moneda.cambio; 
    const exp = /(\d)(?=(\d{3})+(?!\d))/g;
    const rep = '$1,';
    let arr = precio.toFixed(2).toString().split('.');
    arr[0] = arr[0].replace(exp,rep);
    return '$' + ((arr[1]) ? arr.join('.') : arr[0]);
}

document.addEventListener("DOMContentLoaded",()=>{
    mostrarCarrito();
});
