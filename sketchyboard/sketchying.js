function _(selector){
  return document.querySelector(selector);
}

function setup(){
  let canvas = createCanvas(700, 700);
  canvas.parent("canvas-wrapper");
  background(255);
}
function mouseDragged(){
  let type = _("#pen-brush").checked?"brush":"eraser";
  let size = parseInt(_("#pen-size").value);
  
  function changeColor(color){
    fill(color);
    stroke(color);    
  }
  
  function drawing(){
    strokeWeight(size);
    line(pmouseX, pmouseY, mouseX, mouseY);    
  }
  
  if(type == "brush"){
    let color = _("#pen-color").value;
    changeColor(color);
    drawing();
  } 
  else {
    let color = 'rgb(255)';
    changeColor(color);
    drawing();
  } 
}

_("#reset-canvas").addEventListener("click", function(){
  background(255);
});


/*
seems like a good reference for p5.js undo redo functions
https://www.openprocessing.org/sketch/131411/
*/
