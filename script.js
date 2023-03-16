// Define canvas and context
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

// Define ball and paddles
var ball = {x: canvas.width / 2, y: canvas.height / 2, radius: 10, dx: 5, dy: 5};
var leftPaddle = {x: 0, y: canvas.height / 2 - 50, width: 10, height: 100};
var rightPaddle = {x: canvas.width - 10, y: canvas.height / 2 - 50, width: 10, height: 100};

// Define score
var leftScore = 0;
var rightScore = 0;

// Define key listeners
document.addEventListener("keydown", function(event) {
	if (event.keyCode == 38) { // Up arrow
		rightPaddle.y -= 20;
	}
	else if (event.keyCode == 40) { // Down arrow
		rightPaddle.y += 20;
	}
});

// Define game loop
function gameLoop() {
	// Clear canvas
	context.clearRect(0, 0, canvas.width, canvas.height);

	// Draw ball
	context.beginPath();
	context.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
	context.fill();

	// Draw left paddle
	context.fillRect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height);

	// Draw right paddle
	context.fillRect(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height);

	// Update ball position
	ball.x += ball.dx;
	ball.y += ball.dy;

	// Check ball collision with top/bottom walls
	if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
		ball.dy *= -1;
	}

	// Check ball collision with left paddle
	if (ball.x - ball.radius < leftPaddle.x + leftPaddle.width && ball.y > leftPaddle.y && ball.y < leftPaddle.y + leftPaddle.height) {
		ball.dx *= -1;
	}

	// Check ball collision with right paddle
	if (ball.x + ball.radius > rightPaddle.x && ball.y > rightPaddle.y && ball.y < rightPaddle.y + rightPaddle.height) {
		ball.dx *= -1;
	}

	// Check ball collision with left/right walls
	if (ball.x - ball.radius < 0) {
		rightScore++;
		resetBall();
	}
	else if (ball.x + ball.radius > canvas.width) {
		leftScore++;
		resetBall();
	}

	// Draw score
	context.fillText("Pong points: " + leftScore + " - " + rightScore, canvas.width / 2, 20);

	// Request animation frame
	requestAnimationFrame(gameLoop);
}

// Define function to reset ball position
function resetBall() {
	ball.x = canvas.width / 2;
	ball.y = canvas.height / 2;
	ball.dx *= -1;
	ball.dy *= -1;
}

//
