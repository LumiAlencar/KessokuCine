let favMovies = [ "" ];

setFav = (imdbID) => {
    favMovies += imdbID;
    console.log(favMovies);
    localStorage.setItem(fav, favMovies);
}

// TERMINAR SISTEMA DE FAVORITOS