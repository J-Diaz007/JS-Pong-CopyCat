const canvas = document.getElementById('pong');
const ctx = canvas.getContext('2d');

// PADDLE FUNCTION
function drawRect(x, y, w, h, color){
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}

// CIRCLE FUNCTION
function drawArc(x, y, r, color){
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.closePath();
    ctx.fill();
}

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

// =======MIGHT NEED TO SWITCH TOP AND BOTTOM=====================================================================

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

// MOVE THE BALL
function update(){
    ball.x +=velocity; X+
    ball.y +=velocity; Y+
    if(ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0){
        velocity = - velocityY;
    }
// BALL COLLISION
    if(collision(ball, player)){
        
    }
}




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


// COLLISION DETECTION FUNCTION
// b = ball, p = player
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

// LEFT OFF ON 22 MIN & 30 SECONDS OF VIDEO