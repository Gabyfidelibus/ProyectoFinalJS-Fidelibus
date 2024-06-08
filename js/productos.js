let mostrados = [];

// Libreria axios para hacer peticiones HTTP
const getProductos = async ()=> {
    try {
        const response = await axios.get("./productos.JSON");
        return (response) ? response.data : [];
    } catch (error) {
        return [];
    }
}

const mostrarProductos = () => {
    const contenedorProductos = document.querySelector(".productos-container");

    const contenedorVacio = document.createElement("h2");
    contenedorVacio.innerHTML = "No se encontraron productos";

    const listaProductos = document.createElement("ul");
    listaProductos.classList.add("productos-publicados");

    contenedorProductos.innerHTML = '';

    contenedorProductos.appendChild(contenedorVacio);

    if (mostrados.length > 0){
        contenedorProductos.replaceChild(listaProductos,contenedorVacio);
        listaProductos.innerHTML = ``;
        mostrados.forEach(producto => {
            let nuevoProducto = document.createElement("li");
            crearProducto(producto,nuevoProducto);
            listaProductos.appendChild(nuevoProducto);
        });
    }
}

function crearProducto(producto, nuevoProducto) {
    nuevoProducto.classList.add("producto");
    nuevoProducto.innerHTML = `
        <img src=${producto.img} alt=${producto.modelo}>
        <h2>${producto.modelo}</h2>
        <p>${formatoPrecio(producto.precio)}</p>`

    let formCarrito = document.createElement("form");
        formCarrito.classList.add("form-carrito");

    let selectColor = document.createElement("div");
    selectColor.classList.add("selec-color");
    selectColor.innerHTML = `<p>Seleccionar un color:</p>`
    producto.colores.forEach(color => {
        selectColor.innerHTML += `
        <label>
            <input type="radio" name="color" value=${color}>
            <span class="cbox-color" id="input-${color}"><span class="color"></span>${color}</span>
        </label>`
    });

    let selectMemoria = document.createElement("div");
    selectMemoria.classList.add("selec-memoria");
    if (producto.memoria){
        selectMemoria.innerHTML = `<p>Seleccionar memoria:</p>`
        producto.memoria.forEach(memoria => {
            selectMemoria.innerHTML += `
            <label>
                <input type="radio" name="memoria" value=${memoria}>
                <span class="cbox-memoria" id="input-${memoria}">${memoria}</span>
            </label>`
        });
    }

    let agregarCarritoBTN = document.createElement("input");
    agregarCarritoBTN.classList.add("btn-agregar-carrito");
    agregarCarritoBTN.setAttribute("type","submit");
    agregarCarritoBTN.setAttribute("value","Agregar al carrito");
    agregarCarritoBTN.addEventListener("click",(e)=>{
        e.preventDefault();
        agregarAlCarrito(producto, selectColor, selectMemoria)});

    formCarrito.appendChild(selectColor);
    formCarrito.appendChild(selectMemoria);
    formCarrito.appendChild(agregarCarritoBTN);
    nuevoProducto.appendChild(formCarrito);
}

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

function agregarAlCarrito(producto, colores, capacidades) {
    let color = obtenerValorRadio(colores.querySelectorAll('input[name="color"]'));
    let memoria = obtenerValorRadio(capacidades.querySelectorAll('input[name="memoria"]'));
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
        localStorage.setItem("carrito",JSON.stringify(carritoLS));
        crearPopUp();
    }
}

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
            /* button functionality */
            document.querySelector(".accion-carrito button.refuse").addEventListener("click", 
                () => {
                    popup.hide();
                    const link = document.createElement("a");
                    link.setAttribute("href","./productos.html");
                    link.click();
                });
    
            document.querySelector(".accion-carrito button.accept").addEventListener("click", 
                () => {
                    popup.hide();
                    const link = document.createElement("a");
                    link.setAttribute("href","./carrito.html");
                    link.click();
                });
        },
    });

    popup.show();
}

function buscarProductoRepetido(producto){
    return JSON.parse(localStorage.getItem("carrito")).productos.map(e => JSON.stringify({"modelo": e.modelo, "color": e.colores, "memoria": e.memoria})).indexOf(JSON.stringify({"modelo": producto.modelo, "color": producto.colores, "memoria": producto.memoria}));
}

function iniciarCarrito() {
    if (!localStorage.getItem("carrito")) {
        localStorage.setItem("carrito",JSON.stringify({"productos":[]}));
    }
}

const formatoPrecio = (number) => {
    const exp = /(\d)(?=(\d{3})+(?!\d))/g;
    const rep = '$1,';
    let arr = number.toFixed(2).toString().split('.');
    arr[0] = arr[0].replace(exp,rep);
    return '$' + ((arr[1]) ? arr.join('.') : arr[0]);
}

function crearBarraBusqueda(productos){
    const barraBusqueda = document.createElement("div");
    barraBusqueda.classList.add("buscador");
    barraBusqueda.innerHTML = `
        <input type="text" name="buscador" class="in-busqueda" placeholder="Buscar">
        <button class="btn-buscador"><svg class="buscar-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="m21 21l-4.343-4.343m0 0A8 8 0 1 0 5.343 5.343a8 8 0 0 0 11.314 11.314"/></svg></button>`;
    setTimeout(()=>{
        document.querySelector(".container-fluid").insertBefore(barraBusqueda,document.querySelector(".navbar-toggler"));
        document.querySelector(".btn-buscador").addEventListener("click",(e)=>{
            e.preventDefault();
            const valorBuscado = document.querySelector(".in-busqueda");
            if (valorBuscado){
                buscarProductos(valorBuscado.value, productos);
                mostrarProductos();
            }
        });
        document.querySelector(".in-busqueda").addEventListener("keypress",(e)=>{
            if (e.key === 'Enter') {
                const valorBuscado = document.querySelector(".in-busqueda");
                if (valorBuscado){
                    buscarProductos(valorBuscado.value, productos);
                    mostrarProductos();
                }
            }
        });
    },1);
    
}

function buscarProductos(valor, productos){
    mostrados = productos.map(producto=>{
        if (producto.modelo.toLowerCase().includes(valor.toLowerCase())){
            return producto;
        }
    }).filter(el => el);
}

function crearFiltro(productos){
    const contenedorFiltro = document.querySelector(".filtrar-productos");
    contenedorFiltro.innerHTML = `
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
                            <input id="GET-max-price" type="number" placeholder="4000000" name="max-price">
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

        let filtroColor = document.querySelector(".filtrar-colores");
        coloresDisponibles.forEach(color => {
            filtroColor.innerHTML += `
                <label>
                    <input type="checkbox" value="${color}"/>
                    <span class="cbox-color" id="cbox-${color}"><span class="color"></span>${color}</span>
                </label>`
        });

        const filtroForm = document.querySelector(".filtro-formulario");
        let sendBTN = document.createElement("input");
        sendBTN.classList.add("filtro-send-button");
        sendBTN.setAttribute("type","submit");
        sendBTN.setAttribute("value","Buscar");
        sendBTN.addEventListener("click",(e)=>{
            e.preventDefault();

            const inputColores = filtroColor.querySelectorAll("input");
            let coloresSeleccionados = [];
            inputColores.forEach((color)=>{
                if (color.checked) {
                    coloresSeleccionados.push(color.value);
                }
            });

            const categoria = document.getElementById("GET-categoria");
            let categoriaSeleccionada;
            if (categoria.value === "Elige una categoría..." || categoria.value === "Todos"){
                categoriaSeleccionada = '';
            }else {
                categoriaSeleccionada = categoria.value;
            }

            const precioMin = document.getElementById("GET-min-price");
            const precioMax = document.getElementById("GET-max-price");
            if (!precioMin.value){
                precioMin.value = 0;
            }
            if (!precioMax.value){
                precioMax.value = 4000000;
            }
            const rangoPrecio = [precioMin.value,precioMax.value];

            buscarProductosFiltrados(categoriaSeleccionada, rangoPrecio, coloresSeleccionados, productos);
            mostrarProductos();
        });
        filtroForm.appendChild(sendBTN);

}

function buscarProductosFiltrados(categoria, precio, colores, productos){
    if (categoria) {
        mostrados = productos.map(producto=>{
            if (producto.categoria.includes(categoria.toLowerCase())){
                return producto;
            }
        }).filter(el => el);
    }
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
        console.log(newProducto);
        if (newProducto && newProducto.precio >= precio[0] && newProducto.precio <= precio[1]){
            return newProducto;
        }
    }).filter(el => el);
}



document.addEventListener("DOMContentLoaded",async ()=> {
    const productos = await getProductos();
    mostrados = productos;
    iniciarCarrito();
    crearBarraBusqueda(productos);
    crearFiltro(productos);
    mostrarProductos();
});

window.addEventListener("resize",()=>crearFiltro());

