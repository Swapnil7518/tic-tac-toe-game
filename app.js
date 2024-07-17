let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn")
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");


let turnO = true; // PlayerX, PlayerO
let count = 0; // To Track Draw

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]

];

const resetGame = () =>{
    turnO = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
}



boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO === true) {
            box.innerHTML = "O";
            turnO = false;
            box.classList.add("o-color");
        } else {
            box.innerHTML = "X";
            turnO = true;
            box.classList.add("x-color");
        }

        box.disabled = true;
        count++;

        let isWinner = checkWinner();
        
        if(count === 9 && !isWinner){
            gameDraw();
        }


    });
});


const gameDraw = () =>{
    msg.innerText = `Game was a Draw`;
    msgContainer.classList.remove("hide");
    disabledBoxes();
}

const disabledBoxes = () =>{
    for(let box of boxes){
        box.disabled = true;
    }
}
const enableBoxes = () =>{
    for(let box of boxes){
        box.disabled = false;
        box.innerHTML ="";

        box.classList.remove("o-color", "x-color");
    }
}


const showWinner = (winner) =>{
    msg.innerHTML =`Congratulataions Winner is ${winner}`
    msgContainer.classList.remove("hide");
    disabledBoxes();
}





const checkWinner = () => {
    for (let patttern of winPatterns) {
        let pos1Val = boxes[patttern[0]].innerHTML;
        let pos2Val = boxes[patttern[1]].innerHTML;
        let pos3Val = boxes[patttern[2]].innerHTML;

        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                console.log("Winner", pos1Val);
                showWinner(pos1Val);
            }
        }
        
    }
}


newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);