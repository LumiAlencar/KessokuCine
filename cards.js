const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOTk1ZDAxMzY5NTA1Y2ExYjZiYzY1YjUxZmI1ZGQ1YiIsInN1YiI6IjY1MDg4ZmIwOGE4OGIyMDEwMDBhM2IxNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sHvaehEzWlAeO0ZZ61R_-UpetR5Nqw_ESzwTpOFkoKY'
  }
};
const apiKey = '4bb90f9d';
const apiTMDB = '1995d01369505ca1b6bc65b51fb5dd5b'
const frmPesquisa = document.querySelector("form");
const corpo = document.querySelector("body")

const showFav = () => {
  const favs = document.querySelector("div.favList");
  console.log(favs)

  let favList = localStorage.getItem("fav") !== null ? JSON.parse(localStorage.getItem("fav")) : []
  if (favList === null) {
    const nullMsg = "Nenhum filme definido como favorito"
    favs.innerHTML = nullMsg;
  } else {
    favList.forEach(element => {
      fetch(`http://www.omdbapi.com/?i=${element}&apikey=${apiKey}`)
      .then(result => result.json())
      .then(json => {
        console.log(json)
        let item = document.createElement("div");
        item.classList.add("movie");
        item.innerHTML = `<div class="titleCard" onclick="info('${json.imdbID}')"><h4>${json.Title} (${json.Year})</h4></div> <img src="${json.Poster}"/>`;
        favs.appendChild(item);
      })
    })
  }
}

const info = (imdbID) => {
  const key = "imdbID";
  localStorage.setItem(key, imdbID);
  window.open("info.html", "_self");
}

function wTrailer(id) {
  fetch(`https://api.themoviedb.org/3/movie/${id}/external_ids`, options)
  .then(response => response.json())
  .then(response => {
    console.log(response)
    let trailerID = response.id
    fetch(`https://api.themoviedb.org/3/movie/${trailerID}/videos?language=en-US`, options)
    .then(trailer => trailer.json())
    .then(trailer => {
      console.log(trailer.results)
      results = trailer.results
      results.forEach(element => {
        if (element.name.includes("Official") && element.name.includes("Trailer")) {
          console.log(element, 'games')
          tLink = element.key
          window.open(`https://www.youtube.com/watch?v=${tLink}`, '_blank')
          .then(true);
        } else {
          if (element.name.includes("Trailer") && element.type === "Trailer" ) {
            console.log(element, 'games')
            tLink = element.key
            window.open(`https://www.youtube.com/watch?v=${tLink}`, '_blank')
            .then(true);
          }
        }
      })
    })
    .catch(err => console.error(err));
    });
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
    
    let item = document.createElement("span");
    let fav = document.createElement("span");

      item.innerHTML = `<button onclick="wTrailer('${json.imdbID}')" style="position: absolute;right: 0px;">▶️ Assistir Trailer</button>`;
      fav.innerHTML = `<button onclick="setFav('${json.imdbID}')">⭐ Favorito</button>`;

    corpo.appendChild(item);
    corpo.appendChild(fav);
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

  fetch(`http://www.omdbapi.com/?s=${pesquisa}&type=movie&apikey=${apiKey}`)
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
    <div class="titleCard" onclick="info('${element.imdbID}')">
    <h4>${element.Title} (${element.Year})</h4>
    </div> 
    <img src="${element.Poster}" />`;

    lista.appendChild(item);
})}

const ini = () => {
  pesquisa = "spider-man";
  searchPage = 1;
  fetch(`http://www.omdbapi.com/?s=${pesquisa}&type=movie&apikey=${apiKey}`)
    .then(result => result.json())
    .then(json => cardIni(json)); 
    showFav();
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

      item.innerHTML = `
      <div class="titleCard" onclick="info('${element.imdbID}')">
      <h4>${element.Title} (${element.Year})</h4>
      </div> 
      <img src="${element.Poster}"/>`;

    lista.appendChild(item);
  })
}

const showMore = (json) => {
  searchPage += 1; 
  fetch(`http://www.omdbapi.com/?s=${pesquisa}&page=${searchPage}&type=movie&apikey=${apiKey}`)
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