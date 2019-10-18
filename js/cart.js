let articleunitCost = 0;
let articleCurrency = "";
let articleCount =0;
let subtotal = 0;
let shippingPercentage = 0.15;
let total = 0;
let paymentTypeSelected = false;
const CREDIT_CARD_PAYMENT = "Tarjeta de crédito";
const BANKING_PAYMENT = "Transferencia bancaria";
let ERROR_MSG = "Ha habido un error :(, verifica qué pasó.";

//Función que se utiliza para actualizar los costos de publicación
function updateTotalCosts(){
    
}

function updateSubtotal(){
    articleCount =  document.getElementById("articleCountInput").value;
    var subtotal = articleunitCost*articleCount;

    document.getElementById("subtotal").innerHTML = subtotal;

}

function showArticles(articles){
    let htmlContentToAppend=`<form id="form1">
    <div class="divTable">
        <div class="headRow">
            <div class="divCell">Imagen</div>
            <div class="divCell">Nombre</div>
            <div class="divCell">Costo</div>
            <div class="divCell">Cantidad</div>
            <div class="divCell">Subtotal</div>
        </div></br>`;
    for(let i = 0; i < articles.length; i++){
        let article = articles[i];
        

        htmlContentToAppend += `
        <div class="divRow">
            <div class="divCell"><img src="` + article.src + `" alt="` + article.name + `" class="img-width="60" height="70" img-"center"></div>
            <div class="divCell"><p class="mb-1">`+ article.name +`</p></div>
            <div class="divCell"><p class="mb-1" id="articleCostInput">` + article.currency +" "+ article.unitCost +  `</p></div>
            <div class="divCell">
                <input type="number" id="articleCountInput" onclick="updateSubtotal()" value="" min="0"  >
            </div>
            <div class="divCell">
                <p  class="mb-1">`+ article.currency +` <a id=subtotal></a></p>
            </div>
        </div>`

        }

        htmlContentToAppend += `</div>
                            </form>`;
    
        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
    }


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            showArticles(resultObj.data.articles)
          articleunitCost=resultObj.data.articles[0].unitCost;
        

        }
    });
});

//document.addEventListener("DOMContentLoaded", function(e){
  //  document.getElementById("articleCountInput").addEventListener("change", function(){
    //    articleCount = this.value;
      //  updateSubtotal();
    //});
//});
