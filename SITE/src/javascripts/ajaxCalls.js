//Ajax calls
var controlServer = "http://localhost:3001";

//Moving forward
function start(e) {
  var req = "";
  if($('#switch1').is(':checked')) {
    req = "/mode/auto";
  } else if($('#switch2').is(':checked')) {
    req = "/mode/line";
  } else if($('#switch3').is(':checked')) {
    req = "/start";
  }

  if (req != "") {
    $.ajax({
      url: controlServer + req,
      method: "POST"
    })
    .done(function (msg) {
      lastEvent = e;
      console.log(msg);
      $("#forward-button").addClass("activated");
      $("#stop-button").removeClass("activated");
      $('#carDirection').html('<i class="fa fa-arrow-circle-o-up" aria-hidden="true"></i>');
      if(stopFlag){
        stop();
        stopFlag = null;
        console.log("stopflag catched");
      }
    });
  }
}


//Moving backward
function back(e) {
  $.ajax({
    url: controlServer + "/back",
    method: "POST"
  })
  .done(function (msg) {
    console.log(msg);
    lastEvent = e;
    $("#backward-button").addClass("activated");
    $("#stop-button").removeClass("activated");
    $('#carDirection').html('<i class="fa fa-arrow-circle-o-down" aria-hidden="true"></i>');
    if(stopFlag){
      stop();
      stopFlag = null;
    }
  });
}


//Stop all
function stop(callback) {
  $.ajax({
    url: controlServer + "/stop",
    method: "POST"
  })
  .done(function (msg) {
    console.log(msg);
    $('#carDirection').html('');
    $("#stop-button").addClass("activated");
    $("#left-button").removeClass("activated");
    $("#right-button").removeClass("activated");
    $("#backward-button").removeClass("activated");
    $("#forward-button").removeClass("activated");
    $("#avg").removeClass("turn-left");
    $("#avd").removeClass("turn-left");
    $("#avg").removeClass("turn-right");
    $("#avd").removeClass("turn-right");
    if(callback) callback();
  });
}


//Turn left
function left(e) {
  $.ajax({
    url: controlServer + "/left",
    method: "POST"
  })
  .done(function (msg) {
    lastEvent = e;
    console.log(msg);
    $("#avg").addClass("turn-left");
    $("#avd").addClass("turn-left");
    $("#left-button").addClass("activated");
    $("#stop-button").removeClass("activated");
    $('#carDirection').html('<i class="fa fa-arrow-circle-o-left" aria-hidden="true"></i>');
    if(stopFlag){
      stop();
      stopFlag = null;
    }
  });
}


//Turn right
function right(e) {
  $.ajax({
    url: controlServer + "/right",
    method: "POST"
  })
  .done(function (msg) {
    lastEvent = e;
    console.log(msg);
    $("#avg").addClass("turn-right");
    $("#avd").addClass("turn-right");
    $("#right-button").addClass("activated");
    $("#stop-button").removeClass("activated");
    $('#carDirection').html('<i class="fa fa-arrow-circle-o-right" aria-hidden="true"></i>');
    if(stopFlag){
      stop();
      stopFlag = null;
    }
  });
}
