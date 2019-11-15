let articleunitCost = 0;
let articleCurrency = "";
let articleCount = 0;
let subtotal = 0;
let shippingPercentage = 0.15;
let total = 0;
let Credito = "";
let Transferencia = "";
let paymentTypeSelected = false;
const CREDIT_CARD_PAYMENT = "Tarjeta de crédito";
const BANKING_PAYMENT = "Transferencia bancaria";
const NOT_CREDIT_CARD_BANKING = "No ha seleccionado metodo de pago";
let ERROR_MSG = "Ha habido un error :(, verifica qué pasó.";

function updateTotalCosts() {
    let articlesubtotalHTML = document.getElementById("subtotalText");
    let comissionCostHTML = document.getElementById("comissionText");
    let totalCostHTML = document.getElementById("totalCostText");

    let subtotalToShow = subtotal;
    let comissionToShow = Math.round(((shippingPercentage * 100) * subtotal) / 100);
    let totalCostToShow = comissionToShow + subtotal;

    articlesubtotalHTML.innerHTML = articleCurrency + " " + subtotalToShow;
    comissionCostHTML.innerHTML = articleCurrency + " " + comissionToShow;
    totalCostHTML.innerHTML = articleCurrency + " " + totalCostToShow;

}

function updateSubtotal() {
    articleCount = document.getElementById("articleCountInput").value;
    subtotal = articleunitCost * articleCount;

    document.getElementById("subtotalText").innerHTML = subtotal;
    document.getElementById("subtotal").innerHTML = subtotal;

}
function showPaymentTypeNotSelected() {
    var Credito = document.getElementById("creditCardPaymentRadio").checked;
    var Transferencia = document.getElementById("bankingRadio").checked;

    if (Credito) {
        document.getElementById("bankAccountNumber").setAttribute("disabled", true);

        document.getElementById("creditCardNumber").removeAttribute("disabled");
        document.getElementById("creditCardSecurityCode").removeAttribute("disabled");
        document.getElementById("dueDate").removeAttribute("disabled");
    } else if (Transferencia) {
        document.getElementById("creditCardNumber").setAttribute("disabled", true);
        document.getElementById("creditCardSecurityCode").setAttribute("disabled", true);
        document.getElementById("dueDate").setAttribute("disabled", true);

        document.getElementById("bankAccountNumber").removeAttribute("disabled");
    }
}

function showArticles(articles) {
    let htmlContentToAppend = `<form id="form1">
    <div class="divTable">
        <div class="headRow">
            <div class="divCell">Imagen</div>
            <div class="divCell">Nombre</div>
            <div class="divCell">Costo</div>
            <div class="divCell">Cantidad</div>
            <div class="divCell">Subtotal</div>
        </div></br>`;
    for (let i = 0; i < articles.length; i++) {
        let article = articles[i];


        htmlContentToAppend += `
        <div class="divRow">
            <div class="divCell"><img src="` + article.src + `" alt="` + article.name + `" class="img-width="60" height="70" img-"center"></div>
            <div class="divCell"><p class="mb-1">`+ article.name + `</p></div>
            <div class="divCell"><p class="mb-1" id="articleCostInput">` + article.currency + " " + article.unitCost + `</p></div>
            <div class="divCell">
                <input type="number" id="articleCountInput" onclick="updateSubtotal()" value="`+ article.count + `" min="1">
            </div>
            <div class="divCell">
                <p  class="mb-1">`+ article.currency + " " + `<a id=subtotal></a></p>
            </div>
        </div>`

    }

    htmlContentToAppend += `</div>
                            </form>`;

    document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;

    updateSubtotal();
}

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            showArticles(resultObj.data.articles);
            articleunitCost = resultObj.data.articles[0].unitCost;
            articleCurrency = resultObj.data.articles[0].currency;
            updateSubtotal();
            updateTotalCosts();
        }

        document.getElementById("articleCostInput").addEventListener("change", function () {
            subtotal = this.value;
            updateSubtotal();
            updateTotalCosts();
        });

        document.getElementById("premiumradio").addEventListener("change", function () {
            shippingPercentage = 0.15;
            updateTotalCosts();
        });

        document.getElementById("expressradio").addEventListener("change", function () {
            shippingPercentage = 0.07;
            updateTotalCosts();
        });

        document.getElementById("standardradio").addEventListener("change", function () {
            shippingPercentage = 0.05;
            updateTotalCosts();
        });
    });

    document.getElementById("creditCardPaymentRadio").addEventListener("change", function () {
        showPaymentTypeNotSelected();
    });

    document.getElementById("bankingRadio").addEventListener("change", function () {
        showPaymentTypeNotSelected();
    });

    document.getElementById("buyBtn").addEventListener("click", function(){
       var street = document.getElementById("streetName").value;
       var pais = document.getElementById("Pais").value;
       var calle = document.getElementById("calleNombre").value;
       var numero = document.getElementById("Npuerta").value;

    if(street === ""){
           alert("Debes ingresar la calle de envío");
       }
   if(pais === ""){
        alert("Debes ingresar pais de envío");
    }
    if(calle === ""){
        alert("Debes ingresar la esquina de envío");
    }
    if(numero === ""){
        alert("Debes ingresar el numeo de puerta");
    }

    });
    document.getElementById("creditCardPaymentRadio").addEventListener("click", function () {
      document.getElementById ("pago").innerHTML = CREDIT_CARD_PAYMENT;   
    });

    document.getElementById("bankingRadio").addEventListener("click", function () {
        document.getElementById ("pago").innerHTML = BANKING_PAYMENT;
    });
    document.getElementById("Metododepago").addEventListener("click", function () {
        document.getElementById ("pago").innerHTML = NOT_CREDIT_CARD_BANKING;
    });
});

