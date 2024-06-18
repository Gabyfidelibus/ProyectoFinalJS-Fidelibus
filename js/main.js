function iniciarMoneda(){
    if (!localStorage.getItem("moneda")) {
        localStorage.setItem("moneda",JSON.stringify({"tipo":"peso","cambio":1}));
    }
}

function mostrarHeader(){

    const $header = document.querySelector("header");
    $header.innerHTML = `
        <nav class="navbar navbar-expand-lg navbar-light">
            <div class="container-fluid">
                <!-- Logo de la pagina con un link al index y a la pagina de apple -->
                <div class="home-menu">
                    <a class="navbar-brand" href="./index.html">
                        <img src="./img/istore-logo.png" alt="iStore logo">
                    </a>
                    <a class="navbar-apple" href="https://www.apple.com" target="_blank">
                        <img src="./img/premium-reseller.png" alt="Apple premium reseller">
                    </a>
                </div>

                <!-- Boton del menu hamburguesa -->
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <!-- Lista de las paginas del sitio con su menu desplegable -->
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
    const $moneda = document.querySelector(".select-moneda");
    let moneda = JSON.parse(localStorage.getItem("moneda"));
    $moneda.innerHTML = `
        <label>
            <input type="checkbox" name="moneda" value="${moneda.tipo}">
            <span class="cbox-moneda" id="input-moneda">${(moneda.tipo === 'peso') ? 'AR$' : 'U$S'}</span>
        </label>`;
    $moneda.addEventListener("mousedown",()=>{
        const $valorMoneda = $moneda.querySelector("input");
        $valorMoneda.value = ($valorMoneda.value === 'peso') ? 'dolar' : 'peso';
        moneda.tipo = $valorMoneda.value;
        $moneda.querySelector(".cbox-moneda").innerText = (moneda.tipo === 'peso') ? 'AR$' : 'U$S';
        localStorage.setItem("moneda",JSON.stringify({"tipo":moneda.tipo,"cambio":(moneda.tipo === 'peso')?1:1280}));
        location.reload();

    });
}

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

document.addEventListener("DOMContentLoaded",async ()=>{
    await iniciarMoneda();
    mostrarHeader();
    mostrarFooter();
});