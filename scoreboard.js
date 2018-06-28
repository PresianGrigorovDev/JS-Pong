var canvas = {};
canvas.left = document.getElementById("left_score");
canvas.right = document.getElementById("right_score");

var context = {};
context.left = canvas.left.getContext("2d");
context.right = canvas.right.getContext("2d");


function scoreborad_update () {
    score_draw();
    left_scoreboard_draw();
    right_scoreboard_draw();
}

function draw (contextLR, colorRect, posX, posY, sizeX, sizeY) {
    contextLR.clearRect(posX, posY, sizeX, sizeY);
    contextLR.fillStyle = colorRect;
    contextLR.fillRect(posX, posY, sizeX, sizeY);
}


// Drawing left scoreboard
function left_scoreboard_draw() {
    draw(context.left, "black", 0, 0, canvas.left.width, canvas.right.height);


    context.left.fillStyle = "white";

    context.left.font = " 59px Digital-7 Mono ";
    context.left.fillText("Player", 20, canvas.right.height / 5);

    context.left.font = " 100px Digital-7 Mono ";
    context.left.fillText(playerScore, canvas.left.width / 2.8, canvas.left.height / 2);
}

function right_scoreboard_draw() {
    draw(context.right, "black", 0, 0, canvas.right.width, canvas.right.height);

    context.right.fillStyle = "white";

    context.right.font = " 59px Digital-7 Mono ";
    context.right.fillText("CPU", 60, canvas.right.height / 5);

    context.right.font = " 100px Digital-7 Mono ";
    context.right.fillText(cpuScore, canvas.right.width / 2.6, canvas.right.height / 2);
}

function score_draw() {
    contextCanvas.fillText(cpuScore, canvas.width-100, 100);
}
