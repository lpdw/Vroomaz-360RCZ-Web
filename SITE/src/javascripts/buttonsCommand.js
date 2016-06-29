//Html buttons support
var pressedButon = false;

var disableButtons = function() {
  $("#forward-button").prop('disabled', true);
  $("#backward-button").prop('disabled', true);
  $("#left-button").prop('disabled', true);
  $("#right-button").prop('disabled', true);
}

var enableButtons = function()  {
  $("#forward-button").prop('disabled', false);
  $("#backward-button").prop('disabled', false);
  $("#left-button").prop('disabled', false);
  $("#right-button").prop('disabled', false);
}

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

$('#switch1').change(function(){
  if(this.checked) {
    disableButtons();
  } else {
    enableButtons();
  }
});
