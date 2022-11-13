const API_List_Category = 'http://www.themealdb.com/api/json/v1/1/categories.php'


addEventListener('load', function(){
    
});

const search = async ()=>{
    let input = document.getElementById('input-search');
    localStorage.setItem('name', input.value);    
    window.location.href = "details.html";

}

const getAPI = async (url) => {
    console.log(url)
    const resp = await fetch(url);
    const data = await resp.json();
    return data;
}
const define = (e) =>{
    if(e.innerText == 'Category'){
        document.getElementById('categorias').removeAttribute('hidden');
        document.getElementById('alfabetico').setAttribute('hidden', "");
    }else{
        document.getElementById('alfabetico').removeAttribute('hidden');
        document.getElementById('categorias').setAttribute('hidden', "");
    }
}
