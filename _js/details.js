let API_buscar = 'http://www.themealdb.com/api/json/v1/1/lookup.php?i=';

addEventListener('load', function () {
    loadItem();
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


const listar = async () => {

    let data = await getAPI(API_buscar);
    let html = document.getElementById('infos');
    console.log(data);



    let container = document.createElement('div');
    container.classList.add('container');

    let nome = document.createElement('h2');
    nome.classList.add('name');
    nome.textContent = data.meals[0].strMeal;

    let containerInfos = document.createElement('div');
    containerInfos.classList.add('containerInfos');

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

    container.appendChild(nome);
    container.appendChild(containerInfos);
    container.appendChild(containerPreparo);

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


