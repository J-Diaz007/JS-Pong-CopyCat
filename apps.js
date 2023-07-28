const canvas = document.getElementById('pong');
const ctx = canvas.getContext('2d');

// PADDLE FUNCTION
function drawRect(x, y, w, h, color){
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}

drawRect(0, 0, canvas.width, canvas.height, "black");

// CIRCLE FUNCTION
function drawArc(x, y, r, color){
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.closePath();
    ctx.fill();
}

drawArc()

// TEXT FUNCTION
function drawText(text, x, y, color){
    ctx.fillStyle = 'white';
    ctx.font = '75px fantasy';
    ctx.fillText(text, x, y);
}

// HOW TO MOVE A RECTANGLE TO THE RIGHT
// let rectX = 0;
// function render(){
//     drawRect(0, 0, 600, 400, 'black');
//     drawRect(rectX, 100, 100, 100, 'white');
//     rectX = rextX + 100;
// }
// setInterval(render, 1000);


// DRAW USER PADDLE
const user = {
    x: 0,
    y: canvas.height/2 - 50,
    width: 20,
    height: 100,
    color: '#60bae6',
    score: 0,
}
 

// DRAW COMPUTER PADDLE
const comp = {
    x: canvas.width - 20,
    y: canvas.height/2 - 50,
    width: 20,
    height: 100,
    color: 'RED',
    score: 0,
}

// DRAW THE NET
const net = {
    X: canvas.width/2 -2/2,
    y: 0,
    width: 2,
    height: 10,
    color: 'wHITE',
}

function drawNet(){
    for(let i = 0; i <= canvas.height; i+=15){
        drawRect(net.x, net.y + i, net.width, net.height, net.color);
    }
}

// DRAW THE BALL
const ball = {
    x: canvas.width/2,
    y: canvas.height/2,
    radius: 10,
    speed: 5,
    velocityX: 5,
    velocityY: 5,
    color: 'WHITE',
}

// RESET BALL FUNCTION
function resetBall(){
    ball.x = canvas.width/2;
    ball.y = canvas.height/2;
    ball.speed = 5;
    ball.velocityX = -ball.velocityX;
}

// MOVE THE BALL
function update(){
    ball.x +=velocity; X+
    ball.y +=velocity; Y+
    if(ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0){
        velocity = - velocityY;
    }
    // BALL COLLISION
    let user = (ball.x < canvas.width/2) user: comp;

    if(collision(ball, user)){
        // WHERE THE BALL HITS THE PADDLE
        let collidePoint = (ball.y - (user.y + user.height/2));
        collidePoint = collidePoint/(user.height/2);
        let angleRad = (Math.PI/4) * collidePoint;

        // DIRECTION OF BALL WHEN IT HITS A PADDLE
        let direction = (ball.x < canvas.width/2) ? 1 : -1;

        ball.velocityX =  ball.speed * Math.cos(angleRad);
        ball.velocityY =  ball.speed * Math.sin(angleRad);

        // EVERY TIME THE BALL IS HIT THE SPEED INCREASES
        ball.speed += 0.1;
        
    }
    
    // UPDATES THE SCORE & RESETS THE BALL
    if(ball.x - ball.radius < 0){
        comp.score++;
        resetBall();
    }else if(ball.x + ball.radius > canvas.width){
        user.score++;
    }
}

// COLLISION DETECTION FUNCTION
// b = ball, u = user
function collison (b, p){
    p.top = p.y;
    p.bottom = p.y + p.height;
    p.left = p.x;
    p.right = p.x + p.width;

    b.top = b.y - b.radius;
    b.bottom = b.y + b.radius;
    b.left = b.x - b.radius;
    b.right = b.x + b.radius;

    return b.right > p.left && b.btop < p.bottom && b.left < p.right && b.bottom > p.top;
}

// CONTROL THE USER'S PADDLE
canvas.addEventListener('mousemove', movePaddle);
function movePaddle(evt){
    let rect = canvas.getBoundingClientRect();
    user.y = evt.clientY - rect.top - user.height/2;
}

// AI TO CONTROL THE COMP PADDLE
let computerLevel = 0.1;
comp.y += (ball.y - (comp.y + comp.height/2)) * computerLevel;

// RENDER THE GAME
function render(){
    drawRect(0, 0, canvas.width, canvas.height, 'black');
    drawText(user.score,canvas.width/4,canvas.height/5, 'white');
    drawText(comp.score,3*canvas.width/4,canvas.height/5, 'white');
    drawNet();
    drawRect(user.x, user.y, user.width, user.height, user.color);
    drawRect(comp.x, comp.y, comp.width, comp.height, comp.color);
    drawArc(ball.x, ball.y, ball.radius, ball.color);
}

function game(){
    render();
}

const framePerSecond = 50;
setInterval(game, 1000/framePerSecond);


