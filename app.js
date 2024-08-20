let gameSeq = [] ; 
let userSeq = [] ; 

let btns = ["red","yellow","green","purple"] ; 

let started = false ; 
let level = 0 ;
let highScore = 0 ;

let h2 = document.querySelector('h2') ;

let high = document.createElement('h2') ; 
let h1 = document.querySelector('h1') ;
high.innerText = `High Score : ${highScore}`;
h1.insertAdjacentElement("afterend",high);


document.addEventListener('keypress',function(){
    if( started == false ){
        started = true ; 
        // console.log("game started") ; 

        levelUp() ; 
    }
});

function gameFlash(btn){
    btn.classList.add("flash") ;
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
}

function userFlash(btn){
    btn.classList.add("userFlash") ;
    setTimeout(function(){
        btn.classList.remove("userFlash");
    },250);
}

function levelUp(){
    userSeq = [] ;
    level++; 
    h2.innerText = `Level ${level}` ;

    let randIdx = Math.floor(Math.random()*4) ; 
    let randColor = btns[randIdx] ; 
    let randBtn = document.querySelector(`.${randColor}`) ;
    // console.log(randIdx) ;
    // console.log(randColor) ; 
    // console.log(randBtn);
    gameSeq.push(randColor) ;
    // console.log(gameSeq); 
    gameFlash(randBtn) ;
}

function checkAns(index){
    if( userSeq[index] === gameSeq[index] ){
        if( userSeq.length == gameSeq.length ){
            setTimeout(levelUp,1000);
        }
    }
    else{
        if( highScore < level )
            highScore = level ;
        high.innerText = `High Score : ${highScore}`;
        h2.innerHTML = `Game Over! Your Score was <b>${level}</b> <br>Press any key to start.`;
        document.querySelector('body').style.backgroundColor = 'red';
        setTimeout(function(){
            document.querySelector('body').style.backgroundColor = 'white';
        },150);
        reset() ; 
    }
}

function btnPress(){
    // console.log(this) ;
    let btn = this ;  
    userFlash(btn) ; 

    let userColor = btn.getAttribute('id') ; 
    userSeq.push(userColor) ; 

    console.log(userSeq);

    checkAns(userSeq.length-1) ; 
}

let allBtns = document.querySelectorAll('.btn');
for( btn of allBtns ){
   btn.addEventListener('click',btnPress) ;
}

function reset(){
    level = 0 ; 
    started = false ; 
    gameSeq = [] ;
    userSeq = [] ;
}