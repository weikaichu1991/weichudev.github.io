import mongodb from "mongodb"
import dotenv from 'dotenv';
import app from "../server.js"
import commentsDAO from "../dao/commentsDAO.js"

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
dotenv.config();
// require('dotenv').config();
const MongoClient = mongodb.MongoClient;
const dbUsername = process.env.DB_username;
const dbPassword = process.env.DB_passwords;
const mongoURI = `mongodb+srv://${dbUsername}:${dbPassword}@comments.hzn16.mongodb.net/?retryWrites=true&w=majority&appName=comments`;

const port = 8000

MongoClient.connect(
    mongoURI,
    {
        maxPoolSize: 50,
        wtimeoutMS: 2500,
        useNewUrlParser: true
    })
    .catch( err => {
        console.error(err.stack)
        process.exit(1)
    })
    .then(async client => {
        // async is a function, meaning it doesnt have to wait until something to happen before it start working on something.
        await commentsDAO.injectDB(client)
        app.listen(port, () => {
            console.log(`listening on port ${port}`)
        })
    })

// -------------------------------------------------
form.getElementById('commentForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const name = form.getElementById('name').value;
    const email = form.getElementById('email').value;
    const subject = form.getElementById('subject').value;
    const comment = form.getElementById('comment').value;

    console.log('Submitting form:', { name, email, subject, comment });

    const response = await fetch('http://localhost:8000/api/comments', {
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
    const response = await fetch('http://localhost:8000/api/comments');
    const comments = await response.json();

    const commentsSection = document.getElementById('commentsSection');
    commentsSection.innerHTML = '';

    comments.forEach(comment => {
        const commentDiv = document.createElement('div');
        commentDiv.classList.add('comment');
        commentDiv.innerHTML = `
            <h3>${comment.subject}</h3>
            <p>${comment.comment}</p>
            <p><strong>${comment.name}</strong> - ${new Date(comment.date).toLocaleString()}</p>
        `;
        commentsSection.appendChild(commentDiv);
    });
}

// Load comments when the page loads
document.addEventListener('DOMContentLoaded', loadComments);