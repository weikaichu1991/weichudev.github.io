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
const APILINK = 'http://localhost:8000/api/v1/comments';
const main = document.getElementById("commentsSection");

const div_new = document.createElement('div');
div_new.innerHTML = `
<div class="row">
    <div class="column">
        <div class="card">
            New Comment
            <p><strong>Name: </strong>
                <input type="text" id="new_name" value="">
            </p>
            <p><strong>Email: </strong>
                <input type="text" id="new_email" value="">
            </p>
            <p><strong>Subject: </strong>
                <input type="text" id="new_subject" value="">
            </p>
            <p><strong>Comment: </strong>
                <input type="text" id="new_comment" value="">
            </p>
            <p><a href="#" onclick="saveComment('new_name', 'new_email', 'new_subject', 'new_comment')">Submit</a>
            </p>
        </div>
    </div>
</div>
`
main.appendChild(div_new)

returnComments(APILINK);
function returnComments(url) {
    fetch(url)
    .then(response => response.json())
    .then(function(data){
        console.log(data);
        data.forEach(comment => {
            const div_card = document.createElement('div');
            const comment_id = comment._id
            div_card.innerHTML = `
                    <div class = "row">
                        <div class = "column">
                            <div class = "card" id = "${comment_id}">
                                <p><strong>Subject: </strong>${comment.subject}</p>
                                <p><strong>Comment: </strong>${comment.comment_text}</p>
                                <p>${comment.name} - ${comment.date}</p>
                                <p>
                                    <a href="#" onclick="showEmailVerification('${comment._id}', 'edit')">Edit</a>
                                    <a href="#" onclick="showEmailVerification('${comment._id}', 'delete')">Delete</a>
                                </p>
                            </div>
                        </div>
                    </div>
                `

            main.appendChild(div_card);
        });
    });
}

function showEmailVerification(commentId, action) {
    const element = document.getElementById(commentId);
    element.innerHTML += `
        <div id="verify-email-${commentId}">
            <p><strong>Verify Email: </strong>
            <input type="text" id="verify-email-input-${commentId}" placeholder="Enter your email to verify">
            <button onclick="verifyEmail('${commentId}', '${action}')">Verify</button>
            </p>
        </div>
    `;
}

function verifyEmail(commentId, action) {
    const verifyEmailInput = document.getElementById(`verify-email-input-${commentId}`).value.trim().toLowerCase();
    fetch(`${APILINK}/${commentId}`)
        .then(response => response.json())
        .then(comment => {
            const storedEmail = comment.email.trim().toLowerCase();
            console.log(`Stored Email: ${storedEmail}, Entered Email: ${verifyEmailInput}`);
            if (storedEmail === verifyEmailInput) {
                if (action === 'edit') {
                    editComment(comment._id, comment.subject, comment.comment_text, comment.name, comment.email);
                } else if (action === 'delete') {
                    deleteComment(comment._id, verifyEmailInput);
                }
            } else {
                alert('Email verification failed. Please enter the correct email.');
            }
        })
        .catch(error => {
            console.error('Error fetching comment:', error);
            alert('Error fetching comment. Please try again.');
        });
}


function editComment(id, name, email, subject, comment_text ) {
    const element = document.getElementById(id);
    const subjectInputId = "subject" + id
    const commentInputId = "comment_text" + id
    const nameInputId = "name" + id
    const emailInputId = "email" + id
    // creating editing function with 2 input boxes shown up.
    element.innerHTML = `
        <p><strong>Name: </strong>
        <input type="text" id="${nameInputId}" value="${name}">
        </p>
        <p><strong>Email: </strong>
        <input type="text" id="${emailInputId}" value="${email}">
        </p>
        <p><strong>Subject: </strong>
        <input type="text" id="${subjectInputId}" value="${subject}">
        </p>
        <p><strong>Comment: </strong>
        <input type="text" id="${commentInputId}" value="${comment_text}">
        </p>
        <p><a href = "#" onclick = "saveComment('${nameInputId}', '${emailInputId}', '${subjectInputId}', '${commentInputId}', '${id}')">Save</a>
        </p>
    `
}
// creating save the editted review function
async function saveComment(nameInputId, emailInputId, subjectInputId, commentInputId, id = "") {
    const subject = document.getElementById(subjectInputId).value;
    const comment_text = document.getElementById(commentInputId).value;
    const name = document.getElementById(nameInputId).value;
    const email = document.getElementById(emailInputId).value;

    const method = id ? 'PUT' : 'POST';
    const url = id ? `${APILINK}/${id}` : APILINK;

    const response = await fetch(url, {
        method: method,
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, subject, comment_text })
    });

    if (response.ok) {
        console.log('Comment saved successfully');
        location.reload();
    } else {
        console.error('Error saving comment:', response.statusText);
    }
}

async function deleteComment(id) {
    const response = await fetch(`${APILINK}/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        console.log('Comment deleted successfully');
        location.reload();
    } else {
        console.error('Error deleting comment:', response.statusText);
    }
}

// Load comments when the page loads
document.addEventListener('DOMContentLoaded');
// document.addEventListener('DOMContentLoaded', () => returnComments(APILINK));