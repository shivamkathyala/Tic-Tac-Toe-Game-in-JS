let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let newGameBtn = document.querySelector("#new-game");
let msgContainer = document.querySelector(".winnerInfo");
let msg = document.querySelector(".msg");
let gameContainer = document.querySelector(".container");

let turnO = true;  //player x, player o
let winner = false; //to track draw
const resetGame = ()=>{
    turnO = true;
    winner = false;
    enableBoxes();
    msgContainer.classList.add("hide");
    gameContainer.classList.remove("rainbow");

};
const winPattern = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];
let clickCount= 0;
boxes.forEach((box) => {
box.addEventListener("click", ()=>{
    gameContainer.classList.add("rainbow");
    clickCount++;
    console.log(clickCount);
    if(turnO){ //player O
        box.innerText = "O";
        turnO = false;
    }else{ //player X
        box.innerText = "X";
        turnO = true;
    }
    box.disabled = true;
    checkWinner();
    if( clickCount === 9 && winner === false){
        console.log("Draw");
        showDraw();
    }

})
    
});

const disableBoxes = ()=>{
    for(let box of boxes){
        box.disabled = true;
    }
};

const enableBoxes = ()=>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
        clickCount= 0;
    }
};

const showWinner = (winner)=>{
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};
const showDraw = ()=>{
    msg.innerText = "The Game is Draw";
    msgContainer.classList.remove("hide");
    disableBoxes();
}
const checkWinner = ()=>{
    for(let pattern of winPattern){
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;
        
        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
           if( pos1Val === pos2Val && pos2Val === pos3Val){
            console.log("Winner", pos1Val);
            showWinner(pos1Val);
            winner = true;
           } 
        }
    }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);