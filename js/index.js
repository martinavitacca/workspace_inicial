document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });

    let email = localStorage.getItem('email')

    if(email == null){
        
        Swal.fire({
            title: 'Debe iniciar sesión para poder continuar',
            confirmButtonColor: '#3085d6'})
        .then((result) => {
            if (result.isConfirmed) {
              location.href = 'login.html';
            }
        });
    }
    else{
        document.getElementById('cerrar').style.display = 'block'; 
    }

    document.getElementById("cerrar").addEventListener("click",()=>{
   
        Swal.fire({
            title: 'Sesión cerrada con éxito!',
            icon: 'success',
            confirmButtonColor: '#3085d6'})
        .then((result) => {
            if (result.isConfirmed) {
              location.href = 'login.html';
              localStorage.clear();
            }
        });        
    });
});


