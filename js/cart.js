let productUnitCost = 0;
let productCurrency = "";
let productCount =0;
let subtotal = 0;
let shippingPercentage = 0.15;
let total = 0;
let paymentTypeSelected = false;
const CREDIT_CARD_PAYMENT = "Tarjeta de crédito";
const BANKING_PAYMENT = "Transferencia bancaria";
let ERROR_MSG = "Ha habido un error :(, verifica qué pasó.";

//Función que se utiliza para actualizar los costos de publicación
function updateTotalCosts(){
    let unitProductCostHTML = document.getElementById("productCostText");
    let productCountHTML = document.getElementById("CountText");
    let totalCostHTML = document.getElementById("totalCostText");

    let unitCostToShow = MONEY_SYMBOL + productCost;
    let countToShow = productCount
    let totalCostToShow = MONEY_SYMBOL + (productCost * productCount);

    unitProductCostHTML.innerHTML = unitCostToShow;
    ProductCountHTML.innerHTML = countToShow;
    totalCostHTML.innerHTML = totalCostToShow;
}

function updateSubtotal(){

}

function showPaymentTypeNotSelected(){

}

function hidePaymentTypeNotSelected(){

}

function showArticles(articles){
    let htmlContentToAppend="";
    for(let i = 0; i < articles.length; i++){
        let article = articles[i];
         
            htmlContentToAppend += `
            <a href="category-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + article.src + `" alt="` + article.name + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ article.name +`</h4>
                            <small class="text-muted" >` + article.count + ` artículos</small>
                        </div>
                        <p class="mb-1" >` + article.unitCost +" "+ article.currency +  `</p>
                 </div>
                </div>
            </a>
            `
        }
    
        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
    }


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            showArticles(resultObj.data.articles)
          
        }
    });
});