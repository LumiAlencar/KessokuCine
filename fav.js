setFav = (imdbID) => {
    const getItens = localStorage.getItem("fav") !== null ? localStorage.getItem("fav") : []
    console.log(getItens)
    if (getItens.includes(imdbID)) {
        const itensFilter = getItens !== null ? JSON.parse(getItens)?.filter(value => value !== imdbID) : [] 
        localStorage.setItem("fav", JSON.stringify(itensFilter))
        // console.log(itensFilter)
    } else {
        const itensLS = getItens.length ? JSON.parse(getItens) : getItens
        itensLS.push(imdbID)
        localStorage.setItem("fav", JSON.stringify(itensLS));
        // console.log(itensLS);
    }
    
}

// TERMINAR SISTEMA DE FAVORITOS