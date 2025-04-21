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

/* ------------------------- TEST DATA WRITE ------------------------- 
let player1Location = ref(database, 'players/')
let data = {
  player:'ben'
}

set(databaseLocation, data)
  .then(() => {
    console.log('%c SUCCESS', 'background: green'); // Data saved successfully!
  })
  .catch((error) => {
    console.log('%c ERROR:', 'background: red', error); // The write failed...
  });
/*
/* ========================== /FIREBASE ========================== */

let gameObject = {};
onValue(ref(database, `games/test`), (snapshot) => {
  const data = snapshot.val();
  gameObject=data;
  updateBoard();
  init();
});
window.newGame = () => {
  roller.addEventListener('click', roll);
  dice.white.addEventListener('click', pressWhite);
  dice.white2.addEventListener('click', pressWhite2);
  penalizer.addEventListener('click', penalize);
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
      white: 0,
      white2: 0
    },
    gameState:{
      hasNotRolled:true,
      choiceNotPlayed:true,
      choiceStarted:false,
      whichWhitePressed:null
    }
  }
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
let dice = {
  red: document.getElementById("red-die"),
  yellow: document.getElementById("yellow-die"),
  blue: document.getElementById("blue-die"),
  green: document.getElementById("green-die"),
  white: document.getElementById("white-die"),
  white2: document.getElementById("white-die2")};
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
  penalizer.innerText=`Penalty: ${gameObject.player1.penalty}`;
  //-------------UPDATING BOARD------------
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
  //----------------UPDATING DICE-------
  dice.red.innerText = gameObject.dice.red.toString();
  dice.yellow.innerText = gameObject.dice.yellow.toString();
  dice.green.innerText = gameObject.dice.green.toString();
  dice.blue.innerText = gameObject.dice.blue.toString();
  dice.white.innerText = gameObject.dice.white.toString();
  dice.white2.innerText = gameObject.dice.white2.toString();
  //---------------UPDATING TUTORIAL-------------
  if (gameObject.gameState.choiceStarted){
    tutorial.innerText='click a color(one of the dice), you can also unclick your last click';
  }
  else if (gameObject.gameState.hasNotRolled){
    tutorial.innerText='click roll';
  }
  else if (gameObject.gameState.whichWhitePressed){
    tutorial.innerText='click another dice, you can also unclick your last click';
  }
  else{
    tutorial.innerText='select a white die, take a penalty to roll, or if you have made a move, you can roll without penalty';
  }
  //-------------UPDATING DICE BORDERS-------------
  dice.white.style.borderColor='black';
  dice.white2.style.borderColor='black';
  if (!gameObject.gameState.hasNotRolled){
    if (gameObject.gameState.whichWhitePressed==='white'){
      dice.white.style.borderColor='red';
      dice.white2.style.borderColor='black';
    }
    else if (gameObject.gameState.whichWhitePressed==='white2'){
      dice.white2.style.borderColor='red';
      dice.white.style.borderColor='black';
    }
    if (gameObject.gameState.choiceStarted){
      dice.white.style.borderColor='red';
      dice.white2.style.borderColor='red';
    }
  }
  //-----------------------------------------------
}


let colors = ['red','green','blue','yellow'] // ENUM


function roll(){
  if (gameObject.gameState.hasNotRolled||!gameObject.gameState.choiceNotPlayed){
    console.log('rolling');
    gameObject.dice.red = Math.round(Math.random()*6+0.5);
    gameObject.dice.yellow = Math.round(Math.random()*6+0.5);
    gameObject.dice.green = Math.round(Math.random()*6+0.5);
    gameObject.dice.blue = Math.round(Math.random()*6+0.5);
    gameObject.dice.white = Math.round(Math.random()*6+0.5);
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
let roller = document.getElementById('turn-ender');
roller.addEventListener('click', roll);
function penalize(){
  gameObject.player1.penalty-=5;
  updateGame();
  if (gameObject.player1.penalty===-20){
    endGame();
    reset();
    removeListeners();
    return;
  }
  reset();
  removeListeners();
  roll();

}
function undoWhite(){
  removeListeners();
  gameObject.gameState.whichWhitePressed=null;
  updateGame();
}
let penalizer=document.getElementById('penalty');
penalizer.addEventListener('click', penalize);
function whitePressed(whiteThatDidIt){
  if (!gameObject.gameState.hasNotRolled){
    gameObject.gameState.whichWhitePressed=whiteThatDidIt;
    updateGame();
    if (whiteThatDidIt==='white'){;
      console.log('dice white1 pressed');
      dice.red.addEventListener('click', redMark, {once:true});
      dice.yellow.addEventListener('click', yellowMark, {once:true});
      dice.green.addEventListener('click', greenMark, {once:true});
      dice.blue.addEventListener('click', blueMark, {once:true});
      dice.white2.addEventListener('click',choiceMarkStart, {once:true});
      dice.white.addEventListener('click',undoWhite, {once:true});
  }
    else {
      console.log('dice white2 pressed');
      dice.red.addEventListener('click', redMark2, {once:true});
      dice.yellow.addEventListener('click', yellowMark2, {once:true});
      dice.green.addEventListener('click', greenMark2, {once:true});
      dice.blue.addEventListener('click',blueMark2, {once:true});
      dice.white.addEventListener('click', choiceMarkStart, {once:true});
      dice.white2.addEventListener('click',undoWhite, {once:true});
    }
  }
}
var pressWhite=whitePressed.bind(null, 'white');
var pressWhite2=whitePressed.bind(null, 'white2');
dice.white.addEventListener('click', pressWhite);
dice.white2.addEventListener('click', pressWhite2);

/* ------------------------------------------------ */

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
function removeListeners(){
  console.log('removing listeners');
  dice.red.removeEventListener('click', redMark, {once:true});
  dice.yellow.removeEventListener('click', yellowMark, {once:true});
  dice.green.removeEventListener('click', greenMark, {once:true});
  dice.blue.removeEventListener('click', blueMark, {once:true});
  dice.white2.removeEventListener('click', choiceMarkStart, {once:true});
  dice.red.removeEventListener('click', redMark2, {once:true});
  dice.yellow.removeEventListener('click', yellowMark2, {once:true});
  dice.green.removeEventListener('click', greenMark2, {once:true});
  dice.blue.removeEventListener('click', blueMark2, {once:true});
  dice.white.removeEventListener('click', choiceMarkStart, {once:true});
  dice.red.removeEventListener('click', redChoiceMark, {once:true});
  dice.yellow.removeEventListener('click', yellowChoiceMark, {once:true});
  dice.green.removeEventListener('click', greenChoiceMark, {once:true});
  dice.blue.removeEventListener('click', blueChoiceMark, {once:true});
  dice.white.removeEventListener('click',undoWhite, {once:true});
  dice.white2.removeEventListener('click',undoWhite, {once:true});
}
// CHOICE MARKS:
function choiceMarkStart(){
  removeListeners();
  console.log('checking if choice mark has been played');
  updateGame();
  if (gameObject.gameState.choiceNotPlayed){
    gameObject.gameState.choiceStarted = true;
    gameObject.gameState.whichWhitePressed = null;
    console.log('it hasn\'t');
    dice.red.addEventListener('click', redChoiceMark, {once:true});
    dice.yellow.addEventListener('click', yellowChoiceMark, {once:true});
    dice.green.addEventListener('click', greenChoiceMark, {once:true});
    dice.blue.addEventListener('click', blueChoiceMark, {once:true});
    updateGame();
  }
  else{
    console.log('it has');
  }
}
function choiceMarkEnd(color){
  if (mark(color, parseInt(dice.white.innerText)+parseInt(dice.white2.innerText))==='failed'){
    alert(`you can\'t do that`);
  }
  else{
    removeListeners();
    gameObject.gameState.choiceStarted = false;
    gameObject.gameState.choiceNotPlayed = false;
  }
  updateGame();
}
var redChoiceMark=choiceMarkEnd.bind(null, 'red');
var greenChoiceMark=choiceMarkEnd.bind(null, 'green');
var blueChoiceMark=choiceMarkEnd.bind(null, 'blue');
var yellowChoiceMark=choiceMarkEnd.bind(null, 'yellow');
//  NON-CHOICE MARKS:
function nonChoiceMarks(color, white){
  if (mark(color, parseInt(dice[white].innerText)+parseInt(dice[color].innerText))!='failed'){
    reset();
    removeListeners();
  }
  else{
    alert(`you can\'t do that`);
  }
  updateGame();
}
var redMark=nonChoiceMarks.bind(null, 'red', 'white');
var yellowMark=nonChoiceMarks.bind(null, 'yellow', 'white');
var greenMark=nonChoiceMarks.bind(null, 'green', 'white');
var blueMark=nonChoiceMarks.bind(null, 'blue', 'white');
var redMark2=nonChoiceMarks.bind(null, 'red', 'white2');
var yellowMark2=nonChoiceMarks.bind(null, 'yellow', 'white2');
var greenMark2=nonChoiceMarks.bind(null, 'green', 'white2');
var blueMark2=nonChoiceMarks.bind(null, 'blue', 'white2');




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
  roller.removeEventListener('click', roll);
  dice.white.removeEventListener('click', pressWhite);
  dice.white2.removeEventListener('click', pressWhite2);
  penalizer.removeEventListener('click', penalize);
  console.log('%c gameObject.player1.board:', 'background: red; color: #fff; font-size: 16px; font-weight: bold', gameObject.player1);
  console.log('%c gameObject.locks:', 'background: red; color: #fff; font-size: 16px; font-weight: bold', gameObject.locks);
}
function init(){
  if (!gameObject.gameState.hasNotRolled){
    if (gameObject.gameState.whichWhitePressed){
      whitePressed(gameObject.gameState.whichWhitePressed);
    }
    if (gameObject.gameState.choiceStarted){
      choiceMarkStart();
    }
  }
}
