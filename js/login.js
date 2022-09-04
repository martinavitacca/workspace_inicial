function login(){
    let email = document.getElementById("correo").value;
    let pw = document.getElementById("clave").value;


    if (email === "" || pw === ""){
        Swal.fire({
            title: 'Por favor, completar ambos campos',
            confirmButtonColor: '#3085d6', 
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
        });
    }
    else {
        Swal.fire({
            title: 'Sesión iniciada correctamente',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }})
        .then((result) => {
            if (result.isConfirmed) {
                localStorage.setItem('email',email);
                location.href = 'index.html';
            };
        });         
           
    }
}
    
document.addEventListener('DOMContentLoaded',()=>{
    document.getElementById('entrar').addEventListener("click",()=>{
        login();       
    });
});