const PROD_ID = localStorage.getItem('ProductID');

let infoProducts = [];
let comments = [];

function showProductInfo (array){

    cargarInfoEnHtml = `
        <div class="row r1">
            <div class="col-md-9 abc">
                <h1>${array.name}</h1>
                <h3>${array.currency} ${array.cost}</h3>
            </div>
            <div class="col-md-3 text-right pqr">
                <p>${array.soldCount} vendidos en la categoría ${array.category}</p>
            </div>
            <div>
                <p class="text-right para">${array.description}</p>
            </div>
        </div>
    `

    cargarImagenesEnHtml = `
        <div class="carousel-item active">
            <img src="${array.images[0]}" class="d-block w-100">
        </div>
        <div class="carousel-item">
            <img src="${array.images[1]}" class="d-block w-100">
        </div>
        <div class="carousel-item">
            <img src="${array.images[2]}" class="d-block w-100">
        </div>
        <div class="carousel-item">
            <img src="${array.images[3]}" class="d-block w-100">
        </div>
    `

    cargarProductoSimilarEnHtml = `
        <div class="card p-3 bg-white col-md-4">
            <div class="about-product text-center mt-2"><img src="${array.relatedProducts[0].image}" width="300">
                <div>
                    <h4>${array.relatedProducts[0].name}</h4>
                </div>
            </div>
        </div>
        <div class="card p-3 bg-white col-md-4">
            <div class="about-product text-center mt-2"><img src="${array.relatedProducts[1].image}" width="300">
                <div>
                    <h4>${array.relatedProducts[1].name}</h4>
                </div>
            </div>
        </div>
    `
    document.getElementById('contenedor').innerHTML = cargarInfoEnHtml;
    document.getElementById('imagenes').innerHTML = cargarImagenesEnHtml;
    document.getElementById('similares').innerHTML = cargarProductoSimilarEnHtml
}

function showComments (array){
    
    let cargarComentariosEnHtml = "";

    for(let i = 0; i < array.length; i++){ 

               
        let comment = array[i];


        cargarComentariosEnHtml += `
            <div class= "card p-3 bg-white col-md-4 w-auto h-auto">
                <div class="d-flex flex-start align-items-center">
                    <div class="user d-flex flex-row align-items-center">
                        <span><medium class="font-weight-bold text-primary">${comment.user}</medium><br> 
                        <p class="font-weight-bold">${comment.description}</p></span>
                    </div>
                </div>
                <div class="action d-flex justify-content-between mt-2 align-items-center">
                    ${comment.dateTime}
                </div>
                <div class="icons estrellas position-absolute bottom-0 end-0">
                  ${puntaje(comment.score)}
                </div>
            </div>
        `           
    }

    document.getElementById('comentarios').innerHTML = cargarComentariosEnHtml; 
}


function addComment(){
    let dateTime = new Date();
    let year = dateTime.getFullYear();
    let month = dateTime.getMonth() + 1;
    let day = dateTime.getDate();
    let hour = dateTime.getHours();
    let minute = dateTime.getMinutes();
    let second = dateTime.getSeconds();

    if(month < 10){
        month = '0' + month;
    }
    if(day < 10){
        day = '0' + day;
    }
    if(hour < 10){
        hour = '0' + hour; 
    }
    if(minute < 10){
        minute = '0' + minute; 
    }
    if(second < 10){
        second = '0' + second; 
    }

    let newComment = {};

    newComment.user = localStorage.getItem('email');
    newComment.description = document.getElementById('comente').value;
    newComment.dateTime = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    newComment.score = document.getElementById('puntos').value;

    comments.push(newComment);

    showComments(comments);

    document.getElementById('comente').value = "";
    document.getElementById('puntos').value = "";
}



function puntaje(array){
    let puntos = "";

    for(let i=1; i <= 5; i++){
        if(i <= array){
            puntos += `<i class="fas fa-star"></i>`;
        }
        else{
            puntos +=`<i class="far fa-star"></i>`;
        }
    }
    return puntos;
}

    
document.addEventListener('DOMContentLoaded', ()=>{
    getJSONData(PRODUCT_INFO_URL + PROD_ID + EXT_TYPE).then(function(resultObj){
        if (resultObj.status === "ok")
        {
           infoProducts = resultObj.data;
           showProductInfo(infoProducts);
        }
    });

    getJSONData(PRODUCT_INFO_COMMENTS_URL + PROD_ID  + EXT_TYPE).then(function(resultObj){
        if (resultObj.status === "ok")
        {
           comments = resultObj.data;
           showComments(comments);
        }
    });

    document.getElementById('send').addEventListener('click', ()=>{
        addComment()
    })
});