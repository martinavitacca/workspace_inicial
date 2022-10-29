function login(){
    let email = document.getElementById("correo").value;
    let pw = document.getElementById("clave").value;


    if (email === "" || pw === ""){
        Swal.fire({
            title: 'Por favor, completar ambos campos',
            imageUrl: 'img/104423-warning-alert.gif',
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
    else {
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