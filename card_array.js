//global variables
let match_count=0;
let last_match_code = null;
let revealed=0;
var timer = 120;
var card_rows = 6;
var card_cols = 6;

//function to make the memory grid 
function makeRows(rows, cols) {
    const container = document.getElementById("container");
    // set variable value on container
    container.style.setProperty('--grid-rows', rows);
    container.style.setProperty('--grid-cols', cols);
    let cell;
    let assigned=[];
    let matched=[];
    for (let c = 0; c < (rows * cols); c++) {
      //assign the back of card image to each grid item
      const image = document.createElement('img');
      image.src = "images/back_of_card.png";
      image.style.width='300px';
      image.setAttribute('exists', true);
      image.setAttribute('revealed', false);
      image.setAttribute('matched', false);
      let image_code_num = getRandom(1,(rows*cols/2),assigned,matched);
      if (!assigned.includes(image_code_num) & !matched.includes(image_code_num)){
        assigned.push(image_code_num)
      }else if (assigned.includes(image_code_num) & !matched.includes(image_code_num)){
        matched.push(image_code_num)
      }
      image.setAttribute('match_code', image_code_num);

      //create cells of the grid
      cell = document.createElement('container');
      cell.appendChild(image);
      cell.id = 'cell_'+c;
      //give them the clicking function 
      cell.onclick = function(){
        revealed = clicking(this.id);
      };

      container.appendChild(cell).className = "grid-item";
        
  };

}
  //function to determine behavior when a card is clicked 
  function clicking(cell_id) {
    const cell = document.getElementById(cell_id);
    const image = cell.querySelector('img');
    if (image.src.endsWith("back_of_card.png") & revealed<2){
      revealCard(image);
      console.log('revealed: ' + revealed);
      //if revealing the second card means revealed is now 2, check for a match
      if(revealed==2){
       checkMatch(cell, image)
      }
    }
    // else if (!image.src.endsWith("back_of_card.png") && image.src.endsWith(".png")){
    //   hideCard(image);
    // } 
    return revealed;
  };

function revealCard (image){
  console.log('match code ' + image.getAttribute('match_code'));
      image.setAttribute('revealed', true);
      revealed = revealed+1;
      for (let i = 1; i<((card_rows*card_cols/2)+1); i++){
        if (image.getAttribute('match_code')==i){
          image.src = "images/"+i+".png";
          break;
        }
      }
}
function hideCard (image){
    image.setAttribute('revealed', false);
    revealed = 0; 
    if (image.getAttribute('exists')=='true'){
      image.src = "images/back_of_card.png";
    }
   
}

function removeCard(cell, image){
  image.setAttribute('revealed', false);
  image.setAttribute('exists', false);
  revealed = 0;  
  image.src = "";
}


function checkMatch(){
  let match_compare = [];
  for (let j=0; j<(card_rows*card_cols); j++){
    const cell = document.getElementById('cell_'+j);
    const image = cell.querySelector('img');
    if (image.getAttribute('revealed')=='true' && image.getAttribute('match_code') == last_match_code){
      image.setAttribute('matched', true);
    }
    if (image.getAttribute('revealed')=='true' && image.getAttribute('matched')=='false'){
      match_compare.push(image.getAttribute('match_code'));
    }
    console.log('match compare array: ' + match_compare);
  }
  if (match_compare[1]-match_compare[0]==0){
    match_count = match_count + 1;
    last_match_code = match_compare[0];
    console.log("it's a match");
    console.log('matches: ' + match_count);
    var match_count_html = document.getElementById('match_counter');
    match_count_html.innerHTML = 'Match Count: ' + match_count;
    revealed = 0;
    for (let k=0; k<(card_rows*card_cols); k++){
      const cell = document.getElementById('cell_'+k);
      const image = cell.querySelector('img');
      if (image.getAttribute('revealed')=='true' && image.getAttribute('match_code') == last_match_code){
        setTimeout(removeCard, 500, cell, image);
      }
    }
  }
  else if (match_compare[1]-match_compare[0]!=0){
    // match_count = match_count + 1;
    // last_match_code = match_compare[0];
    console.log("it's not a match");
    for (let j=0; j<(card_rows*card_cols); j++){
      const cell = document.getElementById('cell_'+j);
      const image = cell.querySelector('img');
      setTimeout(hideCard, 1000, image);
    }
  }
}

function getRandom(min, max, assigned, matched) {
  let return_num = null;
    while (return_num == null){
      temp_num = Math.floor(Math.random() * (max - min + 1) ) + min;
      if (!assigned.includes(temp_num) & !matched.includes(temp_num)){
        return_num = temp_num;
      } else if (assigned.includes(temp_num) & !matched.includes(temp_num)){
        return_num = temp_num;
      }else if (assigned.includes(temp_num) & matched.includes(temp_num)){
        continue;
      }
    }
    return return_num;
  }

  


function updateTimer(){
  timer = timer - 1;
  var game_timer_html = document.getElementById('game_timer');
  game_timer_html.innerHTML = 'Timer: ' + timer + ' seconds';
  if (timer == 0){
    console.log('game over!!!! :)');
    clearInterval(gameInterval);
  }
};

//function that starts the game. called when the new game button is clicked  
function startGame(){
  gameInterval = setInterval(updateTimer, 1000);
  makeRows(card_rows, card_cols);
}

document.getElementById("gameButton").onclick = startGame;


function showPictures(){
  for (let j=0; j<(card_rows*card_cols); j++){
    const cell = document.getElementById('cell_'+j);
    const image = cell.querySelector('img');
    if (image.src.endsWith("back_of_card.png")){
      for (let i = 1; i<((card_rows*card_cols/2)+1); i++){
        if (image.getAttribute('match_code')==i){
          image.src = "images/"+i+".png";
          break;
        }
        else{
          image.src = "images/deer.png";
        }
      }
    }
  }
}
document.getElementById("showPictures").onclick = showPictures;

