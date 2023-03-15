let elList = document.querySelector('.js-list');
let elSelect = document.querySelector('.js-select');
let elSelectsort = document.querySelector('.js-selectSort');
let elForm = document.querySelector('.js-form');
let elInput = document.querySelector('.js-input');
let elBtn = document.querySelector('.js-btn');
let elBody = document.querySelector('body');
let elBmList = document.querySelector('.js-bookmarkList')

// render 

function filmsEmits(array, node){
  node.innerHTML = '';

  for(film of array){
    var Item = document.createElement('li');
    let Image = document.createElement('img');
  let Title = document.createElement('h2');
  let Genres = document.createElement('h5');
  let Overview = document.createElement('p');
  let bookmark = document.createElement('button');

  Image.src = film.poster;
  Title.textContent = film.title;
  Genres.textContent = film.genres;
  Overview.textContent = film.overview;
  bookmark.textContent = 'bookmark';
  bookmark.dataset.filmId = film.id;

  Item.setAttribute('class','film-item');
  Title.setAttribute('class','film-title');
  Genres.setAttribute('class','film-genres');
  Overview.setAttribute('class','film-overview');
  bookmark.setAttribute('class','film-bookmark js-bookmark');

  Image.style = `width: 380px; height: 550px; border-radius: 10px;`;
  
  Item.append(Image);
  Item.append(Title);
  Item.append(Genres);
  Item.append(Overview);
  Item.append(bookmark);

  node.appendChild(Item);

  }
} 

// render bookmark

function renderBookmark(array,node){
  node.innerHTML = '';

  array.forEach((e) => {
    var Item = document.createElement('li');
    let title = document.createElement('p');
    let deleteBtn = document.createElement('button');

    title.textContent = e.title;
    deleteBtn.innerHTML = `&times;`;
    deleteBtn.dataset.filmId = e.id;

    Item.setAttribute('class','bookmark-item');
    title.setAttribute('class','bookmark-title');
    deleteBtn.setAttribute('class','bookmark-delete-btn');

    Item.append(title);
    Item.append(deleteBtn);

    node.appendChild(Item);
  })
}

// renderBookmark(films,elBmList);
filmsEmits(films,elList);

// select 

let newArray = [];
elSelect.addEventListener('change',() => {
  newArray = [];

  if(elSelect.value != 'All'){
    films.forEach((film) => {
      if(film.genres.includes(elSelect.value)){
        newArray.push(film);
      }
    })
    filmsEmits(newArray,elList);
  }else{
    filmsEmits(films,elList);
  }
});

let Array = [];
films.forEach((movie)=>{
	movie.genres.forEach((film) =>{
		Array.push(film);
	});
});

let setArray = new Set(Array);

setArray.forEach((el) => {
	let eloption = document.createElement('option');
	 
	eloption.setAttribute("value", el);
	eloption.textContent = el;
	elSelect.appendChild(eloption);
});

// select sort 

elSelectsort.addEventListener('change', () => {

  if(elSelectsort.value == "Sort"){
    window.location.reload();
  }

  if(elSelectsort.value == "A-Z"){
    const filmSort = films.sort((a,b) =>{
      if(a.title > b.title){
        return 1;
      }
      if(a.title < b.title){
        return -1;
      }
      return 0;
    });
    filmsEmits(filmSort,elList);
  }

  if(elSelectsort.value == "Z-A"){
    const filmSort = films.sort((a,b) =>{
      if(a.title > b.title){
        return -1;
      }
      if(a.title < b.title){
        return 1;
      }
      return 0;
    });
    filmsEmits(filmSort,elList);
  }
})

// search 

let searchResult = [];

elForm.addEventListener('input', (evt) => {
  elList.innerHTML = '';
  evt.preventDefault();
  let elInputvalue = elInput.value.toLocaleLowerCase();
  films.forEach( el => {
    if(el.title.toLocaleLowerCase().includes(elInputvalue)){
      searchResult.push(el);
    }
  });
  filmsEmits(searchResult,elList);
  searchResult = []
});

// dark mode 

let theme = false;

elBtn.addEventListener('click', () => {
  theme = !theme;
  const bg = theme ? 'dark' : 'light';
  window.localStorage.setItem('theme', bg);
  changeTheme();
})

function changeTheme(){
  if(window.localStorage.getItem('theme') == 'dark'){
    elBody.classList.add('dark');
  }else{
    elBody.classList.remove('dark');
  };
};

changeTheme();

// bookmark 

let bookmarkList = new Set();

elList.addEventListener("click", (evt) => {
  if (evt.target.matches(".js-bookmark")) {
    const filmId = evt.target.dataset.filmId;
console.log(evt);
    const findedFilm = films.find((film) => film.id === filmId);

    bookmarkList.add(findedFilm);
    renderBookmark(bookmarkList, elBmList);
  }
});

elBmList.addEventListener("click", (evt) => {
  if (evt.target.matches(".bookmark-delete-btn")) {
    const filmId = evt.target.dataset.filmId;

    const findedFilm = films.find((film) => film.id === filmId);

    bookmarkList.delete(findedFilm);
    renderBookmark(bookmarkList, elBmList);
  }
});
