// const canvas = document.getElementById('myCanvas');
// const canvas2 = document.getElementById('edge-box');
// const ctx = canvas.getContext('2d');

// // Define the gradient colors and starting/ending points
// const gradient = ctx.createRadialGradient(canvas.width/2, canvas.height/2, 0, 0, canvas.height/2, canvas.width);
// // gradient.addColorStop(0, '#b49090');
// // Inner color
// gradient.addColorStop(0, 'yellow'); 
// // Outer color
// gradient.addColorStop(1, '#131e3f');

// // Draw the filled circle with the gradient
// ctx.fillStyle = gradient;
// ctx.beginPath();
// ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, 0, 2 * Math.PI);
// ctx.fill();

// // Define the rectangle's position and size
// // X-coordinate
// const rectX = 1000; 
// // Y-coordinate
// const rectY = 50; 
// // Width of the rectangle
// const rectWidth = 1200; 
// // Height of the rectangle
// const rectHeight = 100; 

// // Draw the rectangle
// // Set the fill color (blue with 50% opacity)
// ctx.fillStyle = 'rgba(0, 0, 255, 1)'; 
// ctx.fillRect(rectX, rectY, rectWidth, rectHeight);

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const width = canvas.width;
const height = canvas.height;
const centerX = width / 2;
const centerY = height / 2;
const radius = width / 2;

// Function to draw a wave curve
function drawWaveCurve(ctx, startX, startY, amplitude, frequency, phase, length) {
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    for (let x = startX; x < startX + length; x++) {
        const y = startY + amplitude * Math.sin(frequency * (x - startX) + phase);
        ctx.lineTo(x, y);
    }
    ctx.stroke();
}

// Clear the canvas
ctx.clearRect(0, 0, width, height);
// Save the current context state
ctx.save();

// Translate to the center of the canvas
ctx.translate(centerX, centerY);

// Rotate the context by 45 degrees (in radians)
ctx.rotate(30 * Math.PI / 180);

// Translate back
ctx.translate(-centerX, -centerY);

// Draw the circle
ctx.beginPath();
ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
ctx.clip(); // Clip to the circle area

// Draw multiple wave curves with random distortions
for (let i = 0; i < 50; i++) {
    const startX = centerX - radius;
    const startY = centerY + (Math.random() - 0.5) * radius * 2;
    const amplitude = Math.random() * 10 + 5;
    const frequency = Math.random() * 0.1 + 0.05;
    const phase = Math.random() * Math.PI * 2;
    const length = radius * 2;

    ctx.strokeStyle = `rgba(255, 255, 0, ${Math.random() * 0.5 + 0.5})`; // Random opacity
    ctx.lineWidth = 1; // Thin line
    drawWaveCurve(ctx, startX, startY, amplitude, frequency, phase, length);
}

document.getElementById('openOverlayBtn1').onclick = function() {
    document.getElementById('overlay1').style.display = 'flex';
};
// document.getElementById('openOverlayBtn2').onclick = function() {
//     document.getElementById('overlay2').style.display = 'flex';
// };
document.getElementById('openOverlayBtn3').onclick = function() {
    document.getElementById('overlay3').style.display = 'flex';
};
// document.getElementById('openOverlayBtn4').onclick = function() {
//     document.getElementById('overlay4').style.display = 'flex';
// };

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


document.getElementById('menu-icon').addEventListener('click', function() {
    const navLinks = document.getElementById('nav-links');
    navLinks.classList.toggle('active');
});

document.addEventListener('click', function(event) {
    const navLinks = document.getElementById('nav-links');
    const menuIcon = document.getElementById('menu-icon');
    
    if (navLinks && !navLinks.contains(event.target) && !menuIcon.contains(event.target)) {
        navLinks.classList.remove('active');
    }
});