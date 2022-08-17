function login(){
    let email = document.getElementById("correo").value;
    let pw = document.getElementById("clave").value;


    if (email === "" || pw === ""){
        alert("Falta ingresar datos");       
    }
    else {
        localStorage.setItem("email",email);
        alert("Ha iniciado sesión correctamente");    
        location.href = 'index.html';
    }  

}

document.addEventListener('DOMContentLoaded',()=>{
    document.getElementById('entrar').addEventListener("click",()=>{
        login();
    })
})