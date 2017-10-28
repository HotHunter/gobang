var me = true;
var chessBoard = [];

for(var i=0; i<15 ; i++){
    chessBoard[i] = [];
    for(var j=0; j<15 ; j++){
        chessBoard[i][j] = 0;
    } 
}

var chess = document.getElementById('chess');
var context = chess.getContext('2d');
var bg = new Image();
bg.src = "bg.jpg";

context.strokeStyle = "#888"

//加载
bg.onload = function(){
    context.drawImage(bg, 0, 0, 450, 450)
    drawChessLine();
}

//画棋盘
var drawChessLine = function(){
    for(var i=0; i<15; i++){
        context.moveTo(15 + i*30, 15);
        context.lineTo(15 + i*30, 435);
        context.moveTo(15, 15 + i*30);
        context.lineTo(435,15 + i*30);
        context.stroke();
    }
    context.moveTo(16, 16);
    context.lineTo(434, 434);
    context.moveTo(16, 434);
    context.lineTo(434, 16)
    context.stroke();
}

//落子
var oneStep = function(i, j, me){
    context.beginPath();
    context.arc(15 + i*30, 15 + j*30, 13, 0, 2 * Math.PI);
    context.closePath();
    var gradient = context.createRadialGradient(15 + i*30 +2, 15 + j*30 -2, 13, 15 + i*30+2, 15 + j*30-2, 0);
    if(me){
        gradient.addColorStop(0, "#0a0a0a");
        gradient.addColorStop(1, "#636766");
    }else{
        gradient.addColorStop(0, "#d1d1d1");
        gradient.addColorStop(1, "#f9f9f9")
    }
    context.fillStyle = gradient;
    context.fill();
}


chess.onclick = function(e){
    if(over){
        return;
    }
    if(!me){
        return;
    }
    var x = e.offsetX;
    var y = e.offsetY;
    var i = Math.floor(x / 30);
    var j = Math.floor(y / 30);
    if(chessBoard[i][j] == 0){
        oneStep(i, j, me);
        chessBoard[i][j] = 1;
        for(var k=0; k<count;k++){
            if(wins[i][j][k]){
                myWin[k]++;
                computerWin[k] = 6;
                if(myWin[k] == 5){
                    alert("you win!");
                    over = true;
                }
            }
        }
        if(!over){
            me = !me;
            computerAI();
        }
    }
}