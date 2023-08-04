const canvas = document.getElementById('pong');
const ctx = canvas.getContext('2d');

// RECTANGLE FUNCTION
function drawRect(x,y,w,h,color){
    ctx.fillStyle = color;
    ctx.fillRect(x,y,w,h);
}


// CIRCLE FUNCTION
function drawCircle(x, y, r, color){
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.closePath();
    ctx.fill();
}


// TEXT FUNCTION
function drawText(text, x, y, color){
    ctx.fillStyle = 'white';
    ctx.font = '45px fantasy';
    ctx.fillText(text,x,y);
}

// // HOW TO MOVE A RECTANGLE TO THE RIGHT
// // let rectX = 0;
// // function render(){
// //     drawRect(0, 0, 600, 400, 'black');
// //     drawRect(rectX, 100, 100, 100, 'white');
// //     rectX = rextX + 100;
// // }
// // setInterval(render, 1000);

// SOUND EFFECTS
const hit = new Audio();
const win = new Audio();

hit.src = "sfx/hit.mp3";
win.src = "sfx/win.mp3"

// // CREATE USER PADDLE
const user = {
    x: 0,
    y: canvas.height/2 - 50,
    width: 20,
    height: 100,
    color: '#60bae6',
    score: 0,
}
 
// CONTROL THE USER'S PADDLE
canvas.addEventListener('mousemove', movePaddle);

function movePaddle(evt){
    let rect = canvas.getBoundingClientRect();
    user.y = evt.clientY - rect.top - user.height/2;
}


// // CREATE COMPUTER PADDLE
const comp = {
    x: canvas.width - 20,
    y: canvas.height/2 - 50,
    width: 20,
    height: 100,
    color: 'RED',
    score: 0,
}


// // CREATE THE NET
const net = {
    x: canvas.width/2 - 1,
    y: 0,
    width: 2,
    height: 10,
    color: 'white',
}

// DRAW THE NET
function drawNet(){
    for(let i = 0; i <= canvas.height; i+=15){
        drawRect(net.x, net.y + i, net.width, net.height, net.color);
    }
}

// // DRAW THE BALL
const ball = {
    x: canvas.width/2,
    y: canvas.height/2,
    radius: 10,
    speed: 5,
    velocityX: 5,
    velocityY: 5,
    color: 'white',
}

// RESET BALL FUNCTION
function resetBall(){
    ball.x = canvas.width/2;
    ball.y = canvas.height/2;
    ball.speed = 5;
    ball.velocityX = -ball.velocityX;
}

// // COLLISION DETECTION FUNCTION
// // b = ball, p = paddle
function collison (b, p){
    p.top = p.y;
    p.bottom = p.y + p.height;
    p.left = p.x;
    p.right = p.x + p.width;

    b.top = b.y - b.radius;
    b.bottom = b.y + b.radius;
    b.left = b.x - b.radius;
    b.right = b.x + b.radius;

    return p.left < b.right && p.top < b.bottom && p.right > b.left && p.bottom > b.top;
}

// GAME OVER FUNCTION
function gameOver() {
    let startDiv = document.getElementById('start');
    let gameCanvas = document.getElementById('pong');
    let gameOver = document.getElementById('game-over');
    startDiv.style.display = 'none';
    gameCanvas.style.display = 'none';
    gameOver.style.display = 'block';
    // resetBall();
    clearInterval(loop);
}

// FUNCTION UPDATES EVERYTHING
function update(){
    // // MOVE THE BALL
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
    
    // AI TO CONTROL THE COMP PADDLE
    const computerLevel = 0.1;
    comp.y += (ball.y - (comp.y + comp.height/2)) * computerLevel;

    // BALL HITS TOP AND BOTTOM OF SCREEN
    if(ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0){
        ball.velocityY = -ball.velocityY;
    }

    // BALL COLLISION
    const player = (ball.x + ball.radius < canvas.width/2) ? user : comp;

    if(collison(ball,player)){
        // WHERE THE BALL HITS THE PADDLE
        hit.play();
        let collidePoint = (ball.y - (player.y + player.height/2));
        collidePoint = collidePoint / (player.height/2);
        let angleRad = collidePoint * Math.PI/4;

        // DIRECTION OF BALL WHEN IT HITS A PADDLE
        let direction = (ball.x + ball.radius < canvas.width/2) ? 1 : -1;
        ball.velocityX = direction * ball.speed * Math.cos(angleRad);
        ball.velocityY = ball.speed * Math.sin(angleRad);

        // EVERY TIME THE BALL IS HIT THE SPEED INCREASES
        ball.speed += 0.5;
    }

    // UPDATES THE SCORE & RESETS THE BALL
    if(ball.x - ball.radius < 0){
        comp.score++;
        if(user.score >= 10){
            document.write("You win!");
            gameOver();
            return;
        }
        resetBall();
    }else if(ball.x + ball.radius > canvas.width){
        user.score++;
        if(comp.score >= 10){
            document.write('You Lose!')
            gameOver();
            return;
        }
        resetBall()
        }
}

// CHECK SCORE FUNCTION


    

// // RENDER THE GAME
function render(){
    drawRect(0, 0, canvas.width, canvas.height, 'black');
    // DRAW USER SCORE
    drawText(user.score,canvas.width/4,canvas.height/5, 'white');
    // DRAW COMPUTER SCORE
    drawText(comp.score,3*canvas.width/4,canvas.height/5, 'white');
    drawNet();
    drawRect(user.x, user.y, user.width, user.height, user.color);
    drawRect(comp.x, comp.y, comp.width, comp.height, comp.color);
    drawCircle(ball.x, ball.y, ball.radius, ball.color);
}

function game(){
    update();
    render();
}


// START GAME FUNCTION
function startGame() {
    let startDiv = document.getElementById('start');
    let gameCanvas = document.getElementById('pong');
    let gameOver = document.getElementById('game-over');
    startDiv.style.display = 'none';
    gameCanvas.style.display = 'block';
    gameOver.style.display = 'none';
    update();
    render();
}

// LOOP
const framePerSecond = 60;
const loop = setInterval(game, 1000/framePerSecond);
