const API_List_Category = 'http://www.themealdb.com/api/json/v1/1/filter.php?'
const API_find_letter = 'http://www.themealdb.com/api/json/v1/1/search.php?'
const API_Search_id = 'http://www.themealdb.com/api/json/v1/1/lookup.php?i='
const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
let favorite = [];

addEventListener('load', function(){
    favorite = localStorage.getItem('favorite')||[];
    listar(`${API_List_Category}c=Beef`);
    buttons();
});

const search = async ()=>{
    let input = document.getElementById('input-search');
    listar(`http://www.themealdb.com/api/json/v1/1/search.php?s=${input.value}`)
}

const surprise = async () =>{
    let data = await getAPI('http://www.themealdb.com/api/json/v1/1/random.php');
    localStorage.setItem('id', data.meals[0].idMeal);
    window.location.href = "details.html";
}

const getAPI = async (url) => {
    //console.log(url)
    const resp = await fetch(url);
    const data = await resp.json();
    return data;
}
const define = (e) =>{
    if(e.innerText == 'Category'){
        document.getElementById('categorias').removeAttribute('hidden');
        document.getElementById('alfabetico').setAttribute('hidden', "");
        listar(`${API_List_Category}c=Beef`);
    }else{
        document.getElementById('alfabetico').removeAttribute('hidden');
        document.getElementById('categorias').setAttribute('hidden', "");
        listar(`${API_find_letter}f=a`);
    }
}

const buttons = () =>{
    alphabetics();
    category();
}

const alphabetics = async () =>{
    
    let containerList = document.getElementById('alfabetico');
    alphabet.forEach(i =>{
        let div = document.createElement('div');
        let button = `<button class="buttons" onclick=listar('${API_find_letter}f=${i}') >${i}</button>`;

        div.innerHTML = button;
        containerList.appendChild(div);
    })
}


const category = async () =>{
    let data = await getAPI('https://www.themealdb.com/api/json/v1/1/categories.php');
    let containerList = document.getElementById('categorias');
    //console.log(data);
    

    data.categories.forEach(meal => {
        let div = document.createElement('div');
        let button = `<button class="buttons" onclick=listar('${API_List_Category}c=${meal.strCategory}') >${meal.strCategory}</button>`;

        div.innerHTML = button;
        containerList.appendChild(div);
    });

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

const listar = async (url) =>{
    console.log(url)
    let data = await getAPI(url);
    let containerList = document.getElementById('infos');
    containerList.innerHTML = '';
    //console.log(data);
    

    data.meals.forEach(meal => {
        let html = document.createElement('div');
        html.classList.add('card', 'col-2', 'my-4', 'ms-1', 'my-card');
        //html.addEventListener('click', ()=> goDetails(meal.idMeal))

        let htmlBody = `
        <div class="card-header" id="imgHeader" >
            ${favorite.includes(meal.idMeal) ? `<div class="like"><img onclick="desfavoritar('${meal.idMeal}', this)" src='_img/like.png'/></div>` : `<div class="like"><img onclick="favoritar('${meal.idMeal}', this)"  src='_img/not-like.png'/> </div>`}
            <img onclick="goDetails('${meal.idMeal}')" src="${meal.strMealThumb}" alt="${meal.strMeal}">
        </div>
        <div class="card-body bg-white">
            <h2 class=" text-center">${meal.strMeal}</h2>
        </div>`;

        html.innerHTML = htmlBody;
        containerList.appendChild(html);
    });
}

const loadFavorites = async () =>{
    let list = JSON.parse(localStorage.getItem('favorite'));
    let containerList = document.getElementById('infos');
    containerList.innerHTML = '';
    list.forEach(async (a)=> {
        let data = await getAPI(`${API_Search_id}${a}`)
        let html = document.createElement('div');
        html.classList.add('card', 'col-2', 'my-4', 'ms-1', 'my-card');

        let htmlBody = `
        <div class="card-header" id="imgHeader" >
            ${favorite.includes(data.meals[0].idMeal) ? `<div class="like"><img onclick="desfavoritar('${data.meals[0].idMeal}', this)" src='_img/like.png'/></div>` : `<div class="like"><img onclick="favoritar('${data.meals[0].idMeal}', this)"  src='_img/not-like.png'/> </div>`}
            <img onclick="goDetails('${data.meals[0].idMeal}')" src="${data.meals[0].strMealThumb}" alt="${data.meals[0].strMeal}">
        </div>
        <div class="card-body bg-white">
            <h2 class=" text-center">${data.meals[0].strMeal}</h2>
        </div>`;

        html.innerHTML = htmlBody;
        containerList.appendChild(html);
})

}

const goDetails = (idMeal) =>{
    localStorage.setItem('id', idMeal);    
    window.location.href = "details.html";
}

const inscrever = () => {
    let input = document.getElementById('input-newsletter');
    localStorage.setItem('id', input.value);   

}