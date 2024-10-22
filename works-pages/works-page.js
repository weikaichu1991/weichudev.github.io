// Get the modal
var modal = document.getElementById("imageModal");

// Get the image and insert it inside the modal - use its "alt" text as a caption
var images = document.getElementsByClassName("enlargeable-image");
var modalImg = document.getElementById("modalImage");

for (var i = 0; i < images.length; i++) {
    images[i].onclick = function() {
        modal.style.display = "block";
        modalImg.src = this.src;
    }
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

document.getElementById('menu-icon').addEventListener('click', function() {
    const navLinks = document.getElementById('nav-links');
    navLinks.classList.toggle('active');
});

// --- the commeenting sections functions ---
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

const div_new = document.createElement('div');
// div_new.innerHTML = `
//     <div class="row">
//         <div class="column">
//             <div class="card">
//                 ${commentSubject}
//                 <p><strong>Comment: </strong>
//                     ${commentContent}
//                 </p>
//                 <p><strong>From: </strong>
//                     ${commentFrom}
//                 </p>
//                 <p><strong>email: </strong>
//                     ${commentEmail}
//                 </p>
//                 <p><strong>CommentID: </strong>
//                     ${commentId}
//                 </p>
//                 <p><a href="#" onclick="saveReview('new_comment', 'new_user')">💾</a>
//                 </p>
//             </div>
//         </div>
//     </div>
// `

main.appendChild(div_new)