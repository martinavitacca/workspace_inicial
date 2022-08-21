function login(){
    let email = document.getElementById("correo").value;
    let pw = document.getElementById("clave").value;


    if (email === ""){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Parece que falta completar datos!',
            confirmButtonColor: '#3085d6'
        });
        document.getElementById('error').style.display = 'block';
    }
    else if (pw === ""){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Parece que falta completar datos!',
            confirmButtonColor: '#3085d6'
        });
        document.getElementById('error2').style.display = 'block';
    }
    else {
        Swal.fire({
            title: 'Confirmando su identidad, espere un momento por favor...',
            confirmButtonColor: '#3085d6'})
        .then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                title: 'Sesión iniciada correctamente',
                icon: 'success',
                confirmButtonColor: '#3085d6'})
            .then( ()=> {
                localStorage.setItem('email',email);
                location.href = 'index.html';
                });
            }
        });
    }
}
    
document.addEventListener('DOMContentLoaded',()=>{
    document.getElementById('entrar').addEventListener("click",()=>{
        login();       
    });
});