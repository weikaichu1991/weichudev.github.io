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
const APILINK = 'http://localhost:8000/api/comments/';

form.getElementById('commentForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const name = form.getElementById('name').value;
    const email = form.getElementById('email').value;
    const subject = form.getElementById('subject').value;
    const comment = form.getElementById('comment').value;

    console.log('Submitting form:', { name, email, subject, comment });

    const response = await fetch (APILINK, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, subject, comment })
    });

    if (response.ok) {
        console.log('Form submitted successfully');
        loadComments();
    } else {
        console.error('Error submitting form:', response.statusText);
    }
});

async function loadComments() {
    const response = await fetch(APILINK);
    const comments = await response.json();

    const commentsSection = document.getElementById('commentsSection');
    commentsSection.innerHTML = '';

    comments.forEach(comment => {
        const commentDiv = document.createElement('div');
        commentDiv.classList.add('comment');
        commentDiv.innerHTML = `
        <div class ="row>
            <div class = "column">
                <div class = "card" id= "${comment._id}"
                    <h3>${comment.subject}</h3>
                    <p>${comment.comment}</p>
                    <p><strong>${comment.name}</strong></p>
                    <p>${comment.date}</p>
                </div>
            </div>
        </div>
        `;
        commentsSection.appendChild(commentDiv);
    });
}

// Load comments when the page loads
document.addEventListener('DOMContentLoaded', loadComments);