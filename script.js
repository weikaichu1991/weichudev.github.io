const canvas = document.getElementById('myCanvas');
const canvas2 = document.getElementById('edge-box');
const ctx = canvas.getContext('2d');

// Define the gradient colors and starting/ending points
const gradient = ctx.createRadialGradient(canvas.width/2, canvas.height/2, 0, 0, canvas.height/2, canvas.width);
gradient.addColorStop(0, '#b49090'); // Inner color
gradient.addColorStop(1, '#EBEBEB'); // Outer color

// Draw the filled circle with the gradient
ctx.fillStyle = gradient;
ctx.beginPath();
ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, 0, 2 * Math.PI);
ctx.fill();

// Define the rectangle's position and size
const rectX = 1000; // X-coordinate
const rectY = 50; // Y-coordinate
const rectWidth = 1200; // Width of the rectangle
const rectHeight = 100; // Height of the rectangle

// Draw the rectangle
ctx.fillStyle = 'rgba(0, 0, 255, 1)'; // Set the fill color (blue with 50% opacity)
ctx.fillRect(rectX, rectY, rectWidth, rectHeight);


document.getElementById('openOverlayBtn').onclick = function() {
    document.getElementById('overlay1').style.display = 'flex';
};
document.getElementById('openOverlayBtn2').onclick = function() {
    document.getElementById('overlay2').style.display = 'flex';
};
document.getElementById('openOverlayBtn3').onclick = function() {
    document.getElementById('overlay3').style.display = 'flex';
};
document.getElementById('openOverlayBtn4').onclick = function() {
    document.getElementById('overlay4').style.display = 'flex';
};
document.getElementById('openOverlayBtn5').onclick = function() {
    document.getElementById('overlay5').style.display = 'flex';
};

function closeOverlay1() {
    document.getElementById('overlay1').style.display = 'none';
}
function closeOverlay2() {
    document.getElementById('overlay2').style.display = 'none';
}
function closeOverlay3() {
    document.getElementById('overlay3').style.display = 'none';
}
function closeOverlay4() {
    document.getElementById('overlay4').style.display = 'none';
}
function closeOverlay5() {
    document.getElementById('overlay5').style.display = 'none';
}

document.getElementById('menu-icon').addEventListener('click', function() {
    const navLinks = document.getElementById('nav-links');
    navLinks.classList.toggle('active');
});

// The api connection for MongoDB
const APILINK = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=a30bc4e789ef3e55028db8a57ac2e6c8&page=1';
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=a30bc4e789ef3e55028db8a57ac2e6c8&query=";

const main = document.getElementById("section");
const form = document.getElementById("form");
const search = document.getElementById("query");

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMzBiYzRlNzg5ZWYzZTU1MDI4ZGI4YTU3YWMyZTZjOCIsIm5iZiI6MTcyODA4OTUwMy41MjMwMywic3ViIjoiNjcwMDA1YTQ2N2M2ZmIwOWZmZjgxMDNhIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.evcYha0zSMU8nwrcN2HLkBTgezMBqdUPRWbrckzfjgY'
    }
  };
  
//   fetch('https://api.themoviedb.org/3/configuration', options)
//     .then(response => response.json())
//     .then(response => console.log(response))
//     .catch(err => console.error(err));

returnMovies(APILINK);
function returnMovies(url) {
    fetch(url, options)
    .then(response => response.json())
    .then(function(data){
        console.log(data.results);
        data.results.forEach(element => {
            const div_card = document.createElement('div');
            div_card.setAttribute('class', 'card');

            const div_row = document.createElement('div');
            div_row.setAttribute('class','row');

            const div_column = document.createElement('div');
            div_column.setAttribute('class', 'column');

            const image = document.createElement('img');
            image.setAttribute('class', 'thumbnail');
            image.setAttribute('id', 'image');

            const title = document.createElement('h3');
            title.setAttribute('id', 'title');

            const center = document.createElement('center');

            title.innerHTML = `${element.title}<br><a href="movie.html?id=${element.id}&title=${element.title}">reviews</a>`;
            image.src = IMG_PATH + element.poster_path;

            center.appendChild(image);
            div_card.appendChild(center);
            div_card.appendChild(title);
            div_column.appendChild(div_card);
            div_row.appendChild(div_column);

            main.appendChild(div_row);
        });
    });
}
form.addEventListener("submit", (e) => {
    e.preventDefault();
    main.innerHTML = '';
    
    const searchItem = search.value;
    
    if (searchItem) {
        returnMovies(SEARCHAPI + searchItem);
            search.value = "";
    }
});

// // To be resolved: clicking returned search result image for more info of the movie.
// form.getElementById('main').addEventListener('click', (e) => {
//     // Check if the clicked element or its parent has a data-id attribute
//     let target = e.target;
//     if (target.getAttribute('data-id') || target.parentElement.getAttribute('data-id')) {
//         const movieId = target.getAttribute('data-id') || target.parentElement.getAttribute('data-id');
//         fetchMovieDetails(movieId);
//     }
// });


