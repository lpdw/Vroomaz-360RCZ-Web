//Html buttons support
var pressedButon = false;

$("#forward-button").click(function(){
  if(pressedButon){
    stop(start);
  } else {
    start();
  }
  pressedButon = true;
});

$("#backward-button").click(function(){
  if(pressedButon){
    stop(back);
  } else {
    back();
  }
  pressedButon = true;
});

$("#left-button").click(function(){
  if(pressedButon){
    stop(left);
  } else {
    left();
  }
  pressedButon = true;
});

$("#right-button").click(function(){
  if(pressedButon){
    stop(right);
  } else {
    right();
  }
  pressedButon = true;
});

$("#stop-button").click(function(){
  stop();
  pressedButon = true;
});
