
let carritoUser = []; //se vuelca la data del json
let addArticulos = []; //array creada para mostrar lo que está dentro del carrito local

function showCartItems(array) {
    
    let mostrarCarritoEnHtml = ""

    for(let i = 0; i < array.length; i++){

        let articles = array[i];

        mostrarCarritoEnHtml += `
        <th scope="row">
          <div class="d-flex align-items-center">
                <img src="${articles.image}" class="img-fluid rounded-3" style="width: 120px;">
                <div class="flex-column ms-4">
                    <p class="mb-2">${articles.name}</p>
                </div>
            </div>
        </th>
        <td class="align-middle">
          <p class="mb-0" style="font-weight: 500;">${articles.currency} ${articles.unitCost}</p>
        </td>
        <td class="align-middle">
            <div class="d-flex flex-row">
                <button class="btn btn-link px-2" onclick="this.parentNode.querySelector('input[type=number]').stepDown(),subTotal(${articles.unitCost},${articles.id})">       
                    <i class="fas fa-minus"></i>
                </button>
                
                <input id="cantidad${articles.id}" onchange="subTotal(${articles.unitCost},${articles.id})" min="0" name="quantity" value="${articles.count}" type="number" 
                class="form-control form-control-sm" style="width: 50px;" /> 
                
                <button class="btn btn-link px-2" onclick="this.parentNode.querySelector('input[type=number]').stepUp(),subTotal(${articles.unitCost},${articles.id})">       
                    <i class="fas fa-plus"></i>
                </button>    
            </div>
        </td>
        <td class="align-middle">
            <p class="mb-0" style="font-weight: 500;">${articles.currency} 
                <span id="total${articles.id}">${articles.unitCost}</span>
            </p>
            <button type="button" class="btn btn-outline-danger btn-sm" id="delete">
                <i class="fas fa-trash-alt"></i>
            </button>
        </td>
        <tr>`
    }

    document.getElementById('articulos').innerHTML = mostrarCarritoEnHtml;

}


//id del articulo pasa como parametro para que los ids de input y total no tengan el mismo nombre al agregar nuevos articulos
//se llama la función con el evento onchange dentro del input

function subTotal(cost,id) {
    
    let cant = document.getElementById('cantidad' + id).value;
    
    return document.getElementById('total' + id).innerHTML = cost * cant;
}



document.addEventListener('DOMContentLoaded', () =>{
    getJSONData(CART_INFO_URL + "25801" + EXT_TYPE).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            carritoUser = resultObj.data.articles[0]; //posición del objeto dentro del array del json

        }
        
        let carrito = localStorage.getItem('carrito');

        if (carrito != null){ 
            addArticulos = JSON.parse(localStorage.getItem('carrito')); //array toma el objeto dentro del carrito
            addArticulos.push(carritoUser); //se agrega el "objeto" del json al array
            showCartItems(addArticulos); //se muestra la función con el array como parametro
        }else{
            addArticulos.push(carritoUser);
            showCartItems(addArticulos);  
        }
        
    });

});


