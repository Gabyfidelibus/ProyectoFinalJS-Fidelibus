let mostrados = []; // un array con los productos (objetos) que se muestran en pantalla

// Libreria axios para hacer peticiones HTTP
const getProductos = async ()=> {
    try {
        // retorno un array con los productos que se encuentran en el archivo .JSON
        const response = await axios.get("./productos.JSON");
        return (response) ? response.data : [];
    } catch (error) {
        return [];
    }
}

// muestro los productos por pantalla
const mostrarProductos = () => {
    const $contenedorProductos = document.querySelector(".productos-container");

    const $contenedorVacio = document.createElement("h2");
    $contenedorVacio.innerHTML = "No se encontraron productos";

    const $listaProductos = document.createElement("ul");
    $listaProductos.classList.add("productos-publicados");

    $contenedorProductos.innerHTML = '';

    $contenedorProductos.appendChild($contenedorVacio);

    if (mostrados.length > 0){
        $contenedorProductos.replaceChild($listaProductos,$contenedorVacio);
        $listaProductos.innerHTML = ``;
        mostrados.forEach(producto => {
            let $nuevoProducto = document.createElement("li");
            crearProducto(producto,$nuevoProducto);
            $listaProductos.appendChild($nuevoProducto);
        });
    }
}

// creo el HTML para cada producto
function crearProducto(producto, $nuevoProducto) {
    $nuevoProducto.classList.add("producto");
    $nuevoProducto.innerHTML = `
        <img src=${producto.img} alt=${producto.modelo}>
        <h2>${producto.modelo}</h2>
        <p>${formatoPrecio(producto.precio)}</p>`

    // creo formulario para agregar el producto al carrito
    let $formCarrito = document.createElement("form");
        $formCarrito.classList.add("form-carrito");

    // creo input para elegir el color del producto
    let $selectColor = document.createElement("div");
    $selectColor.classList.add("selec-color");
    $selectColor.innerHTML = `<p>Seleccionar un color:</p>`
    producto.colores.forEach(color => {
        $selectColor.innerHTML += `
        <label>
            <input type="radio" name="color" value=${color}>
            <span class="cbox-color" id="input-${color}"><span class="color"></span>${color}</span>
        </label>`
    });

    // creo input para elegir la memoria del producto
    let $selectMemoria = document.createElement("div");
    $selectMemoria.classList.add("selec-memoria");
    if (producto.memoria){
        $selectMemoria.innerHTML = `<p>Seleccionar memoria:</p>`
        producto.memoria.forEach(memoria => {
            $selectMemoria.innerHTML += `
            <label>
                <input type="radio" name="memoria" value=${memoria}>
                <span class="cbox-memoria" id="input-${memoria}">${memoria}</span>
            </label>`
        });
    }

    // creo boton para agregar al carrito
    let $agregarCarritoBTN = document.createElement("input");
    $agregarCarritoBTN.classList.add("btn-agregar-carrito");
    $agregarCarritoBTN.setAttribute("type","submit");
    $agregarCarritoBTN.setAttribute("value","Agregar al carrito");
    $agregarCarritoBTN.addEventListener("click",(e)=>{
        e.preventDefault();
        agregarAlCarrito(producto, $selectColor, $selectMemoria)});

    $formCarrito.appendChild($selectColor);
    $formCarrito.appendChild($selectMemoria);
    $formCarrito.appendChild($agregarCarritoBTN);
    $nuevoProducto.appendChild($formCarrito);
}

// retorna el valor de un input radio (lo utilizo para saber que color y memoria se eligio)
function obtenerValorRadio(radios) {
    let valor;
    for (const radio of radios) {
        if (radio.checked) {
            valor = radio.value;
            break;
        }
    }
    return valor;
}

// agrego al carrito el producto correspondiente
function agregarAlCarrito(producto, colores, capacidades) {
    let color = obtenerValorRadio(colores.querySelectorAll('input[name="color"]'));
    let memoria = obtenerValorRadio(capacidades.querySelectorAll('input[name="memoria"]'));
    // solo agrego en caso de que se seleccione la memoria y el color de ser requerido
    if (color && (memoria || !producto.memoria) ) {
        let aux = producto;
        aux.colores = color;
        aux.memoria = memoria;
        aux.cantidad = 1;
        let carritoLS = JSON.parse(localStorage.getItem("carrito"));
        if (carritoLS.productos.length === 0) {
            carritoLS = {"productos":[aux]};
        } else {
            let repetido = buscarProductoRepetido(aux);
            if (repetido !== -1) {
                carritoLS.productos[repetido].cantidad++;
            } else {
                carritoLS.productos.push(aux);
            }
        }
        // agrego al local storage y muestro un pop up
        localStorage.setItem("carrito",JSON.stringify(carritoLS));
        crearPopUp();
    }
}

// creo un pop up cuando se agrego un producto al carrito
const crearPopUp = () =>{
    const popup = new Popup({
        id: "popup-carrito",
        title: "Enhorabuena!",
        content: `El produto se ha añadido al carrito exitosamente.
        accion-carrito big-margin§{btn-refuse}[Seguir comprando]{btn-accept}[Ir al carrito]`,
        sideMargin: "1.5em",
        fontSizeMultiplier: "1.2",
        backgroundColor: "#f4f4f4",
        borderWidth: ".25em",
        borderColor: "#753595",
        titleColor: "#753595",
        textColor: "#3d3d3d",
        allowClose: false,
        css: `
        .popup.popup-carrito .accion-carrito {
            display: flex;
            justify-content: center;
            gap: 1.5em;
        }
        .popup.popup-carrito button.refuse {
            background-color: #753595;
            color: #f4f4f4;
            padding: 10px 15px 13px;
        }
        .popup.popup-carrito button.accept {
            background-color: #f4f4f4;
            color: #753595;
        }`,
        loadCallback: () => {
            // boton para continuar comprando
            document.querySelector(".accion-carrito button.refuse").addEventListener("click", 
                () => {
                    popup.hide();
                    const $link = document.createElement("a");
                    $link.setAttribute("href","./productos.html");
                    $link.click();
                });
            // boton para ir al carrito
            document.querySelector(".accion-carrito button.accept").addEventListener("click", 
                () => {
                    popup.hide();
                    const $link = document.createElement("a");
                    $link.setAttribute("href","./carrito.html");
                    $link.click();
                });
        },
    });

    popup.show();
}

// busca si un producto ya se encuentra en el carrito y retorna la posicion en la que se encuentra del array (o -1 si no se encuentra)
function buscarProductoRepetido(producto){
    return JSON.parse(localStorage.getItem("carrito")).productos.map(e => JSON.stringify({"modelo": e.modelo, "color": e.colores, "memoria": e.memoria})).indexOf(JSON.stringify({"modelo": producto.modelo, "color": producto.colores, "memoria": producto.memoria}));
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

// crea el buscador de productos
function crearBuscador(productos){
    // muestro el logo de la pagina si el ancho de la misma supera los 991px (asi se muestra la barra de busqueda)
    if (window.innerWidth <= 991){
        document.querySelector(".home-menu").style.display = 'none';
    } else {
        document.querySelector(".home-menu").style.display = 'flex';
    }

    const $buscador = document.createElement("div");
    $buscador.classList.add("buscador");
    $buscador.innerHTML = `
        <input type="text" name="buscador" class="in-busqueda" placeholder="Buscar">
        <button class="btn-buscador"><svg class="buscar-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="m21 21l-4.343-4.343m0 0A8 8 0 1 0 5.343 5.343a8 8 0 0 0 11.314 11.314"/></svg></button>`;
    const $contenedorNav = document.querySelector(".container-fluid");
    $contenedorNav.insertBefore($buscador,document.querySelector(".navbar-toggler"));
    document.querySelector(".btn-buscador").addEventListener("click",(e)=>{
        e.preventDefault();
        const $valorBuscado = document.querySelector(".in-busqueda");
        if ($valorBuscado){
            mostrados = buscarProductos($valorBuscado.value, productos);
            mostrarProductos();
        }
    });
    document.querySelector(".in-busqueda").addEventListener("keypress",(e)=>{
        if (e.key === 'Enter') {
            const $valorBuscado = document.querySelector(".in-busqueda");
            if ($valorBuscado){
                mostrados = buscarProductos($valorBuscado.value, productos);
                mostrarProductos();
            }
        }
    });
}

// guarda en mostrados los productos que coinciden con el modelo buscado
function buscarProductos(valor, productos){
    return productos.map(producto=>{
        if (producto.modelo.toLowerCase().includes(valor.toLowerCase())){
            return producto;
        }
    }).filter(el => el);
}

function buscarProductoExacto(valor, productos){
    return productos.map(producto=>{
        if (producto.modelo.toLowerCase() === valor.toLowerCase()){
            return producto;
        }
    }).filter(el => el);
}

// crea el filtrado de procutos por categoria, rango de precios y colores
function crearFiltro(productos){
    const moneda = JSON.parse(localStorage.getItem("moneda"));
    const $contenedorFiltro = document.querySelector(".filtrar-productos");
    $contenedorFiltro.innerHTML = `
        ${(window.innerWidth <= 991)?'<details>':'<div class="contenedor-filtro">'}
            <${(window.innerWidth <= 991)?'summary':'h2'}>Filtrar productos</${(window.innerWidth <= 991)?'summary':'h2'}>
            <form action="" method="GET" autocomplete="off" class="filtro-formulario card card-body">
                <div class="section1">  
                    <select id="GET-categoria" name="categoria" >
                        <option disabled selected>Elige una categoría...</option>
                        <option>Todos</option>
                        <option>Celular</option>
                        <option>Tablet</option>
                        <option>Notebook</option>
                        <option>Computadora</option>
                        <option>Reloj</option>
                        <option>Auricular</option>
                        <option>Cable</option>
                        <option>Funda</option>
                        <option>Cargador</option>
                        <option>Otros accesorios</option>
                    </select>
                    <h3>Precio</h3>
                    <div class="price-range">
                        <div class="price-range-input">
                            <label for="GET-min-price">Desde</label>
                            <input id="GET-min-price" type="number" placeholder="0" name="min-price">
                        </div>
                        <div class="price-range-input">
                            <label for="GET-min-price">Hasta</label>
                            <input id="GET-max-price" type="number" placeholder=${(moneda.tipo === 'peso') ? "4000000" : "4000"} name="max-price">
                        </div>
                    </div>
                </div>
                <div class="section2">
                    <h3>Colores</h3>
                    <div class="filtrar-colores"></div>
                </div>
            </form>
            ${(window.innerWidth <= 991)?'</details>':'</div>'}`;

        const coloresDisponibles = ["azul","rojo","blanco","negro","gris","verde","rosa","marron","amarillo"];

        // crea un input para cada color
        const $filtroColor = document.querySelector(".filtrar-colores");
        coloresDisponibles.forEach(color => {
            $filtroColor.innerHTML += `
                <label>
                    <input type="checkbox" value="${color}"/>
                    <span class="cbox-color" id="cbox-${color}"><span class="color"></span>${color}</span>
                </label>`
        });

        // crea el boton para buscar los productos filtrados
        const $filtroForm = document.querySelector(".filtro-formulario");
        const $sendBTN = document.createElement("input");
        $sendBTN.classList.add("filtro-send-button");
        $sendBTN.setAttribute("type","submit");
        $sendBTN.setAttribute("value","Buscar");
        $sendBTN.addEventListener("click",(e)=>{
            e.preventDefault();
            // guardo en un array con los colores seleccionados
            const $inputColores = $filtroColor.querySelectorAll("input");
            let coloresSeleccionados = [];
            $inputColores.forEach((color)=>{
                if (color.checked) {
                    coloresSeleccionados.push(color.value);
                }
            });
            // guardo la categoria seleccionada si no se selecciona nada o se selecciona todos guarda un string vacio
            const $categoria = document.getElementById("GET-categoria");
            let categoriaSeleccionada;
            if ($categoria.value === "Todos"){
                categoriaSeleccionada = '';
            } else if ($categoria.value === "Elige una categoría...") {
                categoriaSeleccionada = undefined;
            } else {
                categoriaSeleccionada = $categoria.value;
            }
            // guardo el rango de precios seleccionado en un array
            const $precioMin = document.getElementById("GET-min-price");
            const $precioMax = document.getElementById("GET-max-price");
            if (!$precioMin.value){
                $precioMin.value = 0;
            }
            if (!$precioMax.value){
                $precioMax.value = (moneda.tipo === 'dolar') ? 4000 : 4000000;
            }
            const rangoPrecio = [moneda.cambio * $precioMin.value, moneda.cambio * $precioMax.value];

            buscarProductosFiltrados(categoriaSeleccionada, rangoPrecio, coloresSeleccionados, productos);
            mostrarProductos();
        });
        $filtroForm.appendChild($sendBTN);

}

// busco los productos filtrados
function buscarProductosFiltrados(categoria, precio, colores, productos){
    // si se eligio una categoria busco en todos los productos cuales coinciden
    if (categoria !== undefined) {
        mostrados = productos.map(producto=>{
            if (producto.categoria.includes(categoria.toLowerCase())){
                return producto;
            }
        }).filter(el => el);
    }
    // busco de los productos mostrados cuales coinciden en color y se encuentren entre el rango de precios
    mostrados = mostrados.map(producto=>{
        let newProducto;
        if (colores.length>0){
            colores.every(color=>{
                if (producto.colores.includes(color.toLowerCase())){
                    newProducto = producto;
                    return false;
                } else {
                    return true;
                }
            });
        } else {
            newProducto = producto;
        }
        if (newProducto && newProducto.precio >= precio[0] && newProducto.precio <= precio[1]){
            return newProducto;
        }
    }).filter(el => el); // con el filter elimino del array de mostrados los valores 'undefined' que resultan del map
}

const getLink = (productos) =>{
    const productoBuscado = JSON.parse(localStorage.getItem("producto"));
    localStorage.setItem("producto",JSON.stringify({"modelo":''}));
    if (productoBuscado.modelo !== ''){
        return buscarProductoExacto(productoBuscado.modelo, productos);
    } else {
        return undefined;
    }
}


document.addEventListener("DOMContentLoaded",async ()=> {
    const productos = await getProductos(); // al tratarse de una promesa tengo que esperar a que se resuelva la misma para obtener los productos
    const productoIndex = getLink(productos); // si se quiere ver un producto en especifico desde el index se busca con esta funcion
    mostrados = (productoIndex) ? productoIndex : productos; // al principio se muestran todos los productos
    crearBuscador(productos);
    crearFiltro(productos);
    mostrarProductos();
});

// cuando hago un resize creo nuevamente el filtro si el ancho de la ventana cambia entre 991px
window.addEventListener("resize",()=>{
    if (window.innerWidth <= 991 && document.querySelector(".contenedor-filtro")){
        document.querySelector(".home-menu").style.display = 'none';
        crearFiltro(productos);
    }
    else if (window.innerWidth > 991 && !document.querySelector(".contenedor-filtro")){
        document.querySelector(".home-menu").style.display = 'flex';
        crearFiltro(productos);
    }});

