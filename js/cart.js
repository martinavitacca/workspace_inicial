
let carritoUser = []; // se vuelca la data del json
let addArticulos = []; // array creada para mostrar lo que está dentro del carrito local

let deliveryPorcentage = document.getElementsByName('envio'); // variable que toma los radio button por nombre

let borro = document.getElementsByClassName('borrar'); // variable que declara todo lo que este con class Name


function showCartItems(array) {
    
    let mostrarCarritoEnHtml = "";

    for(let i = 0; i < array.length; i++){

        let articles = array[i];

        // toma todas las currency que son UYU y los pasa a dolares
        if(articles.currency === "UYU"){
            articles.unitCost = Math.round(articles.unitCost / 40);
            articles.currency = "USD";
        }

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
                <button class="btn btn-link px-2" onclick="this.parentNode.querySelector('input[type=number]').stepDown(),subTotal(addArticulos[${i}],${i}),subTotalCarrito()">       
                    <i class="fas fa-minus"></i>
                </button>
                
                <input id="cantidad${i}" onchange="subTotal(addArticulos[${i}],${i}),subTotalCarrito()" min="1" value="1" type="number" 
                class="form-control form-control-sm" style="width: 50px;" /> 
                
                <button class="btn btn-link px-2" onclick="this.parentNode.querySelector('input[type=number]').stepUp(),subTotal(addArticulos[${i}],${i}),subTotalCarrito()">       
                    <i class="fas fa-plus"></i>
                </button>    
            </div>
        </td>
        <td class="align-middle">
            <p class="mb-0" style="font-weight: 500;">USD 
                <span class="price" id="total${i}">${articles.unitCost}</span>
            </p>
            <button type="button" class="btn btn-outline-danger btn-sm borrar">
                <i class="fas fa-trash-alt"></i>
            </button>
        </td>
        <tr>`
    }

    document.getElementById('articulos').innerHTML = mostrarCarritoEnHtml;

    // recorre la lista de inputs y elimina con la posicion
    for (let i = 0; i < borro.length; i++){
        borro[i].addEventListener('click',()=>{
            eliminar(i);
        });
       
    }

}


// función que hace el subtotal de la compra
function subTotalCarrito() {

    let precio = document.getElementsByClassName('price');

    let valor = 0;

    for(a = 0; a < precio.length; a++){
        valor += parseFloat(precio[a].innerHTML);
    }

    document.getElementById('subtotalArticulos').innerHTML = valor;

    
    // calculo del porcentaje del envio del subtotal de la compra
    let costForDelivery = 0;

    for(b = 0; b < deliveryPorcentage.length; b++){
        if(deliveryPorcentage[b].checked){
            costForDelivery = parseFloat(deliveryPorcentage[b].value) * valor;
        }
    }

    document.getElementById('costoEnvio').innerHTML = Math.round(costForDelivery);

    // calculo del total de la compra
    let subTotal = parseFloat(document.getElementById('subtotalArticulos').innerHTML);
    
    let totalEnvio = parseFloat(document.getElementById('costoEnvio').innerHTML);

    total = subTotal + totalEnvio;

    document.getElementById('totalAPagar').innerHTML = total;

}


// función que calcula el subtotal por articulo
function subTotal(array,i) {
    
    let cant = document.getElementById('cantidad' + i).value;
    let cost = array.unitCost;

    result = cant * cost;
    
    document.getElementById('total' + i).innerHTML = result;
}


// funcion que elimina del local la posición del articulo
function eliminar(i){
    addArticulos.splice(i,1);
    localStorage.setItem('carrito',JSON.stringify(addArticulos));
    showCartItems(JSON.parse(localStorage.getItem('carrito')));
    subTotalCarrito();
}


// funcion que deshabilita los inputs de la tarjeta de credito o de la transferencia bancaria
function disable() {
    
    // variable que iguala al input tipo radio de la tarjeta
    let card = document.getElementById('creditCard'); 
    
    // variable que iguala al input radio de la transferencia
    let bank = document.getElementById('bankTransfer');
    
    // si input de transerencia está chequeado
    if(bank.checked === true){
        document.getElementById('cardName').disabled = true;
        document.getElementById('cardNumber').disabled = true;
        document.getElementById('cardExpire').disabled = true;
        document.getElementById('cardSecurity').disabled = true;
        document.getElementById('bankAccount').disabled = false;
        document.getElementById('staticBackdropLabel').value = bank.value; 
        // se iguala el value del título de la modal con el value del id del input radio de Transferencia Bancaria
        
    }

    // si input de tarjeta de credito está chequeado
    else if(card.checked === true){
        document.getElementById('bankAccount').disabled = true;
        document.getElementById('cardName').disabled = false;
        document.getElementById('cardNumber').disabled = false;
        document.getElementById('cardExpire').disabled = false;
        document.getElementById('cardSecurity').disabled = false;
        document.getElementById('staticBackdropLabel').value = card.value; 
        // se iguala el value del titulo de la modal con el value del id del input radio de Tarjeta de Crédito
    }

}



document.addEventListener('DOMContentLoaded', () =>{
    getJSONData(CART_INFO_URL + "25801" + EXT_TYPE).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            carritoUser = resultObj.data.articles[0]; // posición del primer objeto dentro del array del json

        }
        
        let carrito = localStorage.getItem('carrito');

        if (carrito != null){ 
            addArticulos = JSON.parse(localStorage.getItem('carrito')); // array toma el objeto dentro del carrito
            showCartItems(addArticulos); // se muestra la función con el array como parametro
            subTotalCarrito();
        }else{
            addArticulos.push(carritoUser); // pushea el array donde se vuelca el json dentro del nuevo array
            localStorage.setItem('carrito',JSON.stringify(addArticulos)); // se setea de nuevo el local
            showCartItems(addArticulos); // se muestra la función con el array como parametro
            subTotalCarrito();
        }
        
    });

    // toma la posición del radio button y ejecuta la función con un evento
    for(let i = 0; i < deliveryPorcentage.length; i++){
        deliveryPorcentage[i].addEventListener('click', ()=>{
            subTotalCarrito();
        });
    }

    // evento que ejecuta la funcion
    document.getElementById('creditCard').addEventListener('click',()=>{
        disable()
    });
    
    // evento que ejecuta la funcion
    document.getElementById('bankTransfer').addEventListener('click',()=>{
        disable()
    });


    // variable que toma el id del form donde empieza la Modal
    let validatedPayment = document.getElementById('validacionPago');

    // variable que toma el id del submit button de la Modal
    let successfulPayment = document.getElementById('save');

    successfulPayment.addEventListener('click',(e)=>{
        if (validatedPayment.checkValidity(e)){ 
            e.preventDefault();
            e.stopPropagation();
            
            // iguala el value del input de Sleccionar método de pago y lo iguala al value del título de la Modal 
            // value de título de Modal fué cambiado dentro de la función disable()
            document.getElementById('newPayment').value = document.getElementById('staticBackdropLabel').value;
            
            Swal.fire({
                title: 'Método de pago ingresado correctamente',
                imageUrl: 'img/88860-success-animation.gif',
                imageWidth: 200,
                imageHeigth: 100,
                confirmButtonColor: '#3085d6', 
                showClass: {
                  popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                  popup: 'animate__animated animate__fadeOutUp'
                }
            });
        }


        // evento del botón de Finalizar Compra
        document.getElementById('compraste').addEventListener('click',(e)=>{
            e.preventDefault();
            e.stopPropagation();

            Swal.fire({
                title: 'Muchas gracias por comprar!',
                imageUrl: 'img/34134-mafumafu-cat-at-cocopry-sticker-0.gif',
                imageWidth: 200,
                imageHeigth: 100,
                confirmButtonColor: '#3085d6', 
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }})
            .then((result) => {
                if (result.isConfirmed) {
                    location.href = 'index.html';
                };
            });
        
        });
    });
    
});



// Función para validación de Bootstrap NO TOCAR QUE SINO NO FUNCIONA LA VALIDACIÓN
(function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
  
          form.classList.add('was-validated')
        }, false)
      })
  })()


