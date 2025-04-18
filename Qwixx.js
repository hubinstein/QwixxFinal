let tutorial = document.getElementById('tutorial');
let hasNotRolled = true;
let choiceNotPlayed = true;
let dice = {
  red: document.getElementById("red-die"), 
  yellow: document.getElementById("yellow-die"), 
  blue: document.getElementById("blue-die"), 
  green: document.getElementById("green-die"), 
  white: document.getElementById("white-die"), 
  white2: document.getElementById("white-die2")};
let highestMarked = {
  red:0,yellow:0,blue:0,green:0,
}
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
let locks = {
    red:false,
    yellow:false,
    blue:false,
    green:false,
    number:0
}

function roll(){
  if (hasNotRolled||!choiceNotPlayed){
    console.log('rolling');
    dice.red.innerText = Math.round(Math.random()*6+0.5);
    dice.yellow.innerText = Math.round(Math.random()*6+0.5);
    dice.green.innerText = Math.round(Math.random()*6+0.5);
    dice.blue.innerText = Math.round(Math.random()*6+0.5);
    dice.white.innerText = Math.round(Math.random()*6+0.5);
    dice.white2.innerText = Math.round(Math.random()*6+0.5); 
    reset();
    hasNotRolled=false;  
    tutorial.innerText ='select a white die, take a penalty to roll, or if you have made a move, you can roll without penalty';
  }
  else{
    alert('You can\'t roll again until next turn')
  } 
  }
let roller = document.getElementById('roller');
roller.addEventListener('click', roll);
function penalize(){
  let penaltyAmount = penalizer.innerText.slice(-3);
  penaltyAmount=parseInt(penaltyAmount)-5;
  if (parseInt(penaltyAmount)===-20){
    penalizer.innerText=`Penalty: -20`
    endGame();
    reset();
    removeListeners();
    roll();
    return
  }
  reset();
  removeListeners();
  roll();
  penalizer.innerText=`Penalty: ${penaltyAmount}`
}
let penalizer=document.getElementById('penalty')
penalizer.addEventListener('click', penalize);
function whitePressed(whiteThatDidIt){
  if (!hasNotRolled){
    tutorial.innerText='click another one of the dice';
    if (whiteThatDidIt==='white'){;
      console.log('dice white1 pressed');
      dice.red.addEventListener('click', redMark, {once:true});
      dice.yellow.addEventListener('click', yellowMark, {once:true});
      dice.green.addEventListener('click', greenMark, {once:true});
      dice.blue.addEventListener('click', blueMark, {once:true});
      dice.white2.addEventListener('click',choiceMarkStart, {once:true});
  }
    else {
      console.log('dice white2 pressed');
      dice.red.addEventListener('click', redMark2, {once:true});
      dice.yellow.addEventListener('click', yellowMark2, {once:true});
      dice.green.addEventListener('click', greenMark2, {once:true});
      dice.blue.addEventListener('click',blueMark2, {once:true});
      dice.white.addEventListener('click', choiceMarkStart, {once:true});
    }
  }
}
var pressWhite=whitePressed.bind(null, 'white');
var pressWhite2=whitePressed.bind(null, 'white2');
dice.white.addEventListener('click', pressWhite);
dice.white2.addEventListener('click', pressWhite2);
function mark(color1, number){
  console.log(`marking ${color1} ${number}`);
  let i = 0;
  if (color1==='green'){
    number = 12-number+2;
    if (highestMarked.green>=number){
      return 'failed'
    }
    let element = document.getElementById('greenXCount');
    let xCount = element.innerText[0];
    if (number===12){
      if (parseInt(xCount)>=5){
        xCount++;
        locks.number++;
        if (locks.number===2){
          endGame();
        }
        locks.green=true;
      }
      else{
        alert('you need 5 before you can do that');
        return 'failed'
      }
    }
    xCount++;
    if (locks.number===2){
      endGame();
    }
    if (element.innerText[0]==='4'){
      board_list.green12.style.opacity = '1';
    }
    element.innerText=`${xCount}`;

  }
  else if (color1==='blue'){
    number = 12-number+2;
    if (highestMarked.blue>=number){
      return 'failed'
    }
    let element = document.getElementById('blueXCount');
    let xCount = element.innerText[0];
    if (number===12){
      if (parseInt(xCount)>=5){
        xCount++;
        locks.number++;
        locks.blue=true;
      }
      else{
        alert('you need 5 before you can do that');
        return 'failed'
      }
    }
    xCount++;
    if (locks.number===2){
      endGame();
    }
    if (element.innerText[0]==='4'){
      board_list.blue12.style.opacity = '1';
    }
    element.innerText=`${xCount}`;
  }
  else if (color1==='red'){
    if (highestMarked.red>=number){
      return 'failed'
    }
    let element = document.getElementById('redXCount');
    let xCount = element.innerText[0];
    if (number===12){
      if (parseInt(xCount)>=5){
        xCount++;
        locks.number++;
        locks.red=true;
      }
      else{
        alert('you need 5 before you can do that');
        return 'failed'
      }
    }
    xCount++;
    if (element.innerText[0]==='4'){
      board_list.red12.style.opacity = '1';
    }
    element.innerText=`${xCount}`;

  }
  else if (color1==='yellow'){
    if (highestMarked.yellow>=number){
      return 'failed'
    }
    let element = document.getElementById('yellowXCount');
    let xCount = element.innerText[0];
    if (number===12){
      if (parseInt(xCount)>=5){
        xCount++;
        locks.number++;
        locks.yellow=true;
      }
      else{
        alert('you need 5 before you can do that');
        return 'failed'
      }
    }
    xCount++;
    if (locks.number===2){
      endGame();
    }
    if (element.innerText[0]==='4'){
      board_list.yellow12.style.opacity = '1';
    }
    element.innerText=`${xCount}`;

  }
  while (i<(number-1)){      
    if (color1==='red'){Object.entries(board_list)[i][1].style.opacity=0;highestMarked.red = number;}
    else if (color1==='yellow'){Object.entries(board_list)[i+11][1].style.opacity=0; highestMarked.yellow = number;}
    else if (color1==='green'){Object.entries(board_list)[i+22][1].style.opacity=0;highestMarked.green = number;}
    else if (color1==='blue'){Object.entries(board_list)[i+33][1].style.opacity=0; highestMarked.blue = number;}
    i++;
    }
    }
function reset(){
  console.log('resetting turn');
  hasNotRolled = true;
  choiceNotPlayed = true;
  tutorial.innerText = 'click roll';
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
}
// CHOICE MARKS:
function choiceMarkStart(){
  removeListeners();
  console.log('checking if choice mark has been played');
  if (choiceNotPlayed){
    console.log('it hasn\'t');
    choiceNotPlayed=false;
    tutorial.innerText='click a color';
    dice.red.addEventListener('click', redChoiceMark, {once:true});
    dice.yellow.addEventListener('click', yellowChoiceMark, {once:true});
    dice.green.addEventListener('click', greenChoiceMark, {once:true});
    dice.blue.addEventListener('click', blueChoiceMark, {once:true});
  }
  else{
    console.log('it has');
  }
}
function choiceMarkEnd(color){
  mark(color, parseInt(dice.white.innerText)+parseInt(dice.white2.innerText));
  removeListeners();
  tutorial.innerText ='select a white die, take a penalty to roll, or if you have made a move, you can roll without penalty';
}
var redChoiceMark=choiceMarkEnd.bind(null, 'red');
var greenChoiceMark=choiceMarkEnd.bind(null, 'green');
var blueChoiceMark=choiceMarkEnd.bind(null, 'blue');
var yellowChoiceMark=choiceMarkEnd.bind(null, 'yellow');
//  NON-CHOICE MARKS: 
function nonChoiceMarks(color, white){
  removeListeners();
  if (mark(color, parseInt(dice[white].innerText)+parseInt(dice[color].innerText))!='failed'){
    reset();
  }
  else{
    alert(`you can\'t do that`);
    tutorial.innerText ='select a white die, take a penalty to roll, or if you have made a move, you can roll without penalty';
  }
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
  let redCount = parseInt(document.getElementById('redXCount').innerText);
  redCount=redCount*(redCount+1)/2;
  let yellowCount = parseInt(document.getElementById('yellowXCount').innerText);
  yellowCount=yellowCount*(yellowCount+1)/2;
  let greenCount = parseInt(document.getElementById('greenXCount').innerText);
  greenCount=greenCount*(greenCount+1)/2;
  let blueCount = parseInt(document.getElementById('blueXCount').innerText);
  blueCount=blueCount*(blueCount+1)/2;
  let penalty = parseInt(penalizer.innerText.slice(-3))
  let score=redCount+yellowCount+blueCount+greenCount+penalty;
  let scoreText = document.getElementById('score');
  scoreText.innerText = `Game ended, FINAL SCORE: ${score}`;
  tutorial.style.display="none";
  roller.removeEventListener('click', roll);
  dice.white.removeEventListener('click', pressWhite);
  dice.white2.removeEventListener('click', pressWhite2);
  penalizer.removeEventListener('click', penalize);
}
