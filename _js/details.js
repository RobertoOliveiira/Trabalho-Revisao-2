let API_buscar = 'http://www.themealdb.com/api/json/v1/1/lookup.php?i=';
let favorite = []

addEventListener('load', function () {  
    loadItem();
    favorite = localStorage.getItem('favorite')||[];

});



const loadItem = async () => {
    let id = localStorage.getItem('id');
    API_buscar += id;
    listar();
}
const surprise = async () =>{
    let data = await getAPI('http://www.themealdb.com/api/json/v1/1/random.php');
    localStorage.setItem('id', data.meals[0].idMeal);
    window.location.href = "details.html";
}

const getAPI = async (url) => {
    //console.log(url)
    var myHeader = new Headers({
        'Access-Control-Allow-Origin': '*'
    });

    const resp = await fetch(url, { myHeader });

    const data = await resp.json();
    return data;
}

const favoritar = (id , a) =>{
    let lista = JSON.parse(localStorage.getItem('favorite')|| '[]');
    lista.push(id);
    localStorage.setItem('favorite',JSON.stringify(lista));
    a.setAttribute('src', '_img/like.png');
    a.setAttribute('onclick', `desfavoritar(${id},this)`);
    console.log('favoritar');
}

const desfavoritar = (id, a) =>{
    let lista = JSON.parse(localStorage.getItem('favorite')|| '[]');
    let aux = lista.findIndex((a) => a == id );
    lista.splice(aux, 1);
    localStorage.setItem('favorite',JSON.stringify(lista));
    a.setAttribute('src', '_img/not-like.png');
    a.setAttribute('onclick', `favoritar(${id},this)`);
    console.log('desfavoritar');
}


const listar = async () => {

    let data = await getAPI(API_buscar);
    let html = document.getElementById('infos');
    console.log(data);



    let container = document.createElement('div');
    container.classList.add('containerInf');

    let favorito = document.createElement('div');
    favorito.classList.add('favorito');
    let coracao = favorite.includes(data.meals[0].idMeal) ? `<div class="fav"><img onclick="desfavoritar('${data.meals[0].idMeal}', this)" src='_img/like.png'/></div>` : `<div class="fav"><img onclick="favoritar('${data.meals[0].idMeal}', this)"  src='_img/not-like.png'/> </div>`
    favorito.innerHTML = coracao

    let nome = document.createElement('h2');
    nome.classList.add('name');
    nome.textContent = data.meals[0].strMeal;

    let containerInfos = document.createElement('div');
    containerInfos.classList.add('container','containerInfos');

    let containerImg = document.createElement('div');
    containerImg.classList.add('img');
    let img = `<img class="card-img-top" src="${data.meals[0].strMealThumb}" alt="${data.meals[0].strMeal}">`
    containerImg.innerHTML = img;

    let containerIngredientes = document.createElement('div');
    containerIngredientes.classList.add('containerIng');
    let ingTitle = document.createElement('h3');
    ingTitle.textContent = 'Ingredientes';
    let ingList = document.createElement('div');
    let ingredientes = '';
    ingredientes = verificaIngredientes(data);

    let containerVideo = document.createElement('div');
    containerVideo.classList.add('containerVideo');
    let video = `<iframe width="1100" height="600" src="https://www.youtube.com/embed/${data.meals[0].strYoutube.split('=')[1]}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`

    containerVideo.innerHTML = video;

    ingList.innerHTML = ingredientes;

    let containerPreparo = document.createElement('div');
    containerPreparo.classList.add('containerPreparo');
    let preparoTitle = document.createElement('h3');
    preparoTitle.textContent = 'Preparo';
    let preparoList = document.createElement('p');
    preparoList.textContent = data.meals[0].strInstructions;

    containerPreparo.appendChild(preparoTitle);
    containerPreparo.appendChild(preparoList);

    containerIngredientes.appendChild(ingTitle);
    containerIngredientes.appendChild(ingList);

    containerInfos.appendChild(containerImg);
    containerInfos.appendChild(containerIngredientes);

    container.appendChild(favorito);
    container.appendChild(nome);
    container.appendChild(containerInfos);
    container.appendChild(containerPreparo);
    container.appendChild(containerVideo);

    html.appendChild(container);

}

const verificaIngredientes = (data) => {
    let ing = '';
    for (let i = 1; i <= 20; i++) {
        if (data.meals[0][`strMeasure${i}`] != "") {
            ing += `<p>${data.meals[0][`strMeasure${i}`]} ${data.meals[0][`strIngredient${i}`]} </p>`
        }
    }
return ing
}


