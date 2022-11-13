let infoUser = {}; // objeto para guardar los datos en el local


// función para guardar los datos en el local
function savingData() {

    infoUser.name = document.getElementById('nombre').value;
    infoUser.name2 = document.getElementById('nombre2').value;
    infoUser.lastname = document.getElementById('apellido').value;
    infoUser.lastname2 = document.getElementById('apellido2').value;
    infoUser.cellular = document.getElementById('celular').value;
    infoUser.image = document.getElementById('imagenUser').src;

    localStorage.setItem('user', JSON.stringify(infoUser));
}


// función para mostrar en el html lo gruardado en el local
function showSavedData() {

    let user = JSON.parse(localStorage.getItem('user'));

    if (user != null){
        document.getElementById('nombre').value = user.name;
        document.getElementById('nombre2').value = user.name2;
        document.getElementById('apellido').value = user.lastname;
        document.getElementById('apellido2').value = user.lastname2;
        document.getElementById('celular').value = user.cellular;
        document.getElementById('imagenUser').src = user.image;
    }
    else{
        document.getElementById('imagenUser').src = "img/user.png"; // muestra la imagen predeterminada
    }

}



document.getElementById('perfilFormulario').addEventListener('submit', event=>{
    
    // si no está validado el formulario, evita que se recargue la página
    if(!perfilFormulario.checkValidity()){
        event.preventDefault();
        event.stopPropagation();
    }
    else{
        event.preventDefault();
        event.stopPropagation();
        
        savingData(); // guarda los datos en el local
        
        Swal.fire({
            title: 'Se han guarado los cambios!',
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
    document.body.classList.add('was-validated'); // agrega la clase de bootstrap de validación
    
});




document.addEventListener('DOMContentLoaded',()=>{

    showSavedData(); // muestra los datos guardados

    let email = localStorage.getItem('email'); // variable que toma los guardado dentro de email
    
    document.getElementById('username').innerHTML = email.split('@')[0]; // muestra el nombre de usuario en el html
    document.getElementById('correo').value = email; // muestra el email del local en el input

    document.getElementById('cambioImagen').addEventListener('change', ()=>{

        let imagenPerfil = document.getElementById('imagenUser'); // variable que toma la imagen del usuario
        let cargaImagen = document.getElementById('cambioImagen').files[0]; // variable que toma la imagen a cargar
        let fileReader = new FileReader();

        if(cargaImagen){
            fileReader.readAsDataURL(cargaImagen);
        }
        else{
            imagenPerfil.src = "img/user.png";
        }

        fileReader.addEventListener('load',()=>{
            imagenPerfil.src = fileReader.result;
        });

    });
});