const canvas = document.getElementById('illusionCanvas');
const ctx = canvas.getContext('2d');

// Ball properties
const ballRadius = 150;
const numRows = 20; // Rows of 'pixels'
const numCols = 20; // Columns of 'pixels'
const pixelWidth = ballRadius * 2 / numCols; // Width of each pixel
const pixelHeight = ballRadius * 2 / numRows; // Height of each pixel

let cursorX = canvas.width / 2;
let cursorY = canvas.height / 2;

// Function to generate 0's and 1's pattern based on cursor position
function generatePattern() {
    let pattern = [];
    for (let i = 0; i < numRows; i++) {
        pattern[i] = [];
        for (let j = 0; j < numCols; j++) {
            const distance = Math.sqrt(Math.pow(i - numRows / 2, 2) + Math.pow(j - numCols / 2, 2));
            const threshold = ballRadius - 10; // Threshold for the ball's edge
            let pixelOn = 0; // Default is off (0)

            // Calculate the angle of the pixel relative to the light source (cursor)
            const angle = Math.atan2(i - numRows / 2, j - numCols / 2);
            const cursorAngle = Math.atan2(cursorY - canvas.height / 2, cursorX - canvas.width / 2);

            // Check if the pixel is inside the ball
            if (distance < threshold && distance > threshold - 5) {
                // The closer the cursor is to the pixel, the more likely it's "lit up" (1)
                let angleDifference = Math.abs(angle - cursorAngle);
                if (angleDifference < Math.PI / 6) { // Only light up pixels that are close to the cursor's direction
                    pixelOn = 1; // Turn the pixel on (1)
                }
            }
            pattern[i][j] = pixelOn;
        }
    }
    return pattern;
}

// Animation loop
let pattern = generatePattern();

function drawBall() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Loop through the pixel grid and draw each "pixel"
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            if (pattern[i][j] === 1) {
                ctx.fillStyle = "#fff"; // White for "on"
            } else {
                ctx.fillStyle = "#000"; // Black for "off"
            }

            ctx.fillRect(j * pixelWidth, i * pixelHeight, pixelWidth, pixelHeight);
        }
    }
}

// Mousemove event listener to track the cursor position
canvas.addEventListener('mousemove', function(event) {
    cursorX = event.offsetX;
    cursorY = event.offsetY;

    // Update the ball pattern with the new cursor position
    pattern = generatePattern();
    drawBall();
});

// Initial draw
drawBall();
