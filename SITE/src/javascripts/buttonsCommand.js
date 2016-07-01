//Html buttons support
var pressedButon = false;

var disableButtons = function() {
  $("#backward-button").prop('disabled', true);
  $("#left-button").prop('disabled', true);
  $("#right-button").prop('disabled', true);
  $("#stop-button").addClass('activated');
}

var enableButtons = function()  {
  $("#backward-button").prop('disabled', false);
  $("#left-button").prop('disabled', false);
  $("#right-button").prop('disabled', false);
  $("#stop-button").addClass('activated');
}

$("#forward-button").mousedown(function(){
  start("ok");
  $("#forward-button").removeClass("activable");
  if($('#switch3').is(':checked')){
    $("#forward-button").on('mouseup', function(){
      $("#forward-button").addClass("activable");
      if(!lastEvent){
        console.log("stop flag rised");
        stopFlag = true;
        return;
      }
      stop();
    })
  }
});

$("#backward-button").mousedown(function(){
  back("ok");
  $("#backward-button").removeClass("activable");
  $("#backward-button").on('mouseup', function(){
    $("#backward-button").addClass("activable");
    if(!lastEvent){
      console.log("stop flag rised");
      stopFlag = true;
      return;
    }
    stop();
  })
});

$("#right-button").mousedown(function(){
  right("ok");
  $("#right-button").removeClass("activable");
  $("#right-button").on('mouseup', function(){
    $("#right-button").addClass("activable");
    if(!lastEvent){
      console.log("stop flag rised");
      stopFlag = true;
      return;
    }
    stop();
  })
});

$("#left-button").mousedown(function(){
  left("ok");
  $("#left-button").removeClass("activable");
  $("#left-button").on('mouseup', function(){
    $("#left-button").addClass("activable");
    if(!lastEvent){
      console.log("stop flag rised");
      stopFlag = true;
      return;
    }
    stop();
  })
});

$("#stop-button").mousedown(function(){
  stop();
  $("#stop-button").removeClass("activable");
  $("#stop-button").on('mouseup', function(){
    $("#stop-button").addClass("activable");
    stop();
  })
});
