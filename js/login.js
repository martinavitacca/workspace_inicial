function login(){
    let email = document.getElementById("correo"); // variable que toma el id de correo
    let expression = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i; // variable de expresiones
    let result = true;


    if (expression.test(email.value)){ // testea las expresiones en el valor ingresado del input
      email.setCustomValidity('');
    }
    else {
      email.setCustomValidity(false); // devuelve la validación como false
      result = false;  
    }

    return result // retorna resultado
}
    

  document.getElementById('prueba').addEventListener("submit",e=>{

    let email = document.getElementById("correo").value; // variable que toma el valor del input

      if( !login() || !prueba.checkValidity() ){ // evalua si la función y el formulario no están validados 
        e.preventDefault();
        e.stopPropagation();
      }else{
        e.preventDefault();
        e.stopPropagation();
        localStorage.setItem('email',email); // guarda en el local el valor del input bajo el nombre de email
        
        Swal.fire({
            title: 'Sesión iniciada!',
            imageUrl: 'img/34097-at-hanatachi-sticker-8.gif',
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
              location.href = 'index.html'; // redirecciona al index
            };
        });         

      }
      prueba.classList.add('was-validated'); // se agrega la clase de bootstrap al formulario     
});


document.addEventListener('DOMContentLoaded',()=>{
  
  // evento que hace que se ejecute la función de validar el email
  document.getElementById('correo').addEventListener('input',()=>{
    login();
  });

});