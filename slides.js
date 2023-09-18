let searchPage;
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}
/*/
function slideLoader(json) {
  document.getElementById('img1').src = json.Search[0].Poster;
  document.getElementById('img2').src = json.Search[1].Poster;
  document.getElementById('img3').src = json.Search[2].Poster;

  document.getElementById('tit1').innerText = json.Search[0].Title;
  document.getElementById('tit2').innerHTML = json.Search[1].Title;
  document.getElementById('tit3').innerText = json.Search[2].Title;
}
/*/

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
} 
