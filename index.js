// Koppla HTML till JS
const lista = document.querySelector('#lista');
const form = document.querySelector('form');
const searchTerm = document.querySelector('#search');

// anrop till api
form.addEventListener('submit', e => {
    e.preventDefault();
    // clear innerHTML av lista 
    lista.innerHTML = '';
    getData(searchTerm.value);
});

async function getData(query) {

   let base_url = "https://api.flickr.com/services/rest/?method=";
   let method = "flickr.photos.search";
   let api_key = "api_key=ef6d94e4959116f9327483fa72675681";
   let text = `text=${query}`;
   let format = "format=json";
   let safe_search = "safe_search=1";

    // skapar en anrop till Flickr API
    const response = await fetch (`${base_url}${method}&${api_key}&${text}&${safe_search}&${format}&nojsoncallback=1`);
    // Data vi får tillbaka
    const data = await response.json();
    showPhotos(data.photos.photo);
};


const showPhotos = array => {
    let base_url_photo = "https://live.staticflickr.com/";
    let size_suffix = "w";

    array.forEach(photo => {
        const item = document.createElement('li');
        item.innerHTML =`<p>${photo.title}</p><img src="${base_url_photo}${photo.server}/${photo.id}_${photo.secret}_${size_suffix}.jpg">`;
        lista.appendChild(item);
    });
};

