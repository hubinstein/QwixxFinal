// Import the functions you need from the SDKs you need - https://firebase.google.com/docs/web/learn-more#available-libraries
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";

/* ========================== FIREBASE ========================== */

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDSGqpW0mAKDHXRMLsGmu5MLPhOKXF9ET0",
  authDomain: "qwixx-4bd0f.firebaseapp.com",
  databaseURL: "https://qwixx-4bd0f-default-rtdb.firebaseio.com",
  projectId: "qwixx-4bd0f",
  storageBucket: "qwixx-4bd0f.firebasestorage.app",
  messagingSenderId: "620385578938",
  appId: "1:620385578938:web:4fdd9a96e9306c7ae43783",
  measurementId: "G-ZBDVKH4BDG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);
let allButtons={
  red: document.getElementById("red-die"),
  yellow: document.getElementById("yellow-die"),
  blue: document.getElementById("blue-die"),
  green: document.getElementById("green-die"),
  white1: document.getElementById("white-die1"),
  white2: document.getElementById("white-die2"),
  roller: document.getElementById('turn-ender'),
  penalizer: document.getElementById('penalty')

}
let gameObject = {};
onValue(ref(database, `games/test`), (snapshot) => {
  const data = snapshot.val();
  gameObject=data;
  updateBoard();
});
window.newGame = () => {
  gameObject = {
    id:'test',
    gameEnded:false,
    player1: {
      user: {
        name:'',
      },
      board: {
        red: {
          highestMarked: 0,
          xCount: 0,
        },
        blue: {
          highestMarked: 0,
          xCount: 0,
        },
        green: {
          highestMarked: 0,
          xCount: 0,
        },
        yellow: {
          highestMarked: 0,
          xCount: 0,
        }
      },
      penalty: 0,
      score: 0,
    },
    player2: {},
    locks: {
      red:false,
      yellow:false,
      blue:false,
      green:false,
      number:0
    },
    dice: {
      red: 0,
      yellow: 0,
      green: 0,
      blue: 0,
      white1: 0,
      white2: 0
    },
    gameState:{
      hasNotRolled:true,
      choiceNotPlayed:true,
      choiceStarted:false,
      whichWhitePressed:null
    }
  }
  let i = 0;
  while(i<44){
    Object.entries(board_list)[i][1].style.opacity='1';
    i++;
  }
  board_list[red12].style.opacity='0.5';
  board_list[yellow12].style.opacity='0.5';
  board_list[green12].style.opacity='0.5';
  board_list[blue12].style.opacity='0.5';
  document.getElementById('score').innerHTML = '';
  tutorial.style.display="block";
  updateGame();
}
function updateGame(){
  set(ref(database, `games/${gameObject.id}`), gameObject)
    .then(
      ()=>{
        console.log('%c SUCCESS', 'background: green');
        updateBoard(); // Data saved   successfully!
      })
    .catch((error) => {
      console.log('%c ERROR:', 'background: red', error); // The write  failed...
    });
  updateBoard();
}
/* ------------------------ */
let tutorial = document.getElementById('tutorial');
let board_list = {
    red2: document.getElementById('red-row2'),
    red3: document.getElementById('red-row3'),
    red4: document.getElementById('red-row4'),
    red5: document.getElementById('red-row5'),
    red6: document.getElementById('red-row6'),
    red7: document.getElementById('red-row7'),
    red8: document.getElementById('red-row8'),
    red9: document.getElementById('red-row9'),
    red10: document.getElementById('red-row10'),
    red11: document.getElementById('red-row11'),
    red12: document.getElementById('red-row12'),
    yellow2: document.getElementById('yellow-row2'),
    yellow3: document.getElementById('yellow-row3'),
    yellow4: document.getElementById('yellow-row4'),
    yellow5: document.getElementById('yellow-row5'),
    yellow6: document.getElementById('yellow-row6'),
    yellow7: document.getElementById('yellow-row7'),
    yellow8: document.getElementById('yellow-row8'),
    yellow9: document.getElementById('yellow-row9'),
    yellow10: document.getElementById('yellow-row10'),
    yellow11: document.getElementById('yellow-row11'),
    yellow12: document.getElementById('yellow-row12'),
    green2: document.getElementById('green-row2'), //green and blue 2 refers to green and blue 12 because I'm lazy
    green3: document.getElementById('green-row3'),
    green4: document.getElementById('green-row4'),
    green5: document.getElementById('green-row5'),
    green6: document.getElementById('green-row6'),
    green7: document.getElementById('green-row7'),
    green8: document.getElementById('green-row8'),
    green9: document.getElementById('green-row9'),
    green10: document.getElementById('green-row10'),
    green11: document.getElementById('green-row11'),
    green12: document.getElementById('green-row12'),
    blue2: document.getElementById('blue-row2'),
    blue3: document.getElementById('blue-row3'),
    blue4: document.getElementById('blue-row4'),
    blue5: document.getElementById('blue-row5'),
    blue6: document.getElementById('blue-row6'),
    blue7: document.getElementById('blue-row7'),
    blue8: document.getElementById('blue-row8'),
    blue9: document.getElementById('blue-row9'),
    blue10: document.getElementById('blue-row10'),
    blue11: document.getElementById('blue-row11'),
    blue12: document.getElementById('blue-row12')}

function updateBoard(){
  allButtons.penalizer.innerText=`Penalty: ${gameObject.player1.penalty}`;
  for(let i=0; i<colors.length; i++){
    let color = colors[i];
    document.getElementById(color+'XCount').innerText=gameObject.player1.board[color].xCount;
    let j=0;
    while (j<gameObject.player1.board[color].highestMarked-1){      
      if (color==='red'){Object.entries(board_list)[j][1].style.opacity=0;}
      else if (color==='yellow'){Object.entries(board_list)[j+11][1].style.opacity=0;}
      else if (color==='green'){Object.entries(board_list)[j+22][1].style.opacity=0;}
      else if (color==='blue'){Object.entries(board_list)[j+33][1].style.opacity=0;}
      j++;
    }
    if (gameObject.player1.board[color].xCount===5){
      board_list[color+'12'].style.opacity = '1';
    }
  }
  if (gameObject.gameEnded){
    document.getElementById('score').innerText = `Game ended, FINAL SCORE: ${gameObject.player1.score}`;
    tutorial.style.display="none";
  }
  allButtons.red.innerText = gameObject.dice.red.toString();
  allButtons.yellow.innerText = gameObject.dice.yellow.toString();
  allButtons.green.innerText = gameObject.dice.green.toString();
  allButtons.blue.innerText = gameObject.dice.blue.toString();
  allButtons.white1.innerText = gameObject.dice.white1.toString();
  allButtons.white2.innerText = gameObject.dice.white2.toString();
  if (gameObject.gameState.choiceStarted){
    tutorial.innerText='click a color(one of the dice)';
  }
  else if (gameObject.gameState.hasNotRolled){
    tutorial.innerText='click roll';
  }
  else if (gameObject.gameState.whichWhitePressed){
    tutorial.innerText='click another dice';
  }
  else{
    tutorial.innerText='select a white die, take a penalty to roll, or if you have made a move, you can roll without penalty';
  }
  //-------------UPDATING DICE BORDERS-------------
  allButtons.white1.style.borderColor='black';
  allButtons.white2.style.borderColor='black';
  if (!gameObject.gameState.hasNotRolled){
    if (gameObject.gameState.whichWhitePressed==='white1'){
      allButtons.white1.style.borderColor='red';
      allButtons.white2.style.borderColor='black';
    }
    else if (gameObject.gameState.whichWhitePressed==='white2'){
      allButtons.white2.style.borderColor='red';
      allButtons.white1.style.borderColor='black';
    }
    if (gameObject.gameState.choiceStarted){
      allButtons.white1.style.borderColor='red';
      allButtons.white2.style.borderColor='red';
    }
  }
  //-----------------------------------------------
}


let colors = ['red','green','blue','yellow'] // ENUM
function diePressed(color){
  if (!gameObject.gameEnded&&!gameObject.gameState.hasNotRolled){
    let otherWhite='';
    console.log(color, ' pressed');
    if (color==='white1'){
      otherWhite='white2';
    }
    else if (color==='white2'){
      otherWhite='white1';
    }
    //----setting the other white----
    //--------------WHITE DIE STUFF --------------
    if (otherWhite){
      //------Trying to play choice or switch to other non-choice--------
      if (gameObject.gameState.whichWhitePressed===otherWhite){
        //------------playing choice---------
        if (gameObject.gameState.choiceNotPlayed){
          gameObject.gameState.whichWhitePressed=null;
          gameObject.gameState.choiceStarted=true;
        }
        //-------switching choice to non-choice------
        else{
          gameObject.gameState.whichWhitePressed=color;
        } 
      }
      //---------------Trying to play non-choice or undo choice----------
      else if (!gameObject.gameState.whichWhitePressed){
        if(gameObject.gameState.choiceStarted){
          gameObject.gameState.choiceStarted=false;
          gameObject.gameState.whichWhitePressed=otherWhite;
        }
        //--------------playing non-choice---------
        else {
          gameObject.gameState.whichWhitePressed=color;
        }
      }
      //--------------------trying to undo non-choice-------------
      else{
        gameObject.gameState.whichWhitePressed=null;
      }
    }
    //--------------COLOR STUFF --------------
    else{
      //-----------choice--------------
      if(gameObject.gameState.choiceStarted){
        if (mark(color, gameObject.dice.white1+gameObject.dice.white2)!='failed'){
          gameObject.gameState.choiceNotPlayed=false;
          gameObject.gameState.choiceStarted=false;
        }
        else{
          alert('you can\'t do that');
        }
      }
      //---------non-choice--------
      else if (gameObject.gameState.whichWhitePressed){
        if (mark(color, gameObject.dice[color]+gameObject.dice[gameObject.gameState.whichWhitePressed])!='failed'){
          gameObject.gameState.whichWhitePressed=null;
          gameObject.gameState.hasNotRolled=true;
        }
        else{
          alert('you can\'t do that');
        }
      }
    } 
  }  
  updateGame();
}
function roll(){
  if (!gameObject.gameEnded&&(gameObject.gameState.hasNotRolled||!gameObject.gameState.choiceNotPlayed)){
    console.log('rolling');
    gameObject.dice.red = Math.round(Math.random()*6+0.5);
    gameObject.dice.yellow = Math.round(Math.random()*6+0.5);
    gameObject.dice.green = Math.round(Math.random()*6+0.5);
    gameObject.dice.blue = Math.round(Math.random()*6+0.5);
    gameObject.dice.white1 = Math.round(Math.random()*6+0.5);
    gameObject.dice.white2 = Math.round(Math.random()*6+0.5);
   
    /*------------------------------------------*/
    reset();
    gameObject.gameState.hasNotRolled=false;  
    updateGame();
  }
  else{
    alert('You can\'t roll again until next turn')
  }
  }
function penalize(){
  if (!gameObject.gameEnded){
    gameObject.player1.penalty-=5;
    if (gameObject.player1.penalty===-20){
      endGame();
      reset();
      return;
    }
    reset();
    updateGame();
  }
}
window.mark = function (color1, number){
  console.log(`marking ${color1} ${number}`);
  if (color1==='green'||color1==='blue'){
    number = 12-number+2;
  }
  console.log(`number`, number);
  if (gameObject.player1.board[color1].highestMarked>=number){
    return 'failed'
  }
  if (number===12){
    if (parseInt(gameObject.player1.board[color1].xCount)>=5){
      gameObject.player1.board[color1].xCount++;
      gameObject.locks.number++;
      if (gameObject.locks.number===2){
        endGame();
      }
      gameObject.locks[color1]=true;
    }
    else{
      alert('you need 5 before you can do that');
      return 'failed'
    }
  }
  gameObject.player1.board[color1].xCount++;
  if (gameObject.locks.number===2){
    endGame();
  }
  
  gameObject.player1.board[color1].highestMarked=number;
  console.log('%c gameObject.player1.board:', 'background: red; color: #fff; font-size: 16px; font-weight: bold', gameObject.player1.board);
  console.log('%c gameObject.locks:', 'background: red; color: #fff; font-size: 16px; font-weight: bold', gameObject.locks);
  
  updateGame();
  }

/* ------------------------------------------------ */

function reset(){
  console.log('resetting turn');
  gameObject.gameState.hasNotRolled = true;
  gameObject.gameState.choiceNotPlayed = true;
  gameObject.gameState.choiceStarted = false;
  gameObject.gameState.whichWhitePressed = null;
  updateGame();

}
function endGame(){
  let redCount = gameObject.player1.board.red.xCount;
  redCount=redCount*(redCount+1)/2;
  let yellowCount = gameObject.player1.board.yellow.xCount;
  yellowCount=yellowCount*(yellowCount+1)/2;
  let greenCount = gameObject.player1.board.green.xCount;
  greenCount=greenCount*(greenCount+1)/2;
  let blueCount = gameObject.player1.board.blue.xCount;
  blueCount=blueCount*(blueCount+1)/2;
  let penalty = gameObject.player1.penalty;
  gameObject.player1.score = redCount+yellowCount+blueCount+greenCount+penalty;
  gameObject.gameEnded = true;
  updateGame();
  console.log('%c gameObject.player1.board:', 'background: red; color: #fff; font-size: 16px; font-weight: bold', gameObject.player1);
  console.log('%c gameObject.locks:', 'background: red; color: #fff; font-size: 16px; font-weight: bold', gameObject.locks);
}
function init(){
  allButtons.red.addEventListener('click', diePressed.bind(null, 'red'));
  allButtons.yellow.addEventListener('click', diePressed.bind(null, 'yellow'));
  allButtons.green.addEventListener('click', diePressed.bind(null, 'green'));
  allButtons.blue.addEventListener('click', diePressed.bind(null, 'blue'));
  allButtons.penalizer.addEventListener('click', penalize);
  allButtons.roller.addEventListener('click', roll);
  allButtons.white1.addEventListener('click', diePressed.bind(null, 'white1'));
  allButtons.white2.addEventListener('click', diePressed.bind(null, 'white2'));
}
setInterval(updateGame(), 1000);
init();
