const apiKey = '4bb90f9d';
const frmPesquisa = document.querySelector("form");

const info = (imdbID) => {
  const key = "imdbID";
  localStorage.setItem(key, imdbID);
  window.open("info.html", "_self");
}

async function wTrailer(id) {
  let trailer = await fetch(`http://api.traileraddict.com/?imdb=1403865&count=4&width=680`)
  console.log(trailer);
}

const iniInfo = () => {
  const id = localStorage.getItem('imdbID');
  fetch(`http://www.omdbapi.com/?i=${id}&plot=full&apikey=${apiKey}`)
  .then(result => result.json())
  .then(json => {
    // Estabelecendo os elementos em Info
    console.log(json);
    let imdI = document.getElementById('IMDB'); 
    let rtI = document.getElementById('RT');
    let mcI = document.getElementById('MC');

    const Ratings = json?.Ratings;
    const typesRate = {
      "Internet Movie Database" : imdI,
      "Rotten Tomatoes" : rtI,
      "Metacritic" : mcI
    }

    if (Ratings !== undefined) {
      Ratings.forEach((value) => {
        typesRate[value.Source].innerText = value.Value;
      })
    }

    const dataFields = {
      'Poster': 'Poster',
      'Title': 'Title',
      'Year': 'Year',
      'Runtime': 'Runtime',
      'Released': 'Released',
      'Genre': 'Genre',
      'Plot': 'Plot',
      'Director': 'Director',
      'Writer': 'Writer',
      'Actors': 'Actors',
    };

    for (const fieldName in dataFields) {
      const element = document.getElementById(fieldName);
      if (element) {
        /*if (fieldName === 'Ratings') {
          const values = json[dataFields[fieldName]];
          values.forEach(valueObj => {element.innerText = valueObj.Value})
        } else */ if (fieldName === 'Poster') {element.src = json[dataFields[fieldName]];
        } else {element.innerText = json[dataFields[fieldName]];
        }
      }
    }
    
    const corpo = document.querySelector("body")
    let item = document.createElement("span");

      item.innerHTML = `<button onclick="wTrailer('${json.imdbID}')">Assistir Trailer</button>`;

    corpo.appendChild(item);
  }
  )
}

frmPesquisa.onsubmit = (ev) => {
  searchPage = 1;
  ev.preventDefault();
  // console.log(frmPesquisa);
 
  pesquisa = ev.target.pesquisa.value;

  if (pesquisa == "") {
    alert ('Preencha o campo!');
    return;
  }

  fetch(`http://www.omdbapi.com/?s=${pesquisa}&apikey=${apiKey}`)
    .then(result => result.json())
    .then(json => carregaLista(json)); 
    return pesquisa;
}

const carregaLista = (json) => {
  const lista = document.querySelector("div.grid");
  lista.innerHTML = "";

  // slideLoader(json);

  json.Search.forEach(element => {
    // console.log(element);

    let item = document.createElement("div");
    item.classList.add("movie");

    item.innerHTML = `
    <div class="titleCard" onclick="info('${element.imdbID}')"><h4>${element.Title} (${element.Year})</h4></div> <img src="${element.Poster}" />`;

    lista.appendChild(item);
})}

const ini = () => {
  pesquisa = "spider-man";
  searchPage = 1;
  fetch(`http://www.omdbapi.com/?s=${pesquisa}&apikey=${apiKey}`)
    .then(result => result.json())
    .then(json => cardIni(json)); 
    // console.log(json);
}

const cardIni = (json) => {
  const lista = document.querySelector("div.grid");
  lista.innerHTML = "";

  // slideLoader(json);

  json.Search.forEach(element => {
    // console.log(element);

    let item = document.createElement("div");
    item.classList.add("movie");

      item.innerHTML = `<div class="titleCard" onclick="info('${element.imdbID}')"><h4>${element.Title} (${element.Year})</h4></div> <img src="${element.Poster}"/>`;

    lista.appendChild(item);
  })
}

const showMore = (json) => {
  searchPage += 1; 
  fetch(`http://www.omdbapi.com/?s=${pesquisa}&page=${searchPage}&apikey=${apiKey}`)
    .then(result => result.json())
    .then(json => addMore(json)); 
    // console.log(json);
}

const addMore = (json) => {
  const lista = document.querySelector("div.grid");

  // slideLoader(json);

  json.Search.forEach(element => {
    // console.log(element);

    let item = document.createElement("div");
    item.classList.add("movie");

      item.innerHTML = `<div class="titleCard" onclick="info('${element.imdbID}')"><h4>${element.Title} (${element.Year})</h4></div> <img src="${element.Poster}"/>`;

    lista.appendChild(item);
  })
}