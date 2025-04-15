let revealed = 0;

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
        console.log('revealed: ' + revealed);
        revealed = clicking(this.id, revealed);
      };

      container.appendChild(cell).className = "grid-item";
        
  };
}
  
  function clicking(cell_id, inp_up) {
    let revealed = inp_up
    const cell = document.getElementById(cell_id);
    const image = cell.querySelector('img');
    if (image.src.endsWith("back_of_card.png") ){
      console.log('match code ' + image.getAttribute('match_code'));
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
      
      
    }
    else if (!image.src.endsWith("back_of_card.png")){
      revealed = revealed-1;  
      image.src = "images/back_of_card.png";
    };
    console.log('revealed: ' + revealed);
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




makeRows(6, 6);
