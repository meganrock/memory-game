
let match_count=0;
let last_match_code = null;

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
      image.style.width='200px';
      image.setAttribute('revealed', false);
      image.setAttribute('matched', false);
      let image_code_num = getRandom(1,18,assigned,matched);
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

      cell.onclick = function(){
        // console.log('revealed: ' + revealed);
        revealed = clicking(this.id, revealed);
      };

      container.appendChild(cell).className = "grid-item";
        
  };

}
  
  function clicking(cell_id, inp_up) {
    let revealed = inp_up
    const cell = document.getElementById(cell_id);
    const image = cell.querySelector('img');
    if (image.src.endsWith("back_of_card.png") & revealed<2){
      console.log('match code ' + image.getAttribute('match_code'));
      image.setAttribute('revealed', true);
      revealed = revealed+1;
      for (let i = 1; i<19; i++){
        if (image.getAttribute('match_code')==i){
          image.src = "images/"+i+".png";
          break;
        }
        else{
          image.src = "images/deer.png";
        }
      }
      console.log('revealed: ' + revealed);
      if(revealed==2){
        let match_compare = [];
        for (let j=0; j<36; j++){
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
        }
      }

    }
    else if (!image.src.endsWith("back_of_card.png")){
      image.setAttribute('revealed', false);
      revealed = revealed-1;  
      image.src = "images/back_of_card.png";
    } 
    return revealed;
  };


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


let revealed = 0;
 makeRows(6, 6);
