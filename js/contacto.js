const $ = el => document.querySelector(el);
const $sendBTN = $(".send-btn");
const $getName = $("#GET-name");
const $getEmail = $("#GET-email");
const $getMessage = $("#GET-message");

$sendBTN.addEventListener("click", (e)=> {
    e.preventDefault();
    if (!$getName.value) {
        $getName.style.border = "1px solid red";
    } else if (!$getEmail.value) {
        $getName.style.border = "1px solid #696969";
        $getEmail.style.border = "1px solid red";
    } else if (!$getMessage.value) {
        $getName.style.border = "1px solid #696969";
        $getEmail.style.border = "1px solid #696969";
        $getMessage.style.border = "1px solid red";
    } else {
        $getName.style.border = "1px solid #696969";
        $getEmail.style.border = "1px solid #696969";
        $getMessage.style.border = "1px solid #696969";
        crearPopUp();
        $getName.value = "";
        $getEmail.value = "";
        $getMessage.value = "";
    }
});

const crearPopUp = () =>{
    const popup = new Popup({
        id: "popup-contacto",
        title: "",
        content: `El mensaje fue enviado con exito.`,
        sideMargin: ".5em",
        fontSizeMultiplier: "1",
        backgroundColor: "#f4f4f4",
        borderWidth: ".2em",
        borderColor: "#753595",
        titleColor: "#753595",
        textColor: "#3d3d3d",
        allowClose: false,
        css: `
        .popup.popup-contacto .popup-title {
            display: none;
        }
        .popup.popup-contacto .popup-body {
            margin-top: 10px;
        }`,
    });
    popup.show();
    setTimeout(() => {
        popup.hide();
    }, 2000);
}