const url = new URL(location.href);
const commentId = Math.floor(100000 + Math.random() * 900000);
// This code ensures that movieId will always be a 6-digit number. Here's how it works:
// Math.random() generates a random number between 0 (inclusive) and 1 (exclusive).
// Multiplying by 900000 scales this to a range of 0 to 899999.
// Adding 100000 shifts the range to 100000 to 999999.
// Math.floor() rounds down to the nearest whole number, ensuring a 6-digit integer.
// 
const commentSubject = document.getElementById("subject");
const commentFrom = document.getElementById("name");
const commentEmail= document.getElementById("email");
const commentContent=document.getElementById("comment")
const APILINK = 'http://localhost:8000/api/v1/reviews/';
const main = document.getElementById("comments");

// const options = {
//     method: 'GET',
//     headers: {
//       accept: 'application/json',
//       Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMzBiYzRlNzg5ZWYzZTU1MDI4ZGI4YTU3YWMyZTZjOCIsIm5iZiI6MTcyODA4OTUwMy41MjMwMywic3ViIjoiNjcwMDA1YTQ2N2M2ZmIwOWZmZjgxMDNhIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.evcYha0zSMU8nwrcN2HLkBTgezMBqdUPRWbrckzfjgY'
//     }
//   };
  
//   fetch('https://api.themoviedb.org/3/configuration', options)
//     .then(response => response.json())
//     .then(response => console.log(response))
//     .catch(err => console.error(err));

// The card column for creating a new review.
// The id in the card us hard coded.
const div_new = document.createElement('div');
div_new.innerHTML = `
    <div class="row">
        <div class="column">
            <div class="card">
                ${commentSubject}
                <p><strong>Comment: </strong>
                    ${commentContent}
                </p>
                <p><strong>From: </strong>
                    ${commentFrom}
                </p>
                <p><strong>email: </strong>
                    ${commentEmail}
                </p>
                <p><strong>CommentID: </strong>
                    ${commentId}
                </p>
                <p><a href="#" onclick="saveReview('new_comment', 'new_user')">💾</a>
                </p>
            </div>
        </div>
    </div>
`
main.appendChild(div_new)

returnReviews(APILINK);
function returnReviews(url) {
    fetch(url + "movie/" + movieId, options)
    .then(response => response.json())
    .then(function(data){
        console.log(data);
        data.forEach(review => {
            const div_card = document.createElement('div');
            div_card.innerHTML = `
                    <div class = "row">
                        <div class = "column">
                            <div class = "card" id = "${review._id}">
                                <p><strong>Review: </strong>${review.review}</p>
                                <p><strong>User: </strong>${review.user}</p>
                                <p><a href="#" onclick="editReview('${review._id}', '${review.review}', '${review.user}')">&#9999</a> <a href = "#" onclick = "deleteReview('${review._id}')">&#x1F5D1;&#xFE0F</a></p>
                            </div>
                        </div>
                    </div>
                `

            main.appendChild(div_card);
        });
    });
}

function editReview(id, review, user) {
    const element = document.getElementById(id);
    const reviewInputId = "review" + id
    const userInputId = "user" + id

    // creating editing function with 2 input boxes shown up.
    element.innerHTML = `
                <p><strong>Review: </strong>
                <input type = "text" id = "${reviewInputId}" value = "${review}">
                </p>
                <p><strong>User: </strong>
                <input type = "text" id = "${userInputId}" value = "${user}">
                </p>
                <p><a href = "#" onclick = "saveReview('${reviewInputId}', '${userInputId}', '${id}',)">💾</a>
                </p>
    `
}
// creating save the editted review function
function saveReview(reviewInputId, userInputId, id="") {
    const review = document.getElementById(reviewInputId).value;
    const user = document.getElementById(userInputId).value;

    if(id){
        fetch(APILINK + id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({"user": user, "review": review})
        }).then(res => res.json())
            .then(res => {
                console.log(res)
                location.reload();
            });
    } else {
        fetch(APILINK + "new", {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({"user": user, "review": review, "movieId": movieId})
        }).then(res => res.json())
            .then(res => {
                console.log(res)
                location.reload();
            });
    }
}
// creating the function for deleting the review
function deleteReview(id){
    fetch(APILINK + id, {
        method: 'DELETE'
    }).then(res => res.json())
    .then(res => {
        console.log(res)
        location.reload();
    });
}

// To be resolved: clicking returned search result image for more info of the movie.
// form.getElementById('main').addEventListener('click', (e) => {
//     // Check if the clicked element or its parent has a data-id attribute
//     let target = e.target;
//     if (target.getAttribute('data-id') || target.parentElement.getAttribute('data-id')) {
//         const movieId = target.getAttribute('data-id') || target.parentElement.getAttribute('data-id');
//         fetchMovieDetails(movieId);
//     }
// });


