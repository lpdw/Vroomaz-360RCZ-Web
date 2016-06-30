//Html buttons support
var pressedButon = false;

var disableButtons = function() {
  $("#backward-button").prop('disabled', true);
  $("#left-button").prop('disabled', true);
  $("#right-button").prop('disabled', true);
  stop();
  $("#stop-button").addClass('activated');
}

var enableButtons = function()  {
  $("#backward-button").prop('disabled', false);
  $("#left-button").prop('disabled', false);
  $("#right-button").prop('disabled', false);
  stop();
  $("#stop-button").addClass('activated');
}

$("#forward-button").mousedown(function(){
  lastController = "b";
  start();
  $("#forward-button").removeClass("activable");
  $("#forward-button").on('mouseup', function(){
    $("#forward-button").addClass("activable");
    stop();
  })
});

$("#backward-button").mousedown(function(){
  lastController = "b";
  back();
  $("#backward-button").removeClass("activable");
  $("#backward-button").on('mouseup', function(){
    $("#backward-button").addClass("activable");
    stop();
  })
});

$("#right-button").mousedown(function(){
  lastController = "b";
  right();
  $("#right-button").removeClass("activable");
  $("#right-button").on('mouseup', function(){
    $("#right-button").addClass("activable");
    stop();
  })
});

$("#left-button").mousedown(function(){
  lastController = "b";
  left();
  $("#left-button").removeClass("activable");
  $("#left-button").on('mouseup', function(){
    $("#left-button").addClass("activable");
    stop();
  })
});

$("#stop-button").mousedown(function(){
  lastController = "b";
  stop();
  $("#stop-button").removeClass("activable");
  $("#stop-button").on('mouseup', function(){
    $("#stop-button").addClass("activable");
    stop();
  })
});
