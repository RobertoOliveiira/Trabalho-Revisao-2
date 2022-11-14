let API_buscar = 'http://www.themealdb.com/api/json/v1/1/lookup.php?i=';

addEventListener('load', function () {
    loadItem();
});

const loadItem = async () => {
    let id = localStorage.getItem('id');
    API_buscar += id;
    listar();
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
    if (data.meals[0].strMeasure1 != "") {
        ing += `<p>${data.meals[0].strMeasure1} ${data.meals[0].strIngredient1} </p>`
    }
    if (data.meals[0].strMeasure2 != "") {
        ing += `<p>${data.meals[0].strMeasure2} ${data.meals[0].strIngredient2} </p>`
    }
    if (data.meals[0].strMeasure3 != "") {
        ing += `<p>${data.meals[0].strMeasure3} ${data.meals[0].strIngredient3} </p>`
    }
    if (data.meals[0].strMeasure4 != "") {
        ing += `<p>${data.meals[0].strMeasure4} ${data.meals[0].strIngredient4} </p>`
    }
    if (data.meals[0].strMeasure5 != "") {
        ing += `<p>${data.meals[0].strMeasure5} ${data.meals[0].strIngredient5} </p>`
    }
    if (data.meals[0].strMeasure6 != "") {
        ing += `<p>${data.meals[0].strMeasure6} ${data.meals[0].strIngredient6} </p>`
    }
    if (data.meals[0].strMeasure7 != "") {
        ing += `<p>${data.meals[0].strMeasure7} ${data.meals[0].strIngredient7} </p>`
    }
    if (data.meals[0].strMeasure8 != "") {
        ing += `<p>${data.meals[0].strMeasure8} ${data.meals[0].strIngredient8} </p>`
    }
    if (data.meals[0].strMeasure9 != "") {
        ing += `<p>${data.meals[0].strMeasure9} ${data.meals[0].strIngredient9} </p>`
    }
    if (data.meals[0].strMeasure10 != "") {
        ing += `<p>${data.meals[0].strMeasure10} ${data.meals[0].strIngredient10} </p>`
    }
    if (data.meals[0].strMeasure11 != "") {
        ing += `<p>${data.meals[0].strMeasure11} ${data.meals[0].strIngredient11} </p>`
    }
    if (data.meals[0].strMeasure12 != "") {
        ing += `<p>${data.meals[0].strMeasure12} ${data.meals[0].strIngredient12} </p>`
    }
    if (data.meals[0].strMeasure13 != "") {
        ing += `<p>${data.meals[0].strMeasure13} ${data.meals[0].strIngredient13} </p>`
    }
    if (data.meals[0].strMeasure14 != "") {
        ing += `<p>${data.meals[0].strMeasure14} ${data.meals[0].strIngredient14} </p>`
    }
    if (data.meals[0].strMeasure15 != "") {
        ing += `<p>${data.meals[0].strMeasure15} ${data.meals[0].strIngredient15} </p>`
    }
    if (data.meals[0].strMeasure16 != "") {
        ing += `<p>${data.meals[0].strMeasure16} ${data.meals[0].strIngredient16} </p>`
    }
    if (data.meals[0].strMeasure17 != "") {
        ing += `<p>${data.meals[0].strMeasure17} ${data.meals[0].strIngredient17} </p>`
    }
    if (data.meals[0].strMeasure18 != "") {
        ing += `<p>${data.meals[0].strMeasure18} ${data.meals[0].strIngredient18} </p>`
    }
    if (data.meals[0].strMeasure19 != "") {
        ing += `<p>${data.meals[0].strMeasure19} ${data.meals[0].strIngredient19} </p>`
    }
    if (data.meals[0].strMeasure20 != "") {
        ing += `<p>${data.meals[0].strMeasure20} ${data.meals[0].strIngredient20} </p>`
    }
return ing
}


