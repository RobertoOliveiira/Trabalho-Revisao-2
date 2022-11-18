let API_buscar = 'http://www.themealdb.com/api/json/v1/1/lookup.php?i=';
let favorite = []

addEventListener('load', function () {
    loadItem();
    favorite = localStorage.getItem('favorite') || [];
    
});



const loadItem = async () => {
    let id = localStorage.getItem('id');
    API_buscar += id;
    listar();
}
const surprise = async () => {
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

const favoritar = (id, a) => {
    let lista = JSON.parse(localStorage.getItem('favorite') || '[]');
    lista.push(id);
    localStorage.setItem('favorite', JSON.stringify(lista));
    a.setAttribute('src', '_img/like.png');
    a.setAttribute('onclick', `desfavoritar(${id},this)`);
    console.log('favoritar');
}

const desfavoritar = (id, a) => {
    let lista = JSON.parse(localStorage.getItem('favorite') || '[]');
    console.log(lista);
    let aux = lista.findIndex((a) => a == id);
    lista.splice(aux, 1);
    localStorage.setItem('favorite', JSON.stringify(lista));
    a.setAttribute('src', '_img/not-like.png');
    a.setAttribute('onclick', `favoritar(${id},this)`);
    console.log('desfavoritar');
}


const listar = async () => {

    let data = await getAPI(API_buscar);
    let html = document.getElementById('infos');
    console.log(data.meals[0].idMeal);

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
    containerInfos.classList.add('container', 'containerInfos');

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

    let coment = `<section id="comentarios"></section>
<section id="comentar">
          <div id="form">
            <!-- Name input -->
            <div class="form-outline mb-4">
              <label class="form-label" for="form4Example1">Nome</label>
              <input type="text" id="form4Example1" class="form-control" />
            </div>

            <!-- Email input -->
            <div class="form-outline">
              <label class="form-label" for="form4Example2"
                >Endereço Email</label
              >
              <input
                type="email"
                id="form4Example2"
                class="form-control mb-4"
              />
            </div>

            <!-- Message input -->
            <div class="form-outline mb-4">
              <label class="form-label" for="form4Example3">Mensagem</label>
              <textarea
                class="form-control mb-1"
                id="form4Example3"
                rows="4"
              ></textarea>
            </div>

            <div
              style="
                display: flex;
                justify-content: center;
                flex-direction: column;
                width: 180px;
                align-items: center;
                margin: auto;
              "
            >
              <div class="rate">
                <input hidden type="radio" id="star5" name="rate" value="5" />
                <label for="star5" title="text">5 stars</label>
                <input hidden type="radio" id="star4" name="rate" value="4" />
                <label for="star4" title="text">4 stars</label>
                <input hidden type="radio" id="star3" name="rate" value="3" />
                <label for="star3" title="text">3 stars</label>
                <input hidden type="radio" id="star2" name="rate" value="2" />
                <label for="star2" title="text">2 stars</label>
                <input hidden type="radio" id="star1" name="rate" value="1" />
                <label for="star1" title="text">1 star</label>
              </div>
                <button onclick="sendAvaliation(${data.meals[0].idMeal})" class="btn btn-success">
                Enviar
              </button>
            </div>
          </div>
                
        </section>`
    let avaliacao = document.createElement('div');

    avaliacao.innerHTML = coment;

    html.appendChild(avaliacao);
    html.appendChild(container);
    carregarComentario(data.meals[0].idMeal)
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

const carregarComentario = (id) =>{
    let infos = JSON.parse(localStorage.getItem('avaliacao'));
    let avaliacoes = infos.find((a) => a.id == id);
    let html = document.getElementById('comentarios');
    html.innerHTML = ''
    //console.log(avaliacoes)
    
    avaliacoes.avaliacao.forEach((a) =>{
        console.log(a)
        
        
        let containerComent = document.createElement('div');
        containerComent.classList.add('comentariosContainer');
        let nomeContainer = document.createElement('div');
        nomeContainer.classList.add('comentariosNomeContainer');
        let nome = document.createElement('p');
        let stars = document.createElement('img');
        let descricao = document.createElement('p');
        descricao.classList.add('comentariosdesc');
        
        descricao.textContent = `${a.mensagem}`;
        nome.textContent = `Nome: ${a.nome}`;

        stars.setAttribute("src", `_img/${a.star} estrela.png`);

        nomeContainer.appendChild(nome); 
        nomeContainer.appendChild(stars); 
    
        containerComent.appendChild(nomeContainer);
        containerComent.appendChild(descricao);

        html.appendChild(containerComent);
    })
}

const sendAvaliation = (id) => {
    let star = document.querySelector('input[name="rate"]:checked').value;
    let lista = JSON.parse(localStorage.getItem('avaliacao') || '[]');
    let name = document.getElementById('form4Example1');
    let mail = document.getElementById('form4Example2');
    let message = document.getElementById('form4Example3');
    let aux = lista.find((a) => a.id == id)
    if (aux == null || aux == "") {
        lista = [...lista, {avaliacao: [{nome: name.value, email: mail.value, mensagem: message.value, star: star}], id: id}];
    } else {
        lista.forEach((a) => {
            if (a.id == id) {
                a.avaliacao = [...a.avaliacao,{ nome: name.value, email: mail.value, mensagem: message.value, star: star}]
                console.log(a.avaliacao)
            }
        })
    }
    localStorage.setItem('avaliacao',JSON.stringify(lista));
    carregarComentario(id);
}
