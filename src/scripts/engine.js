const state = {
    view:{squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        tiempoRestante: document.querySelector("#segundos"),
        puntos: document.querySelector("#puntos"),
        vidas: document.querySelector("#vidas")
    },
    values:{
        gameVelocity:1000,
        hitPosition: 0,
        result: 0,
        currentTime:60,
        vidas:4,
    },
    actions:{
        timerID: setInterval(randomSquare,1000),
        countDownTimerId: setInterval(countDown,1000),
    }
};

function countDown(){
    state.values.currentTime--;
    state.view.tiempoRestante.textContent= state.values.currentTime;
    if(state.values.currentTime<=0 || state.values.vidas<=0){
        alert("Game Over! Su resultado fue de "+state.values.result+" puntos")
    }
}

function playSound(){
    let audio= new Audio("./src/sonido/audio.m4a");
    audio.volume = 0.2;
    audio.play();
}
function randomSquare(){
    state.view.squares.forEach((square)=>{
        square.classList.remove("enemy"); 
    });
    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition=randomSquare.id;
}

function addListenerHitBox(){
    state.view.squares.forEach((square)=>{
        square.addEventListener("mousedown",()=>{
            if(square.id===state.values.hitPosition){
                state.values.result++;
                state.view.puntos.textContent=state.values.result;
                state.values.hitPosition = null;
                playSound();
            }
            else if(square.id!=state.values.hitPosition){
                state.values.vidas--;
                state.view.vidas.textContent=state.values.vidas;
            }
        });
    });
}

function main(){
    addListenerHitBox();
}

main();

