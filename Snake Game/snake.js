//board

var blockSize = 25;
var rows = 30;
var cols = 30;
var board;
var context;

//snakes head
var snakeX = blockSize*5;
var snakeY = blockSize*5;

//snake body
var snakeBody =[];

//snakes movement
var velocityX = 0;
var velocityY = 0;

//game over element
var gameOver = false;


//snakes food
var foodX = blockSize*10;
var foodY = blockSize*10;

window.onload = function(){
    board = document.getElementById("board");
    board.height = rows*blockSize;
    board.width = cols*blockSize;
    context = board.getContext("2d");

    placeFood();
    document.addEventListener("keyup", changeDirection);

    //update();
    setInterval(update,75); // every 100ms it updates
}

function update(){

    if(gameOver)
    {
        return;
    }


    context.fillStyle = "black";
    context.fillRect(0,0,board.width,board.height);

    context.fillStyle = "lime";
    context.fillRect(snakeX,snakeY,blockSize,blockSize);  // created our snake block coloured in lime

    for(let i = 0;i < snakeBody.length;i++)
    {
        context.fillRect(snakeBody[i][0],snakeBody[i][1],blockSize,blockSize);
    }

    context.fillStyle = "red";
    context.fillRect(foodX,foodY,blockSize,blockSize); // created our food 

    snakeX += velocityX*blockSize;
    snakeY += velocityY*blockSize;  

    if(snakeX == foodX && snakeY == foodY)
    {
        snakeBody.push([foodX,foodY]);
        placeFood();
    }

    for(let i = snakeBody.length-1;i>0;i--)
    {
        snakeBody[i] = snakeBody[i-1];
    }

    if(snakeBody.length)
    {
        snakeBody[0] = [snakeX,snakeY];
    }


    


}

function changeDirection(e){
    if(e.code == "KeyW" && velocityY != 1)
    {
        velocityX = 0;
        velocityY = -1;
    }

    else if(e.code == "KeyS" && velocityY != -1)
    {
        velocityX = 0;
        velocityY = 1;
    }

    else if(e.code == "KeyA" && velocityX != 1)
    {
        velocityX = -1;
        velocityY = 0;
    }

    if(e.code == "KeyD" && velocityX != -1)
    {
        velocityX = 1;
        velocityY = 0;
    }
}

function placeFood(){   //food appears at random locations
    foodX = Math.floor(Math.random()*cols)*blockSize;
    foodY = Math.floor(Math.random()*cols)*blockSize;
}