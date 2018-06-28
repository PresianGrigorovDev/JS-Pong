var canvasMid = document.getElementById("pong");
var contextCanvas = canvasMid.getContext("2d");

//Gets the mouse possition
canvasMid.addEventListener("mousemove", function (evt) {
    var mousePos = mousePossition(evt);
    paddleY = mousePos.y-(PADDLE_HEIGHT / 2);
});


//Constantly updating the functions
var fps = 50;
setInterval(function (args) {
    drawEverything();
    movement();
    gameSetMatch();
    rampUp();
    scoreborad_update();
    pause();
    }, 1000/fps);

//======================
// Variables, constants
//======================

var ball = {
    posX: canvasMid.width / 2,
    posY: canvasMid.height / 2,
    speedX: 5,
    speedY: 5
};
var cpuM = 6;

var paddleY = 200;
const PADDLE_HEIGHT = 100;
var paddleY_CPU = 200;
const PADDLE_THIC = 10;

var playerScore = 0;
var cpuScore = 0;

var pauseButton = 0; // 1 - yes / 0 - no
var ballSpeed_pause = {
    x: 0,
    y: 0
};

// =========
// Functions
// =========

// Draws the canvasMid, ball, peddals
function drawEverything() {
    cpuMovement();

    //Creating the canvasMid 600/400
    contextCanvas.fillStyle = 'black';
    contextCanvas.fillRect(0, 0, canvasMid.width, canvasMid.height);

    //Creating, animating, making the ball round
    contextCanvas.fillStyle = 'white';
    contextCanvas.beginPath();
    contextCanvas.arc(ball.posX, ball.posY, 6, 0, Math.PI*2, true);
    contextCanvas.fill();

    // Creating the player paddle
    contextCanvas.fillStyle = "white";
    contextCanvas.fillRect(0, paddleY, PADDLE_THIC, 100);

      //Creating the cpu paddle
    contextCanvas.fillStyle = "white";
    contextCanvas.fillRect(canvasMid.width - PADDLE_THIC, paddleY_CPU, 10, 100);
}

// Moves, bounces the ball.
function movement() {
    ball.posX += ball.speedX;
    ball.posY += ball.speedY;

    var deltaY = ball.posY - (paddleY + PADDLE_HEIGHT / 2);
    var deltaY_CPU = ball.posY - (paddleY_CPU + PADDLE_HEIGHT / 2);

    if (ball.posX< 0) {
        if (ball.posY > paddleY && ball.posY < paddleY + PADDLE_HEIGHT) {
            ball.speedX = -ball.speedX;
            ball.speedY = deltaY * 0.35;
        } else {
            ballReset();
            // CPU Scores
            console.log("CPU Scored");
            cpuScore += 1;
        }
    }

    if (ball.posX > canvasMid.width) {
        if (ball.posY > paddleY_CPU && ball.posY < paddleY_CPU + PADDLE_HEIGHT) {
            ball.speedX = -ball.speedX;
            ball.speedY = deltaY_CPU * 0.35;
        } else {
            ballReset();
            // Player Scores + 1
            console.log("Player scored");
            playerScore += 1;
        }
    }
    if (ball.posY < 0 || ball.posY > canvasMid.height) {
        ball.speedY = -ball.speedY;
    }
}

// Registeres the mouse possition
function mousePossition(evt) {
    var rect = canvasMid.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top - root.scrollTop;
    return {
        x: mouseX,
        y: mouseY
    };

}

// Resets the ball, ball speeds
function ballReset() {
    console.log("called: ballReset");
    ball.posX = canvasMid.width / 2;
    ball.posY = canvasMid.height / 2;
    ball.speedY = 5;
    ball.speedX = 5;
}

// AI
function cpuMovement() {
    var paddleCpuCenter = paddleY_CPU + (PADDLE_HEIGHT /2);
    if (paddleCpuCenter < ball.posY - 35) {
    paddleY_CPU += cpuM;
    } else if (paddleCpuCenter > ball.posY + 35) paddleY_CPU -= cpuM;
}

//Resets the game after score = 10
function gameSetMatch() {
    console.log("callet: gameSetMatch");
    if (playerScore === 10 || cpuScore === 10) {
        playerScore = 0;
        cpuScore = 0;
        cpuM = 6;
        ballReset();
    }
}

// Difficulty++
function rampUp() {
    if (playerScore > 5 && playerScore < 9) {
        console.log("Med mode");
        cpuM = 7;
    } else if (playerScore === 9 ) {
        console.log("Hard mode");
        cpuM = 9;
    }
}

function reset() {
    playerScore = 0;
    cpuScore = 0;
    cpuM = 6;

    ballReset();
}

function pause() {
    if (pauseButton === 1) {
        // pause - ON
        ball.speedX = 0;
        ball.speedY = 0;

        contextCanvas.fillStyle = "black";
        contextCanvas.fillRect(0, 0, canvasMid.width / 2, canvasMid.height / 2);

        contextCanvas.fillStyle = "white";
        contextCanvas.font = " 90px Digital-7 Mono";
        contextCanvas.fillText("PAUSE", 200, canvasMid.height / 1.8);
    } else if (pauseButton === 2) {
        // Turning off the pause button
        pauseButton = 0;
        ball.speedX = ballSpeed_pause.x;
        ball.speedY = ballSpeed_pause.y;
    } else if (pauseButton === 0) {
        //pause is off
        ballSpeed_pause.x = ball.speedX;
        ballSpeed_pause.y = ball.speedY;
    }
}