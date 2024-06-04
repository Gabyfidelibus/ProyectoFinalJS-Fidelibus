const productos = [
    {
        "modelo": "AirPods",
        "img": "https://http2.mlstatic.com/D_NQ_NP_816812-MLA46302470623_062021-O.webp",
        "precio": 200000,
        "categoria": "auricular",
        "colores": ["blanco"],
        "memoria": []
    },
    {
        "modelo": "AirPods Pro",
        "img": "https://http2.mlstatic.com/D_NQ_NP_741643-MLA75309123688_032024-O.webp",
        "precio": 300000,
        "categoria": "auricular",
        "colores": ["blanco","negro"],
        "memoria": []
    },
    {
        "modelo": "iPhone 11",
        "img": "https://http2.mlstatic.com/D_NQ_NP_656548-MLA46114829749_052021-O.webp",
        "precio": 850000,
        "categoria": "celular",
        "colores": ["blanco","negro"],
        "memoria": ["64GB","128GB"]
    },
    {
        "modelo": "iPhone 12",
        "img": "https://http2.mlstatic.com/D_NQ_NP_844835-MLU75323368191_032024-O.webp",
        "precio": 950000,
        "categoria": "celular",
        "colores": ["gris","negro"],
        "memoria": ["128GB","256GB"]
    },{
        "modelo": "iPhone 13 Pro",
        "img": "https://http2.mlstatic.com/D_NQ_NP_619667-MLA47781882790_102021-O.webp",
        "precio": 1390000,
        "categoria": "celular",
        "colores": ["azul","negro","blanco"],
        "memoria": ["128GB","256GB","512GB"]
    },
    {
        "modelo": "iPhone 14",
        "img": "https://http2.mlstatic.com/D_NQ_NP_761864-MLM51559384514_092022-O.webp",
        "precio": 1400000,
        "categoria": "celular",
        "colores": ["rojo","blanco","negro"],
        "memoria": ["128GB","256GB","512GB"]
    },
    {
        "modelo": "iPhone 14 Pro Max",
        "img": "https://http2.mlstatic.com/D_NQ_NP_873385-MLM51559384419_092022-O.webp",
        "precio": 2800000,
        "categoria": "celular",
        "colores": ["amarillo","negro","gris"],
        "memoria": ["128GB","256GB","512GB","1TB"]
    },
    {
        "modelo": "iPhone 15",
        "img": "https://http2.mlstatic.com/D_NQ_NP_958009-MLA71782868134_092023-O.webp",
        "precio": 1499999,
        "categoria": "celular",
        "colores": ["rosa","verde","amarillo","negro"],
        "memoria": ["128GB","256GB","512GB"]
    },
    {
        "modelo": "iPhone 15 Pro",
        "img": "https://http2.mlstatic.com/D_NQ_NP_878826-MLA71783168396_092023-O.webp",
        "precio": 1899999,
        "categoria": "celular",
        "colores": ["gris","azul","blanco","negro"],
        "memoria": ["128GB","256GB","512GB","1TB"]
    },
    {
        "modelo": "iPhone 15 Pro Max",
        "img": "https://http2.mlstatic.com/D_NQ_NP_924631-MLA71783367058_092023-O.webp",
        "precio": 2100000,
        "categoria": "celular",
        "colores": ["blanco","gris"],
        "memoria": ["128GB","256GB","512GB","1TB"]
    },
    {
        "modelo": "Watch S8",
        "img": "https://http2.mlstatic.com/D_NQ_NP_645112-MLA52173420737_102022-O.webp",
        "precio": 595999,
        "categoria": "reloj",
        "colores": ["rojo","negro","gris"],
        "memoria": ["32GB"]
    },
    {
        "modelo": "MacBook Pro",
        "img": "https://d2ihpvt6nd5q28.cloudfront.net/wp-content/uploads/2023/11/macbookpro_max_-1.jpg",
        "precio": 2200000,
        "categoria": "notebook",
        "colores": ["negro","azul","blanco"],
        "memoria": ["256GB","512GB","1TB"]
    },
    {
        "modelo": "MacBook Air",
        "img": "https://http2.mlstatic.com/D_NQ_NP_801112-MLA46516512347_062021-O.webp",
        "precio": 1750000,
        "categoria": "notebook",
        "colores": ["negro","azul","blanco"],
        "memoria": ["256GB","512GB"]
    },
    {
        "modelo": "iMac",
        "img": "https://http2.mlstatic.com/D_NQ_NP_648010-MLU74649939964_022024-O.webp",
        "precio": 3599999,
        "categoria": "computadora",
        "colores": ["gris","blanco"],
        "memoria": ["256GB","512GB"]
    },
    {
        "modelo": "iPad 9th generacion",
        "img": "https://http2.mlstatic.com/D_NQ_NP_830867-MLA74089488678_012024-O.webp",
        "precio": 599999,
        "categoria": "tablet",
        "colores": ["negro","azul","gris"],
        "memoria": ["64GB","128GB"]
    },
    {
        "modelo": "iPad 10th generacion",
        "img": "https://http2.mlstatic.com/D_NQ_NP_803992-MLA52988770428_122022-O.webp",
        "precio": 859999,
        "categoria": "tablet",
        "colores": ["negro","azul","marron"],
        "memoria": ["64GB","128GB"]
    },
    {
        "modelo": "iPad Mini",
        "img": "https://http2.mlstatic.com/D_NQ_NP_632987-MLU74118278126_012024-O.webp",
        "precio": 889999,
        "categoria": "tablet",
        "colores": ["gris","blanco","rosa"],
        "memoria": ["64GB","128GB","256GB"]
    },
    {
        "modelo": "iPad Pro",
        "img": "https://http2.mlstatic.com/D_NQ_NP_814559-MLA53970921150_022023-O.webp",
        "precio": 2200000,
        "categoria": "tablet",
        "colores": ["negro","azul","rosa","blanco","gris","marron"],
        "memoria": ["128GB","256GB"]
    }
];

let productosMostrados = productos;
const coloresDisponibles = ["azul","rojo","blanco","negro","gris","verde","rosa","marron","amarillo"];

function mostrarProductos() {
    const contenedorProductos = document.querySelector(".productos-container");

    const contenedorVacio = document.createElement("h2");
    contenedorVacio.innerHTML = "No se encontraron productos";

    const listaProductos = document.createElement("ul");
    listaProductos.classList.add("productos-publicados");

    contenedorProductos.innerHTML = '';

    contenedorProductos.appendChild(contenedorVacio);

    if (productosMostrados.length > 0){
        contenedorProductos.replaceChild(listaProductos,contenedorVacio);
        listaProductos.innerHTML = ``;
        productosMostrados.forEach(producto => {
            let nuevoProducto = document.createElement("li");
            crearProducto(producto,nuevoProducto);
            listaProductos.appendChild(nuevoProducto);
        });
    }
}

function crearProducto(producto,nuevoProducto) {
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
    if (producto.memoria.length > 0){
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
    if (color && (memoria || producto.memoria.length === 0) ) {
        let aux = producto;
        aux.colores = color;
        aux.memoria = memoria;
        aux.cantidad = 1;
        let carritoLS = JSON.parse(localStorage.getItem("carrito"));
        if (carritoLS.productos.length === 0) {
            carritoLS = {"productos":[aux]};
        } else {
            repetido = buscarProductoRepetido(aux);
            if (repetido !== -1) {
                carritoLS.productos[repetido].cantidad++;
            } else {
                carritoLS.productos.push(aux);
            }
        }
        localStorage.setItem("carrito",JSON.stringify(carritoLS));
    }
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

function crearBarraBusqueda(){
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
                buscarProductos(valorBuscado.value);
                mostrarProductos();
            }
        });
        document.querySelector(".in-busqueda").addEventListener("keypress",(e)=>{
            if (e.key === 'Enter') {
                const valorBuscado = document.querySelector(".in-busqueda");
                if (valorBuscado){
                    buscarProductos(valorBuscado.value);
                    mostrarProductos();
                }
            }
        });
    },1);
    
}

function buscarProductos(valor){
    productosMostrados = productos.map(producto=>{
        if (producto.modelo.toLowerCase().includes(valor.toLowerCase())){
            return producto;
        }
    }).filter(el => el);
}

function crearFiltro(){
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

            buscarProductosFiltrados(categoriaSeleccionada, rangoPrecio, coloresSeleccionados);
            mostrarProductos();
        });
        filtroForm.appendChild(sendBTN);

}

function buscarProductosFiltrados(categoria, precio, colores){
    if (categoria) {
        productosMostrados = productos.map(producto=>{
            if (producto.categoria.includes(categoria.toLowerCase())){
                return producto;
            }
        }).filter(el => el);
    }
    productosMostrados = productosMostrados.map(producto=>{
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






document.addEventListener("DOMContentLoaded",()=>{
    iniciarCarrito();
    crearBarraBusqueda();
    crearFiltro();
    mostrarProductos();
});

window.addEventListener("resize",()=>crearFiltro());

