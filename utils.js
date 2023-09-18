export const info = (imdbID) => {
    const key = "imdbID";
    localStorage.setItem(key, imdbID);
    window.open("info.html", "_self");
}
  