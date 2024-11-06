document.getElementById('menu-icon').addEventListener('click', function() {
    const navLinks = document.getElementById('nav-links');
    navLinks.classList.toggle('active');
});

const canvasIds = ['myCanvas', 'myCanvas-2', 'myCanvas-3', 'myCanvas-4', 'myCanvas-5', 'myCanvas-6', 'myCanvas-7'];

canvasIds.forEach(id => {
    const canvas = document.getElementById(id);
    const ctx = canvas.getContext('2d');
    // Define the gradient colors and starting/ending points
    const gradient = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, 0, canvas.height / 2, canvas.width);
    gradient.addColorStop(0, '#b49090'); // Inner color
    gradient.addColorStop(1, '#EBEBEB'); // Outer color
    // Draw the filled circle with the gradient
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, 0, 2 * Math.PI);
    ctx.fill();
});



// const canvas = document.getElementById('myCanvas');
// const ctx = canvas.getContext('2d');
// const width = canvas.width;
// const height = canvas.height;
// const centerX = width / 2;
// const centerY = height / 2;
// const radius = width / 2;

// // Function to draw a wave curve
// function drawWaveCurve(ctx, startX, startY, amplitude, frequency, phase, length) {
//     ctx.beginPath();
//     ctx.moveTo(startX, startY);
//     for (let x = startX; x < startX + length; x++) {
//         const y = startY + amplitude * Math.sin(frequency * (x - startX) + phase);
//         ctx.lineTo(x, y);
//     }
//     ctx.stroke();
// }

// // Clear the canvas
// ctx.clearRect(0, 0, width, height);
// // Save the current context state
// ctx.save();

// // Translate to the center of the canvas
// ctx.translate(centerX, centerY);

// // Rotate the context by 45 degrees (in radians)
// ctx.rotate(30 * Math.PI / 180);

// // Translate back
// ctx.translate(-centerX, -centerY);

// // Draw the circle
// ctx.beginPath();
// ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
// ctx.clip(); // Clip to the circle area

// // Draw multiple wave curves with random distortions
// for (let i = 0; i < 50; i++) {
//     const startX = centerX - radius;
//     const startY = centerY + (Math.random() - 0.5) * radius * 2;
//     const amplitude = Math.random() * 10 + 5;
//     const frequency = Math.random() * 0.1 + 0.05;
//     const phase = Math.random() * Math.PI * 2;
//     const length = radius * 2;

//     ctx.strokeStyle = `rgba(0, 0, 0, ${Math.random() * 0.5 + 0.5})`; // Random opacity
//     ctx.lineWidth = 1; // Thin line
//     drawWaveCurve(ctx, startX, startY, amplitude, frequency, phase, length);
// }