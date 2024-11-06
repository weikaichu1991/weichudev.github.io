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
    gradient.addColorStop(0, 'yellow'); // Inner color
    gradient.addColorStop(1, '#EBEBEB'); // Outer color
    // Draw the filled circle with the gradient
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, 0, 2 * Math.PI);
    ctx.fill();
});


