function login(){
    let email = document.getElementById("correo").value;
    let pw = document.getElementById("clave").value;


    if (email === ""){
        alert("Falta ingresar datos!")
        document.getElementById('error').style.display = 'block';
    }

    else if (pw === ""){
        alert("Falta ingresar datos!")
        document.getElementById('error2').style.display = 'block';
    }
    else {
        localStorage.setItem("email",email);
        alert("Sesión iniciada correctamente");  
        location.href = 'index.html';
        
    }  

}

document.addEventListener('DOMContentLoaded',()=>{
    document.getElementById('entrar').addEventListener("click",()=>{
        login();
    })
});