const canvas =document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const canvasSize=800
restartBtn =document.getElementById("restart")
canvas.width= canvasSize         
canvas.height= canvasSize
let speed =19
let lastPaintTime= 0

const snakeBox = 20

const totalMoves = canvasSize/snakeBox

const apple = new Image()
apple.src="images/apple.png"

//audio files
let dead =new Audio()
let eat =new Audio()
let down =new Audio()
let left =new Audio()
let right =new Audio()
let up =new Audio()

dead.src='audio/dead.mp3'
eat.src='audio/eat.mp3'
down.src='audio/down.mp3'
left.src='audio/left.mp3'
right.src='audio/right.mp3'
up.src='audio/up.mp3'


main()
function main(){
//define snake

let snake=[];
snake[0] ={
    x: 9* snakeBox,
    y: 10* snakeBox
}



//create food
let food={ }
getFood()

//snake score
let score=0

//snake direction

let dir ='';

document.addEventListener('keydown',direction)

function direction(){
    let key = event.keyCode
    if(key==37 && dir!="RIGHT"){
        dir ="LEFT"
        left.play()
    }
    else if(key==38 && dir!="DOWN" ){
        dir ="UP"
        up.play()
    }
    else if(key==39 && dir!= "LEFT"){
        dir ='RIGHT'
        right.play()
    }
    else if(key==40 && dir!="UP"){
        dir='DOWN'
        down.play()
    }
}






//FOOD

function getFood(){
    food={
    x: Math.floor( Math.random()*(totalMoves-2-3)+3 )*snakeBox,
    y: Math.floor( Math.random()*(totalMoves-2-3)+3 )*snakeBox 
    }
}



function SnakeCollision(head,arr){
       for(i=0;i<arr.length;++i){
           if(arr[i].x==head.x && arr[i].y== head.y){
               
               return true;
           }
       }
       return false;
}
//display

function render(){
    // ctx.fillStyle="#7FF318 ";
    ctx.fillStyle="       #4FDC22     ";
        ctx.fillRect(0,0,canvasSize,canvasSize)
    var gr = 
    ctx.createLinearGradient( 9* snakeBox,10* snakeBox, 9* snakeBox+snakeBox , 10* snakeBox+snakeBox);
gr.addColorStop(0, "green");
gr.addColorStop(1, "lightgreen");

    for(i=0;i<snake.length;++i){
        
       ctx. fillStyle = i==0?"#FF9E00 ":"#FFB900";
    //    ctx.beginPath();
    //     ctx.arc(snake[i].x, snake[i].y, snakeBox, 0, 2 * Math.PI);
    //     ctx.fill();
        ctx.fillRect(snake[i].x,snake[i].y,snakeBox,snakeBox)
         ctx.strokeStyle="#2E2E2E"
         ctx.strokeRect(snake[i].x,snake[i].y,snakeBox,snakeBox)
     }


    ctx.drawImage(apple,food.x,food.y,snakeBox,snakeBox)



    let snakeX =snake[0].x
    let snakeY =snake[0].y

    if(dir=="LEFT") snakeX-=snakeBox
    if(dir=="RIGHT") snakeX+=snakeBox
    if(dir=="UP") snakeY-=snakeBox
    if(dir=="DOWN") snakeY+=snakeBox

    
    //if snake eats food
    
    if(snakeX==food.x && snakeY==food.y){
        score++;
        scoreBox.innerHTML ="Score : "+ score
        if(score>hiscorevalue){
            hiscorevalue = score
            localStorage.setItem("hiscore" ,JSON.stringify(hiscorevalue))
            hiScoreBox.innerHTML ="Hiscore : "+hiscorevalue
        }
        eat.play()
        getFood()
    }
    else{
        snake.pop()
    }

    let newHead ={
        x : snakeX,
        y : snakeY
    }

    if(snakeX<0 || snakeX>=canvasSize || snakeY<0 || snakeY>=canvasSize || SnakeCollision(newHead,snake)){
        gameOver()

        return
    }
    snake.unshift(newHead)

   
      
}
function retry(){
    var reset= document.getElementById("restart")
//   reset.style.display="block"
  document.body.onkeyup =function(e){
    if(e.keyCode==32 && flag==1){
        main()
    }
}
//    reset.addEventListener("click",function restart(){
//    if(flag==1){
//        main()
//       reset.style.display="none"
//    }
    
// })
 }

flag =0
render()

var gm = setInterval(render,100)


function gameOver(){
    clearInterval(gm)
    dead.play()
    ctx.fillStyle="white"
    ctx.font="60px cursive"
ctx.fillText("GAME OVER ",canvasSize/2-180,canvasSize/2)
ctx.fillStyle="white"
ctx.font="30px cursive"
ctx.fillText("Click Space Bar to Restart",canvasSize/2-190 ,canvasSize/2+100)
    
    flag=1
    retry()
    
  
}

let hiscore = localStorage.getItem("hiscore")
 if(hiscore === null){
     hiscorevalue = 0
     localStorage.setItem("hiscore",JSON.stringify(hiscorevalue))
 }
 else{
     hiscorevalue = JSON.parse(hiscore)
     hiScoreBox.innerHTML ="Hiscore : " +hiscore
 }

}



// NAMES
// const btn =document.getElementById("btn")
// btn.addEventListener("click",function(){
//     const itxt =document.getElementById("inputText").value
// document.getElementById("outputText").innerHTML =itxt 
// })

