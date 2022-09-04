const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

document.addEventListener('DOMContentLoaded', ()=>{
  
  let email = localStorage.getItem('email')
  
  if(email == null){
    Swal.fire({
      title: 'Bienvenido!',
      text: 'Por favor, iniciar sesión para continuar',
      confirmButtonColor: '#3085d6',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }})
    .then((result) => {
      if (result.isConfirmed) {
        location.href = 'login.html';
      };
    });
  }
  else{
    document.getElementById('cerrar').style.display = 'block';
    document.getElementById('usuario').innerHTML = email;
  }

  document.getElementById("cerrar").addEventListener("click",()=>{
    Swal.fire({
      icon: 'success',
      title: 'Sesión cerrada con éxito!',
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
        localStorage.removeItem('email');
      };
    });    
  });
});