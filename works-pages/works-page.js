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
const APILINK = 'http://localhost:8000/api/comments';
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
            div_card.innerHTML = `
                    <div class = "row">
                        <div class = "column">
                            <div class = "card" id = "${comment._id}">
                                <p><strong>Subject: </strong>${comment.subject}</p>
                                <p><strong>Comment: </strong>${comment.comment_text}</p>
                                <p>${comment.name}</p>
                                <p>${comment.date}</p>
                                <p><a href="#" onclick="editComment('${comment._id}', '${comment.subject}', '${comment.comment_text}', '${comment.name}', '${comment.email}')">&#9999</a> <a href = "#" onclick = "deleteComment('${comment._id}')">&#x1F5D1;&#xFE0F</a></p>
                            </div>
                        </div>
                    </div>
                `

            main.appendChild(div_card);
        });
    });
}


function editComment(id, subject, comment, name, email) {
    const element = document.getElementById(id);
    const subjectInputId = "subject" + id
    const commentInputId = "comment" + id
    const nameInputId = "name" + id
    const emailInputId = "email" + id

    // creating editing function with 2 input boxes shown up.
    element.innerHTML = `
                <p><strong>Subject: </strong>
                <input type = "text" id = "${subjectInputId}" value = "${subject}">
                </p>
                <p><strong>Subject: </strong>
                <input type = "text" id = "${commentInputId}" value = "${comment}">
                </p>
                <p><strong>User: </strong>
                <input type = "text" id = "${nameInputId}" value = "${name}">
                </p>
                <p><strong>Subject: </strong>
                <input type = "text" id = "${emailInputId}" value = "${email}">
                </p>
                <p><a href = "#" onclick = "saveComment('${subjectInputId}', '${commentInputId}', '${nameInputId}', '${emailInputId}', '${id}',)">💾</a>
                </p>
    `
}
// creating save the editted review function
function saveComment(subjectInputId, commentInputId, nameInputId, emailInputId, id="") {
    const subject = document.getElementById(subjectInputId).value;
    const comment = document.getElementById(commentInputId).value;
    const name = document.getElementById(nameInputId).value;
    const email = document.getElementById(emailInputId).value;

    if(id){
        fetch(APILINK + id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({"name": name, "email": email, "subject": subject, "comment_text": comment})
        }).then(res => res.json())
            .then(res => {
                console.log(res)
                location.reload();
            });
    } else {
        fetch(APILINK, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({"name": name, "email": email, "subject": subject, "comment_text": comment})
        }).then(res => res.json())
            .then(res => {
                console.log(res)
                location.reload();
            });
    }
}
// creating the function for deleting the review
function deleteComment(id){
    fetch(APILINK + id, {
        method: 'DELETE'
    }).then(res => res.json())
    .then(res => {
        console.log(res)
        location.reload();
    });
}