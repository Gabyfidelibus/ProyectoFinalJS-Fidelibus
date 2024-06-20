// guarda en el local storage el tipo de moneda (peso o dolar) y se inicia con pesos si no esta establecido
function iniciarMoneda(){
    if (!localStorage.getItem("moneda")) {
        localStorage.setItem("moneda",JSON.stringify({"tipo":"peso","cambio":1}));
    }
}

// inicia el carrito con un array vacio
function iniciarCarrito() {
    if (!localStorage.getItem("carrito")) {
        localStorage.setItem("carrito",JSON.stringify({"productos":[]}));
    }
}

// crea el header para todas las paginas
function mostrarHeader(){
    const $header = document.querySelector("header");
    // la barra de navegacion esta hecha con bootstrap
    $header.innerHTML = `
        <nav class="navbar navbar-expand-lg navbar-light">
            <div class="container-fluid">
                <div class="home-menu">
                    <a class="navbar-brand" href="./index.html">
                        <img src="./img/istore-logo.png" alt="iStore logo">
                    </a>
                    <a class="navbar-apple" href="https://www.apple.com" target="_blank">
                        <img src="./img/premium-reseller.png" alt="Apple premium reseller">
                    </a>
                </div>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="collapsibleNavbar">
                    <ul class="navbar-nav">
                        <li class="nav-item"><form class="select-moneda"></form></li>
                        <li class="nav-item"><a class="nav-link" href="./productos.html">Productos</a></li>
                        <li class="nav-item"><a class="nav-link" href="./carrito.html">Carrito</a></li>
                        <li class="nav-item"><a class="nav-link" href="./contacto.html">Contacto</a></li>
                    </ul>
                </div>
            </div>
        </nav>`;
    // creo un checkbox para el cambio de moneda entre peso y dolar
    const $moneda = document.querySelector(".select-moneda");
    let moneda = JSON.parse(localStorage.getItem("moneda"));
    $moneda.innerHTML = `
        <label>
            <input type="checkbox" name="moneda" value="${moneda.tipo}">
            <span class="cbox-moneda" id="input-moneda">${(moneda.tipo === 'peso') ? 'AR$' : 'U$S'}</span>
        </label>`;
    // creo un evento para que se cambie el valor de peso a dolar (o viceversa) cuando lo clickeo
    $moneda.addEventListener("mousedown",()=>{
        const $valorMoneda = $moneda.querySelector("input");
        $valorMoneda.value = ($valorMoneda.value === 'peso') ? 'dolar' : 'peso';
        moneda.tipo = $valorMoneda.value;
        $moneda.querySelector(".cbox-moneda").innerText = (moneda.tipo === 'peso') ? 'AR$' : 'U$S';
        localStorage.setItem("moneda",JSON.stringify({"tipo":moneda.tipo,"cambio":(moneda.tipo === 'peso')?1:1280}));
        // recargo la pagina para actualizar los valores en la nueva moneda
        location.reload();
    });
}

// creo el footer para todas las paginas
function mostrarFooter(){
    const footer = document.querySelector("footer");
    footer.innerHTML = `
        <div class="social-networks">
            <a target="_blank" href="https://www.instagram.com/"><iconify-icon icon="skill-icons:instagram" width="32" height="32"></iconify-icon></a>
            <a target="_blank" href="https://twitter.com/"><iconify-icon icon="logos:twitter" width="32" height="32"></iconify-icon></a>
            <a target="_blank" href="https://www.facebook.com/"><iconify-icon icon="logos:facebook" width="32" height="32"></iconify-icon></a>
            <a target="_blank" href="https://ar.pinterest.com/"><iconify-icon icon="logos:pinterest" width="32" height="32"></iconify-icon></a>
        </div>
        <div class="page-content">
            <a href="./index.html">Inicio</a>
            <a href="./productos.html">Productos</a>
            <a href="./carrito.html">Carrito</a>
            <a href="./contacto.html">Contacto</a>
        </div>
        <p>© 2024 iStore, tienda no-oficial de Apple. All rights reserved.</p>`;
}

// llamo a las funciones una vez que carga el DOM
document.addEventListener("DOMContentLoaded",async ()=>{
    iniciarCarrito();
    await iniciarMoneda();
    mostrarHeader();
    mostrarFooter();
});