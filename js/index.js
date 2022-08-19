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
        alert("Por favor, iniciar sesión para continuar");
        location.href = "login.html";
    }

    document.getElementById("cerrar").addEventListener("click",()=>{
        localStorage.clear();
        alert("Sesión cerrada!");
        window.location = "index.html";
    });

});


