const API_buscar = 'http://www.themealdb.com/api/json/v1/1/search.php?s=';
addEventListener('load', function(){
    loadItem();
});

const loadItem = async () =>{
    let nome = localStorage.getItem('name');
    let data = await getAPI(`${API_buscar}${nome}`);
    console.log(data);
}


