let gameSeq=[];
let userSeq=[];
let highScore=0;
let btns=['red','yellow','green','purple'];

let started=false;
let level=0;
let body=document.querySelector('body')

let h2=document.querySelector('h2');

document.addEventListener('keypress', function(){
    if(started==false){
        console.log('game started');
        started=true;

        levelUp();
    }
});
document.addEventListener('click', function(){
    if(started==false){
        
        console.log('game started');
        started=true;

        levelUp();
    }
});

function gameFlash(btn){
    btn.classList.add('flash')
    setTimeout(function(){
        btn.classList.remove('flash');
    },250);
}
function userFlash(btn){
    btn.classList.add('userflash')
    setTimeout(function(){
        btn.classList.remove('userflash');
    },250);
}

function levelUp(){
    userSeq=[];
    level++;
    h2.innerText=`level ${level}`;
    //random btn choose
    let randIdx=Math.floor(Math.random()*4);
    let randColor=btns[randIdx];
    let randBtn=document.querySelector(`.${randColor}`)

    gameSeq.push(randColor);
    console.log(gameSeq)
    // console.log(randIdx)
    // console.log(randColor)
    // console.log(randBtn)

    gameFlash(randBtn); 
}


function checkAns(idx){

    
    if (userSeq[idx]===gameSeq[idx]){
        

        if(userSeq.length==gameSeq.length){
            // console.log(gameSeq);
            setTimeout(levelUp,1000)
            
        }
    }else{
        if(highScore<=level){
            highScore=level;
        }
        h2.innerHTML=`Game over! Your current score was <b>${level}</b> and your HighScore was ${highScore}, Press any key to start`;
        body.classList.add('danger')
        setTimeout(()=>{
            body.classList.remove('danger')
        },100)
        reset();
    }
}

function btnPress(event){
    // console.log(this)
    event.stopPropagation();
    let btn=this;
    userFlash(btn)
    // console.dir(btn)
    userSeq.push(btn.classList[1]);
    checkAns(userSeq.length-1);
}

let allBtns=document.querySelectorAll('.btn');
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
    
}

function reset(){
    started=false;
    gameSeq=[];
    userSeq=[];
    level=0;
}