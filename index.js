// Koppla HTML till JS
const lista = document.querySelector("#lista");
const form = document.querySelector("#form");
const searchTerm = document.querySelector("#search");

// anrop till api
form.addEventListener("submit", (e) => {
  e.preventDefault();
  // clear innerHTML av lista
  lista.innerHTML = "";
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
  const response = await fetch(
    `${base_url}${method}&${api_key}&${text}&${safe_search}&${format}&nojsoncallback=1`
  );
  // Data vi får tillbaka
  const data = await response.json();
  showPhotos(data.photos.photo);
}

let arr = [];
let i = 0;

const showPhotos = (array) => {
  let base_url_photo = "https://live.staticflickr.com/";
  let size_suffix = "w";

  array.forEach((photo, index) => {
    arr[
      index
    ] = `<img src="${base_url_photo}${photo.server}/${photo.id}_${photo.secret}_${size_suffix}.jpg"><p>${photo.title}</p>`;
  });

  lista.innerHTML = `<li>${arr[i]}</li>`;;
};

function buttonClickRight() {
  if (i == arr.length) {
    i = 0;
  }
  if (arr.length === 0) {
    lista.innerHTML = `<p>Search After Item First</p>`;
  } else {
    lista.innerHTML = `<li>${arr[i++]}</li>`;
  }
}

function buttonClickLeft() {
  if (i == 0) {
    i = arr.length - 1;
  }
  if (arr.length === 0) {
    lista.innerHTML = `<p>Search After Item First</p>`;
  } else {
    lista.innerHTML = `<li>${arr[i--]}</li>`;
  }
}

function myFunction() {
  var x = document.getElementById("myLinks");
  var y = document.getElementById("navbar");
  var y11 = document.getElementById("span1");
  var y12 = document.getElementById("span2");
  var y2 = document.getElementById("logoid");
  var y3 = document.getElementById("searchbar");

  if (x.style.display === "flex") {
    x.style.display = "none";
    y.style.background = "red";
    y11.style.background = "black";
    y12.style.background = "black";
    y2.style.color = "black";
    y3.style.filter = "invert(0)";
  } else {
    y.style.background = "black";
    y11.style.background = "red";
    y12.style.background = "red";
    y2.style.color = "red";
    y3.style.filter = "invert(1)";
    y3.style.fill = "red";
    x.style.display = "flex";
    x.style.flexDirection = "row";
    x.style.justifyContent = "center";
    x.style.alignItems = "center";
  }
}
