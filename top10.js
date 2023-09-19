const apiKey = '4bb90f9d';
const top10 = [
  'tt0111161',
  'tt0068646', 
  'tt0468569', 
  'tt0167260', 
  'tt0110912', 
  'tt1375666', 
  'tt0137523', 
  'tt0109830', 
  'tt0133093', 
  'tt0073486'
]
const action10 = [
  'tt0468569',
  'tt0167260', 
  'tt1375666', 
  'tt0120737', 
  'tt0167261', 
  'tt0133093', 
  'tt0080684', 
  'tt9362722', 
  'tt0103064', 
  'tt0076759'
]
const drama10 = [
  'tt0033467',
  'tt0068646', 
  'tt0050083', 
  'tt0034583', 
  'tt0046438', 
  'tt0111161', 
  'tt0056172', 
  'tt0081398', 
  'tt0040522', 
  'tt0108052'
]
const romance10 = [
  'tt0034583',
  'tt0027977', 
  'tt0021749', 
  'tt5311514', 
  'tt0338013', 
  'tt0045152', 
  'tt0211915', 
  'tt0053604', 
  'tt0031381', 
  'tt4016934'
]
const comedy10 = [
  'tt0027977',
  'tt0057012', 
  'tt0053291', 
  'tt0071853', 
  'tt0118715', 
  'tt0017925', 
  'tt0072431', 
  'tt0107048', 
  'tt0075686', 
  'tt0079470'
]
const terror10 = [
  'tt0102926',
  'tt0078748', 
  'tt0054215', 
  'tt0081505', 
  'tt8239946', 
  'tt0084787', 
  'tt0070047', 
  'tt13345606', 
  'tt0046911', 
  'tt3461252'
]
const crime10 = [
  'tt0068646', 
  'tt0468569', 
  'tt0071562', 
  'tt0050083', 
  'tt0110912', 
  'tt6019206', 
  'tt0099685', 
  'tt0114369', 
  'tt0102926', 
  'tt0120689'
]

const info = (imdbID) => {
  const key = "imdbID";
  localStorage.setItem(key, imdbID);
  window.open("info.html", "_self");
}

function load(tag) {

tag.map((element, index) => {
  fetch(`http://www.omdbapi.com/?i=${element}&plot=short&apikey=${apiKey}`)
  .then(result => result.json())
  .then(json => { 
    const pos = index+1;
    const lista = document.getElementById(pos);
    lista.innerHTML = "";
    let item = document.createElement("div");
    item.classList.add("topCards");
    const metaColor = parseInt(json.Metascore) < 40 ? 'metaRed' : parseInt(json.Metascore) > 60 ? 'metaGreen' : parseInt(json.Metascore) >= 40 && parseInt(json.Metascore) <= 60 ? 'metaYellow' : 'metaNA'
    item.innerHTML = 
    `<div class="topCards" onclick="info('${json.imdbID}')">
      <img src="${json.Poster}"/>
      <div class="toptxt">
        <h2>${pos}. ${json.Title} (${json.Year})</h2>
        <h4 class="geral">${json.Rated} | ${json.Runtime} | ${json.Genre}<h4>
        <div class="rateTop">
          <h5>⭐ ${json.imdbRating}</h5>
          <h5><span class="${metaColor}">${json.Metascore}</span> Metacritic</h5>
        </div>
        <div class="topPlot">
          <h4>${json.Plot}</h4>
        </div>
        <h5>Diretor: ${json.Director} | Escritor: ${json.Writer} | Atores: ${json.Actors}</h5>
      </div>
    </div>`;

    lista.appendChild(item);
})});
}






/*

function load(tag) {
  const lista = document.querySelector("div.cardMovie");
  lista.innerHTML = "";

  console.log(tag);

tag.forEach((element, index) => {
  fetch(`http://www.omdbapi.com/?i=${element}&plot=short&apikey=${apiKey}`)
  .then(result => result.json())
  .then(json => { 
    let item = document.createElement("div");
    item.classList.add("topCards");
    const metaColor = parseInt(json.Metascore) < 40 ? 'metaRed' : parseInt(json.Metascore) > 60 ? 'metaGreen' : parseInt(json.Metascore) >= 40 && parseInt(json.Metascore) <= 60 ? 'metaYellow' : 'metaNA'
    item.innerHTML = 
    `<div class="topCards" onclick="info('${json.imdbID}')">
      <img src="${json.Poster}"/>
      <div class="toptxt">
        <h2>${index+1}. ${json.Title} (${json.Year})</h2>
        <h4 class="geral">${json.Rated} | ${json.Runtime} | ${json.Genre}<h4>
        <div class="rateTop">
          <h5>⭐ ${json.imdbRating}</h5>
          <h5><span class="${metaColor}">${json.Metascore}</span> Metacritic</h5>
        </div>
        <div class="topPlot">
          <h4>${json.Plot}</h4>
        </div>
      </div>
    </div>`;

    lista.appendChild(item);
})});
}

*/