// ===== Variables declaration ===== //
const canvas = document.getElementById("canv");
const ctx = canvas.getContext("2d");
// Ball Radius
const ballRadius = 10;
// Canvas variables
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;
// Paddle
const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;
let rightPressed = false;
let leftPressed = false;
// Bricks
let brickRowCount = 3;
let brickColumnCount = 5;
let brickWidth = 75;
let brickHeight = 20;
let brickPadding = 10;
let brickOffsetTop = 30;
let brickOffsetLeft = 30;
// Score
let score = 0;
// Lives
let lives = 3;

// We will hold the bricks in a two dimensional array
let bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
	bricks[c] = [];
	for (let r = 0; r < brickRowCount; r++) {
		bricks[c][r] = { x: 0, y: 0 , status: 1 };
	}
}

// Event Handlers for the paddle
// Keyboard
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
function keyDownHandler(e) {
	if (e.keyCode == 39) rightPressed = true;
	else if (e.keyCode == 37) leftPressed = true;
}
function keyUpHandler(e) {
	if (e.keyCode == 39) rightPressed = false;
	else if (e.keyCode == 37) leftPressed = false;
}
// Mouse
document.addEventListener('mousemove', mouseMoveHandler, false);
function mouseMoveHandler(e) {
    let relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth/2;
    }
}

// Collision detection bricks-ball
function collisionDetection() {
    for (let c=0; c<brickColumnCount; c++) {
        for (let r=0; r<brickRowCount; r++) {
            let b = bricks[c][r];
            if (b.status == 1) {
                if(x > b.x && x < b.x+brickWidth && y < b.y && y < b.y+brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if(score == brickRowCount*brickColumnCount) {
                        alert("YOU WIN, CONGRATULATIONS!");
                        document.location.reload();
                    }
                }
            }
        }
    }
}

// Counting the score
function drawScore() {
    ctx.font = '16px Arial';
    ctx.fillStyle = '#0095DD';
    ctx.fillText('Score: ' + score, 8, 20);
}

// Draw lives
function drawLives() {
    ctx.font = '16px Arial';
    ctx.fillStyle = '#0095DD';
    ctx.fillText('Lives: ' + lives, canvas.width-65, 20);
}

// Draw the ball
function drawBall() {
	ctx.beginPath();
	ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
	ctx.fillStyle = "#0095DD";
	ctx.fill();
	ctx.closePath();
}

function drawPaddle() {
	ctx.beginPath();
	ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
	ctx.fillStyle = "#0095DD";
	ctx.fill();
	ctx.closePath();
}

// Draw bricks
function drawBricks() {
    for(let c=0; c<brickColumnCount; c++) {
        for(let r=0; r<brickRowCount; r++) {
            if (bricks[c][r].status ==1) {
                let brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                let brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

// Clear the context at each frame
function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawBricks();
	drawBall();
    drawPaddle();
    drawScore();
    drawLives();
    collisionDetection();

	// Ball collision
	// Collision for x coordinates
	if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) dx = -dx;
	// Collision for y coordinates (we only need top, so we'll comment it out)
	// if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) dy = -dy;
	if (y + dy < ballRadius) {
		dy = -dy;
	} else if (y + dy > canvas.height - ballRadius) {
		if (x > paddleX && x < paddleX + paddleWidth) {
			dy = -dy;
		} else {
			lives--;
            if(!lives) {
                alert("GAME OVER");
                document.location.reload();
            }
            else {
                x = canvas.width/2;
                y = canvas.height-30;
                dx = 2;
                dy = -2;
                paddleX = (canvas.width-paddleWidth)/2;
            }
		}
	}
	x += dx;
	y += dy;

	// Paddle Movement
	if (rightPressed && paddleX < canvas.width - paddleWidth) {
		paddleX += 7;
	} else if (leftPressed && paddleX > 0) {
		paddleX -= 7;
    }
    requestAnimationFrame(draw);
}

// Draw every 10ms
draw();
