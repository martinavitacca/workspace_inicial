const ID = localStorage.getItem('catID');
const FROM_CHEAP_TO_EXPENSIVE = "Less $";
const FROM_EXPENSIVE_TO_CHEAP = "More $";
const ORDER_PROD_SOLD = "Vendidos";

let productsArray = [];

let minCost = undefined
let maxCost = undefined
let range = undefined


function sortProducts(sort, array){
    let result = [];
    if (sort === FROM_CHEAP_TO_EXPENSIVE)
    {
        result = array.sort((a, b)=> a.cost - b.cost)

    }else if (sort === FROM_EXPENSIVE_TO_CHEAP){
        
        result = array.sort((a, b)=> b.cost - a.cost)

    }else if (sort === ORDER_PROD_SOLD){
        result = array.sort((a, b)=> b.soldCount - a.soldCount)
    }

    return result;
}

function showSortedProducts(sort){
        
    productsArray = sortProducts(sort, productsArray);

    showProductsList(productsArray);
}

function rangeOfPrices(){
    let minCost = document.getElementById('fromCostMin').value;
    let maxCost = document.getElementById('toCostMax').value;

    let range = productsArray.filter(products =>{
        return (products.cost >= minCost && products.cost <= maxCost)    
    });

    showProductsList(range);
}

function searchProdcuts() {
    
    let searching = document.getElementById('buscar').value;

    let found = productsArray.filter(products =>{
        return (products.name.toLowerCase().indexOf(searching.toLowerCase()) > -1) || (products.description.toLowerCase().indexOf(searching.toLowerCase()) > -1)

    });

    showProductsList(found);
}

function setProductID(id) {
    localStorage.setItem("ProductID", id);
    location.href = "product-info.html"
}

function showProductsList(array){
    
    let cargarDatosEnHtml = "";
    
    for(let i = 0; i < array.length; i++){ 
        
        let products = array[i];

        
            cargarDatosEnHtml += `
            <div onclick="setProductID(${products.id})" class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${products.image}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${products.name} - ${products.currency} ${products.cost}</h4>
                            <small class="text-muted">${products.soldCount} vendidos</small>
                        </div>
                        <p class="mb-1">${products.description}</p>
                    </div>
                </div>
            </div>
            `
        
        
        document.getElementById("productos").innerHTML = cargarDatosEnHtml;

    }
}

document.addEventListener("DOMContentLoaded", ()=>{
    
    getJSONData(PRODUCTS_URL + ID + EXT_TYPE).then(function(resultObj){
        if (resultObj.status === "ok")
        {
           productsArray = resultObj.data.products;
           showProductsList(productsArray);
           document.getElementById('nombre-categoria').innerHTML = resultObj.data.catName;
        }
    });

    document.getElementById('sortCheaper').addEventListener('click', ()=>{
        showSortedProducts(FROM_CHEAP_TO_EXPENSIVE);
    });

    document.getElementById('sortExpensive').addEventListener('click', ()=>{
        showSortedProducts(FROM_EXPENSIVE_TO_CHEAP);
    });

    document.getElementById('sortBySold').addEventListener('click', ()=>{
        showSortedProducts(ORDER_PROD_SOLD);
    });

    document.getElementById("filtrarCost").addEventListener("click", ()=>{      
        rangeOfPrices();
    });

    document.getElementById('clearFiltro').addEventListener("click", ()=>{
        document.getElementById('fromCostMin').value = "";
        document.getElementById('toCostMax').value = "";

        showProductsList(productsArray);
    });

    document.getElementById('buscar').addEventListener('keyup', ()=>{
        searchProdcuts();
    });
});